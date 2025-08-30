import { trackPerformance } from "./analytics";

// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = {};
    this.pageStartTime = Date.now();
    this.init();
  }

  init() {
    this.setupWebVitals();
    this.setupCustomMetrics();
    this.setupResourceTiming();
    this.setupLongTasks();
    this.setupMemoryMonitoring();
  }

  // Web Vitals monitoring
  setupWebVitals() {
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          trackPerformance(
            "LCP",
            lastEntry.startTime,
            "Largest Contentful Paint"
          );
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.lcp = lcpObserver;
      } catch (e) {
        console.warn("LCP monitoring not supported");
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            trackPerformance("FID", this.metrics.fid, "First Input Delay");
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        this.observers.fid = fidObserver;
      } catch (e) {
        console.warn("FID monitoring not supported");
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          trackPerformance("CLS", clsValue * 1000, "Cumulative Layout Shift");
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        this.observers.cls = clsObserver;
      } catch (e) {
        console.warn("CLS monitoring not supported");
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          this.metrics.fcp = firstEntry.startTime;
          trackPerformance(
            "FCP",
            firstEntry.startTime,
            "First Contentful Paint"
          );
        });
        fcpObserver.observe({ entryTypes: ["first-contentful-paint"] });
        this.observers.fcp = fcpObserver;
      } catch (e) {
        console.warn("FCP monitoring not supported");
      }
    }
  }

  // Custom performance metrics
  setupCustomMetrics() {
    // Time to Interactive (TTI) approximation
    this.measureTTI();

    // DOM Content Loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        const tti = performance.now();
        this.metrics.domContentLoaded = tti;
        trackPerformance("DOMContentLoaded", tti, "DOM Content Loaded");
      });
    }

    // Window Load
    if (document.readyState === "complete") {
      this.measureWindowLoad();
    } else {
      window.addEventListener("load", () => {
        this.measureWindowLoad();
      });
    }
  }

  measureTTI() {
    // Approximation of TTI using requestIdleCallback
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          const tti = performance.now();
          this.metrics.tti = tti;
          trackPerformance("TTI", tti, "Time to Interactive");
        },
        { timeout: 5000 }
      );
    }
  }

  measureWindowLoad() {
    const loadTime = performance.now();
    this.metrics.windowLoad = loadTime;
    trackPerformance("WindowLoad", loadTime, "Window Load Complete");
  }

  // Resource timing monitoring
  setupResourceTiming() {
    if ("PerformanceObserver" in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Track slow resources (>2 seconds)
            if (entry.duration > 2000) {
              trackPerformance("SlowResource", entry.duration, entry.name);
            }

            // Track failed resources
            if (entry.transferSize === 0 && entry.duration > 0) {
              trackPerformance("FailedResource", entry.duration, entry.name);
            }
          });
        });
        resourceObserver.observe({ entryTypes: ["resource"] });
        this.observers.resource = resourceObserver;
      } catch (e) {
        console.warn("Resource timing monitoring not supported");
      }
    }
  }

  // Long tasks monitoring
  setupLongTasks() {
    if ("PerformanceObserver" in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Track tasks longer than 50ms
            if (entry.duration > 50) {
              trackPerformance(
                "LongTask",
                entry.duration,
                "Long Task Detected"
              );
            }
          });
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
        this.observers.longTask = longTaskObserver;
      } catch (e) {
        console.warn("Long task monitoring not supported");
      }
    }
  }

  // Memory monitoring
  setupMemoryMonitoring() {
    if ("memory" in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = memory.usedJSHeapSize / 1048576;
        const totalMB = memory.totalJSHeapSize / 1048576;
        const limitMB = memory.jsHeapSizeLimit / 1048576;

        this.metrics.memory = {
          used: usedMB,
          total: totalMB,
          limit: limitMB,
          percentage: (usedMB / limitMB) * 100,
        };

        // Track high memory usage (>80%)
        if (this.metrics.memory.percentage > 80) {
          trackPerformance(
            "HighMemoryUsage",
            this.metrics.memory.percentage,
            "Memory Usage High"
          );
        }
      }, 30000); // Check every 30 seconds
    }
  }

  // Custom performance measurements
  measureCustomMetric(name, startTime) {
    const duration = performance.now() - startTime;
    this.metrics[name] = duration;
    trackPerformance("CustomMetric", duration, name);
    return duration;
  }

  // Component render time measurement
  measureComponentRender(componentName, startTime) {
    const duration = performance.now() - startTime;
    trackPerformance("ComponentRender", duration, componentName);
    return duration;
  }

  // API call performance measurement
  measureAPICall(endpoint, startTime) {
    const duration = performance.now() - startTime;
    trackPerformance("APICall", duration, endpoint);
    return duration;
  }

  // User interaction performance measurement
  measureUserInteraction(action, startTime) {
    const duration = performance.now() - startTime;
    trackPerformance("UserInteraction", duration, action);
    return duration;
  }

  // Page navigation performance
  measurePageNavigation(from, to, startTime) {
    const duration = performance.now() - startTime;
    trackPerformance("PageNavigation", duration, `${from} -> ${to}`);
    return duration;
  }

  // Bundle size monitoring
  measureBundleSize() {
    if ("performance" in window && "getEntriesByType" in performance) {
      const resources = performance.getEntriesByType("resource");
      const jsResources = resources.filter((r) => r.name.includes(".js"));
      const totalJS = jsResources.reduce((sum, r) => sum + r.transferSize, 0);

      this.metrics.bundleSize = totalJS;
      trackPerformance("BundleSize", totalJS, "Total JS Bundle Size");
      return totalJS;
    }
    return 0;
  }

  // Get all collected metrics
  getMetrics() {
    return {
      ...this.metrics,
      pageLoadTime: Date.now() - this.pageStartTime,
    };
  }

  // Cleanup observers
  disconnect() {
    Object.values(this.observers).forEach((observer) => {
      if (observer && typeof observer.disconnect === "function") {
        observer.disconnect();
      }
    });
  }

  // Performance budget checking
  checkPerformanceBudget() {
    const budget = {
      fcp: 2000, // 2 seconds
      lcp: 2500, // 2.5 seconds
      fid: 100, // 100ms
      cls: 0.1, // 0.1
      tti: 3800, // 3.8 seconds
    };

    const violations = [];

    Object.entries(budget).forEach(([metric, threshold]) => {
      if (this.metrics[metric] && this.metrics[metric] > threshold) {
        violations.push({
          metric,
          actual: this.metrics[metric],
          threshold,
          difference: this.metrics[metric] - threshold,
        });
      }
    });

    if (violations.length > 0) {
      trackPerformance(
        "PerformanceBudgetViolation",
        violations.length,
        "Budget Violations"
      );
      console.warn("Performance budget violations:", violations);
    }

    return violations;
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const measurePerformance = (name, startTime) => {
  return performanceMonitor.measureCustomMetric(name, startTime);
};

export const measureComponent = (componentName, startTime) => {
  return performanceMonitor.measureComponentRender(componentName, startTime);
};

export const measureAPI = (endpoint, startTime) => {
  return performanceMonitor.measureAPICall(endpoint, startTime);
};

export const measureInteraction = (action, startTime) => {
  return performanceMonitor.measureUserInteraction(action, startTime);
};

export const measureNavigation = (from, to, startTime) => {
  return performanceMonitor.measurePageNavigation(from, to, startTime);
};

export const getPerformanceMetrics = () => {
  return performanceMonitor.getMetrics();
};

export const checkPerformanceBudget = () => {
  return performanceMonitor.checkPerformanceBudget();
};

export const disconnectPerformanceMonitoring = () => {
  performanceMonitor.disconnect();
};

export default performanceMonitor;
