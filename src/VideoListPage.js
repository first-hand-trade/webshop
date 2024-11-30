import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const VideoListPage = () => {
  const { albumName: rawAlbumName } = useParams();
  const albumName = rawAlbumName.replace(/%20/g, " ");
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async (url) => {
    if (isLoading || !url) return;

    setIsLoading(true);
    setError(null);

    try {
      let nextPageUrl = url;
      let foundVideos = [];

      while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();

        // Filter and deduplicate the videos
        const filteredVideos = data.data.filter(
          (video) => video.description && video.description.includes(albumName)
        );

        // Remove duplicates based on video.id
        foundVideos = [...foundVideos, ...filteredVideos.filter(
          (video) => !foundVideos.some((v) => v.id === video.id)
        )];

        nextPageUrl = data.paging?.next || null;

        // Update the state only with the unique videos
        setVideos((prevVideos) => [...prevVideos, ...filteredVideos.filter(
          (video) => !prevVideos.some((v) => v.id === video.id)
        )]);

        setNextPage(nextPageUrl);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialUrl = `https://graph.facebook.com/162319753623834/videos?fields=permalink_url,description,embeddable&access_token=EAAVY2FTdg5EBO8r611rZAVJw5xJcSyVfPQWfXNh1HpzAwwpXATFyem4IwyFc4qZCnXyUcvFSiT3RAxbTVgnZBW9tsl5dFXauoZAXSzx04RemJlJp3pYtkAM8lNiNg0OJ2J5ZAdmMTZADgJUFbHcE1REozpOECqkLxJ6YLgATIKvP5nWZCORaaLJ8gOZCSZCjkZBwkZD&limit=25`;

    fetchVideos(initialUrl);
  }, [albumName]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      fetchVideos(nextPage);
    }
  }, [nextPage, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Function to extract description until the first comma
  const extractDescription = (description) => {
    const commaIndex = description.indexOf(',');
    return commaIndex !== -1 ? description.slice(0, commaIndex) : description;
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Album: {albumName}</h2>

      <div className="video-list">
        {/* Embeddable Videos */}
        <div className="embeddable-videos" style={{ marginBottom: '40px' }}>
          {videos.length > 0 && videos.filter(video => video.embeddable).map((video) => (
            <div
              key={video.id}
              className="video-item"
              style={{
                marginBottom: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '200px',
              }}
            >
              <h3>{extractDescription(video.description)}</h3>
              <div
                style={{
                  position: 'relative',
                  width: '375px',  
                  height: '667px',  
                  background: '#000',  
                  borderRadius: '30px',  
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',  
                  margin: '0 auto',  
                  overflow: 'hidden', 
                }}
              >
                <iframe
                  src={`https://www.facebook.com/v2.9/plugins/video.php?href=https://www.facebook.com${video.permalink_url}`}
                  title={video.description}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Embeddable Videos (Links) */}
        <div className="non-embeddable-videos" style={{ marginBottom: '40px' }}>
          {videos.length > 0 && videos.filter(video => !video.embeddable).map((video) => (
            <div
              key={video.id}
              className="video-item"
              style={{
                marginBottom: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100px',
              }}
            >
              <h3>{extractDescription(video.description)}</h3>
              <a
                href={`https://www.facebook.com${video.permalink_url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'underline',
                  color: '#1a73e8',
                  fontSize: '14px',
                }}
              >
                Watch Video
              </a>
            </div>
          ))}
        </div>
      </div>

      {isLoading && <div style={{ textAlign: 'center' }}>Snimci se učitavaju, molim Vas sačekajte.</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default VideoListPage;