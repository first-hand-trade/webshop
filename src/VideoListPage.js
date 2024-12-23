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

  const extractDescription = (description) => {
    const commaIndex = description.indexOf(',');
    return commaIndex !== -1 ? description.slice(0, commaIndex) : description;
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Album: {albumName}</h2>

      <div className="video-list">
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
              <h3>{video.description}</h3>
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
              <h3>{video.description}</h3>
              <a
                href={`https://www.facebook.com${video.permalink_url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#000', 
                  fontSize: '14px',
                  backgroundColor: '#C49C48', 
                  padding: '10px 20px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
                }}
              >
                Pogledaj snimak
              </a>
            </div>
          ))}
        </div>
      </div>

      {isLoading && <h1 style={{ textAlign: 'center', color: '#b71c1c !important'}}>Uopšteno snimcima treba do minut da se učitaju. Molim Vas sačekajte i ostanite na stranici.</h1>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default VideoListPage;
