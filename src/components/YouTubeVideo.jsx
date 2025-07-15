import React, { useState } from "react";

// Utility to extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

const PlayButton = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="z-10"
    style={{ pointerEvents: "none" }}
  >
    <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)" />
    <polygon points="26,20 50,32 26,44" fill="#fff" />
  </svg>
);

const YouTubeVideo = ({ youtubeUrl, title }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex justify-center my-4">
      <div
        className="relative w-full max-w-3xl rounded-lg shadow-md overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {showPlayer ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || "YouTube Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        ) : (
          <button
            className="absolute inset-0 w-full h-full focus:outline-none group"
            aria-label="Play YouTube video"
            onClick={() => setShowPlayer(true)}
            style={{ background: "transparent", padding: 0 }}
          >
            <img
              src={thumbnailUrl}
              alt={title || "YouTube Video Thumbnail"}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <PlayButton />
            </span>
            <span className="sr-only">Play video</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideo;
