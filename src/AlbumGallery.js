import React from "react";
import albumData from "./albumData.json";

const AlbumGallery = () => {
  return (
    <div className="album-gallery">
      {albumData.map((album) => (
        <a
          key={album.id}
          href={album.albumLink}
          target="_blank"
          rel="noopener noreferrer"
          className="album-item"
        >
          <div style={{ textAlign: "center", width: "250px" }}>
            <img
              src={album.coverPhotoUrl}
              alt={album.title}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <p>{album.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AlbumGallery;
