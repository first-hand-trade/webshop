import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import albumData from "./albumData.json";
import "./App.css";

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
  const groupedAlbums = groupAlbumsByCategory(albumData);

  const handleAlbumClick = (albumLink) => {
    let link = albumLink.replace("www.facebook.com", "m.facebook.com");

    if (!link.includes("?")) {
      link += "?ref=web&no_redirect=1";
    } else {
      link += "&ref=web&no_redirect=1";
    }

    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="album-gallery">
      {categoryOrder.map(
        (category) =>
          groupedAlbums[category] && (
            <div key={category} className="category-section">
              <h2>{category}</h2>
              <div className="album-items">
                {groupedAlbums[category].map((album) => (
                  <div key={album.id} className="album-item">
                    <div style={{ textAlign: "center", width: "250px" }}>
                      <img
                        src={album.coverPhotoUrl}
                        alt={album.title}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <p>
                        <Link
                          href={album.albumLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default navigation
                            handleAlbumClick(album.albumLink);
                          }}
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "#3b5998",
                          }}
                        >
                          {album.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AlbumGallery;
