# Analytics & Performance Monitoring Setup

This guide explains how to set up Google Analytics 4 and performance monitoring for the CodeIntervu frontend.

## 🎯 Google Analytics 4 Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard to create your account and property
4. Choose "Web" as your platform
5. Enter your website details:
   - Website name: `CodeIntervu`
   - Website URL: `https://codeintervu.com`
   - Industry category: `Education`
   - Business size: `Small business`

### 2. Get Your Measurement ID

1. In your GA4 property, go to **Admin** → **Data Streams**
2. Click on your web stream
3. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Update the Analytics Configuration

1. Open `frontend/src/utils/analytics.js`
2. Replace the placeholder tracking ID:

```javascript
// Replace this line:
const GA_TRACKING_ID = "G-XXXXXXXXXX";

// With your actual tracking ID:
const GA_TRACKING_ID = "G-E2ZEYXVKMJ";
```

### 4. Verify Installation

1. Start your development server: `npm run dev`
2. Open your website
3. Check the browser console for "Google Analytics initialized"
4. In GA4, go to **Reports** → **Realtime** to see live data

## 📊 Performance Monitoring

The application includes comprehensive performance monitoring:

### Web Vitals Tracking

- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **FCP (First Contentful Paint)**: Measures first paint time
- **TTI (Time to Interactive)**: Measures when page becomes interactive

### Custom Metrics

- **API Call Performance**: Tracks response times for all API calls
- **Component Render Time**: Measures React component render performance
- **User Interaction Performance**: Tracks button clicks and form submissions
- **Bundle Size**: Monitors JavaScript bundle size
- **Memory Usage**: Tracks memory consumption

### Performance Budget

The system includes performance budgets:

- FCP: < 2 seconds
- LCP: < 2.5 seconds
- FID: < 100ms
- CLS: < 0.1
- TTI: < 3.8 seconds

## 🎯 Event Tracking

The application automatically tracks these events:

### User Interactions

- Profile completion updates
- Quiz starts and completions
- Code executions
- Course views and progress
- Interview question views and bookmarks

### Performance Events

- Page load times
- API response times
- Component render times
- Memory usage spikes
- Performance budget violations

### Error Tracking

- Application errors
- API failures
- Network errors
- Performance issues

## 🔧 Customization

### Adding New Event Tracking

```javascript
import { trackEvent } from "../utils/analytics";

// Track a custom event
trackEvent("Custom Category", "Custom Action", "Custom Label", 100);
```

### Adding Performance Monitoring

```javascript
import { measurePerformance } from "../utils/performance";

// Measure custom performance metric
const startTime = performance.now();
// ... your code ...
measurePerformance("CustomMetric", performance.now() - startTime);
```

### Setting User Properties

```javascript
import { setUserProperty } from "../utils/analytics";

// Set user properties for segmentation
setUserProperty("user_type", "premium");
setUserProperty("subscription_level", "pro");
```

## 📈 Analytics Dashboard Setup

### Recommended GA4 Reports

1. **Audience Overview**

   - Users, sessions, page views
   - User demographics and interests
   - Device and browser breakdown

2. **Acquisition Reports**

   - Traffic sources
   - Campaign performance
   - Search console integration

3. **Engagement Reports**

   - Page views and time on page
   - Event tracking
   - User engagement metrics

4. **Monetization Reports**

   - E-commerce tracking (if applicable)
   - Revenue attribution

5. **Custom Reports**
   - Quiz completion rates
   - Code execution success rates
   - Profile completion funnel

### Custom Dimensions

Set up these custom dimensions in GA4:

1. **User Type**: Free/Premium
2. **Programming Language**: Most used language
3. **Quiz Category**: Most attempted category
4. **Profile Completion**: Completion percentage
5. **Device Type**: Mobile/Desktop/Tablet

## 🚀 Production Deployment

### Environment Variables

For production, consider using environment variables:

```javascript
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || "G-XXXXXXXXXX";
```

Add to your `.env` file:

```
VITE_GA_TRACKING_ID=G-E2ZEYXVKMJ
```

### Privacy Compliance

1. **GDPR Compliance**: Add cookie consent banner
2. **CCPA Compliance**: Add privacy notice
3. **Data Retention**: Configure data retention policies in GA4
4. **IP Anonymization**: Enable IP anonymization in GA4

### Performance Optimization

1. **Bundle Analysis**: Use `npm run build --analyze` to analyze bundle size
2. **Lazy Loading**: Implement lazy loading for heavy components
3. **Caching**: Configure proper caching headers
4. **CDN**: Use CDN for static assets

## 🔍 Troubleshooting

### Common Issues

1. **Analytics not loading**

   - Check tracking ID format
   - Verify ad blockers are disabled
   - Check browser console for errors

2. **Events not tracking**

   - Verify GA4 is initialized
   - Check event parameters
   - Use GA4 DebugView

3. **Performance metrics missing**
   - Check browser support for PerformanceObserver
   - Verify Web Vitals are enabled
   - Check for JavaScript errors

### Debug Tools

1. **GA4 DebugView**: Real-time event debugging
2. **Chrome DevTools**: Performance tab for metrics
3. **Lighthouse**: Performance auditing
4. **WebPageTest**: Detailed performance analysis

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Monitoring Best Practices](https://web.dev/performance-monitoring/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

## 🎉 Success Metrics

Monitor these key metrics for success:

- **User Engagement**: Time on site, pages per session
- **Conversion Rate**: Profile completion, quiz completion
- **Performance**: Core Web Vitals scores
- **Error Rate**: Application errors, API failures
- **User Retention**: Return visitor rate
- **Feature Adoption**: New feature usage rates
