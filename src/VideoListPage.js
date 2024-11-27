import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoListPage = () => {
    const { albumId } = useParams(); 
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://graph.facebook.com/${albumId}/videos?access_token=EAAVY2FTdg5EBO8r611rZAVJw5xJcSyVfPQWfXNh1HpzAwwpXATFyem4IwyFc4qZCnXyUcvFSiT3RAxbTVgnZBW9tsl5dFXauoZAXSzx04RemJlJp3pYtkAM8lNiNg0OJ2J5ZAdmMTZADgJUFbHcE1REozpOECqkLxJ6YLgATIKvP5nWZCORaaLJ8gOZCSZCjkZBwkZD`
          );
          const data = await response.json();
          setVideos(data.data);
          console.log("Videos:", data.data);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
  
      fetchVideos();
    }, [albumId]);
  
    return (
      <div>
        <h2>Videos in Album {albumId}</h2>
        <div className="video-list">
          {videos.map((video) => (
            <div key={video.id} className="video-item">
              <h3>{video.title}</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default VideoListPage;