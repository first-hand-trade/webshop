import React, { useEffect, useState } from "react";
import albumData from "./albumData.json";
import "./App.css";
import { useNavigate } from "react-router-dom";

const usePlatform = () => {
  const [platform, setPlatform] = useState("desktop");
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setPlatform("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setPlatform("ios");
    } else {
      setPlatform("desktop");
    }
  }, []);
  return platform;
};

const groupAlbumsByCategory = (albums) => {
  return albums.reduce((acc, album) => {
    const { category } = album;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(album);
    return acc;
  }, {});
};

const categoryOrder = [
  "MIKSEVI",
  "SPORTSKI PROGRAM I DUKSERICE",
  "PAMUČNE-LIKRA BLUZE DUG RUKAV",
  "HALJINE",
  "JAKNE, PRSLUCI, SAKOI",
  "BLUZE",
  "MAJICE KRATAK RUKAV",
  "DŽEMPERI",
  "PANTALONE, FARMERICE, ŠALVARE, HELANKE I ŠORCEVI",
  "KUĆNI TEKSTIL, BADEMANTILI, AKSESOARI, IGRAČKE, RADNA ODELA, TORBE, BRUSEVI",
  "SNIŽENJA",
];

const AlbumGallery = () => {
  const [albums, setAlbums] = useState([]);
  const platform = usePlatform();
  const groupedAlbums = groupAlbumsByCategory(albumData);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch albums from Facebook Graph API
    const fetchAlbums = async () => {
      let allAlbums = [];
      let nextPageUrl = `https://graph.facebook.com/162319753623834/albums?fields=id,name,cover_photo,picture&access_token=EAAVY2FTdg5EBO8r611rZAVJw5xJcSyVfPQWfXNh1HpzAwwpXATFyem4IwyFc4qZCnXyUcvFSiT3RAxbTVgnZBW9tsl5dFXauoZAXSzx04RemJlJp3pYtkAM8lNiNg0OJ2J5ZAdmMTZADgJUFbHcE1REozpOECqkLxJ6YLgATIKvP5nWZCORaaLJ8gOZCSZCjkZBwkZD`;
    
      try {
        while (nextPageUrl) {
          const response = await fetch(nextPageUrl);
          const data = await response.json();
          allAlbums = allAlbums.concat(data.data);
          nextPageUrl = data.paging && data.paging.next ? data.paging.next : null; 
        }
        setAlbums(allAlbums);
        console.log("All Albums:", allAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
  
    fetchAlbums();
  }, []); 

  // const handleAlbumClick = (albumId) => {
  //   navigate(`/videos/${albumId}`);
  // };

  const handleAlbumClick = (albumLink) => {
    window.open(albumLink, "_blank");  
  };

  return (
    <div className="album-gallery">
      {categoryOrder.map((category) => (
        groupedAlbums[category] && (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="album-items">
              {groupedAlbums[category].map((groupedAlbum) => {
                return albums
                  .filter((album) => album.name === groupedAlbum.title)
                  .map((album) => (
                    <div
                      key={album.id}
                      className="album-item"
                      onClick={() => handleAlbumClick(`https://m.facebook.com/${album.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div style={{ textAlign: "center", width: "250px" }}>
                        <img
                          src={album.picture.data.url} 
                          alt={album.name}
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <p>{album.name}</p>
                      </div>
                    </div>
                  ));
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default AlbumGallery;
