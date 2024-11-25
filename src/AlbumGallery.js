import React, { useEffect, useState } from "react";
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
  const platform = usePlatform();

  const handleAlbumClick = (albumLink) => {
    let link = albumLink.replace("www.facebook.com", "m.facebook.com");

    // Force opening in browser
    if (!link.includes("?")) {
      link += "?ref=web&no_redirect=1";
    } else {
      link += "&ref=web&no_redirect=1";
    }

    if (platform === "android" || platform === "ios") {
      // Try to open via navigator if on mobile
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = link;
      document.body.appendChild(iframe);

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      // Fallback to browser if iframe fails
      setTimeout(() => {
        window.open(link, "_blank");
      }, 1500);
    } else {
      // Default for desktop
      window.open(link, "_blank", "noopener,noreferrer");
    }
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
                  <div
                    key={album.id}
                    className="album-item"
                    onClick={() => handleAlbumClick(album.albumLink)}
                    style={{ cursor: "pointer" }}
                  >
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
                      <p>{album.title}</p>
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
