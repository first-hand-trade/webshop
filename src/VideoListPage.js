import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoListPage = () => {
  const { albumName } = useParams(); 
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState(null); 

  const fetchVideos = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const filteredVideos = data.data.filter((video) =>
        video.description.includes(albumName) 
      );

      setVideos((prevVideos) => [...prevVideos, ...filteredVideos]);
      setNextPage(data.paging?.next || null); 
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    const initialUrl = `https://graph.facebook.com/162319753623834/videos?fields=permalink_url,description&access_token=EAAVY2FTdg5EBO8r611rZAVJw5xJcSyVfPQWfXNh1HpzAwwpXATFyem4IwyFc4qZCnXyUcvFSiT3RAxbTVgnZBW9tsl5dFXauoZAXSzx04RemJlJp3pYtkAM8lNiNg0OJ2J5ZAdmMTZADgJUFbHcE1REozpOECqkLxJ6YLgATIKvP5nWZCORaaLJ8gOZCSZCjkZBwkZD&limit=25`;

    
    fetchVideos(initialUrl);
  }, [albumName]);

  const loadMoreVideos = () => {
    if (nextPage) {
      fetchVideos(nextPage); 
    }
  };

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <h3>{video.description}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.facebook.com/v2.9/plugins/video.php?href=https://www.facebook.com${video.permalink_url}`}
              title={video.description}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>
        ))}
      </div>

      {nextPage && (
        <button onClick={loadMoreVideos}>Load More Videos</button>
      )}
    </div>
  );
};

export default VideoListPage;
