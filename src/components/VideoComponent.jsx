import React from "react";

const VideoComponent = () => {
  return (
    <section className="py-20 bg-[url('/assets/images/video-bg.png')] dark:bg-[url('/assets/images/video-bg-dark.png')] bg-cover bg-center">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-tr-[80px] rounded-bl-[120px] overflow-hidden relative">
            <img
              src="/assets/images/video-banner.jpg"
              alt="Video banner"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-radical-red dark:bg-red-600 text-white p-6 rounded-full animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <img
            src="/assets/images/video-shape-1.png"
            alt=""
            className="absolute -top-10 -left-10 hidden lg:block dark:opacity-50"
          />
          <img
            src="/assets/images/video-shape-2.png"
            alt=""
            className="absolute -top-20 right-0 hidden lg:block dark:opacity-50"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
