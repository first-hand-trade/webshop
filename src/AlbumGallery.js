import React, { useEffect, useState } from "react";
import albumData from "./albumData.json";
import "./App.css";

const usePlatform = () => {
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    if (/FBAN|FBAV/i.test(ua)) {
      setPlatform("facebook-app");
    } else if (/android/i.test(ua)) {
      setPlatform("android");
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
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
  const platform = usePlatform();
  const groupedAlbums = groupAlbumsByCategory(albumData);

  const handleAlbumClick = (albumLink) => {
    let link = albumLink;

    // For Android and Facebook in-app browser, ensure proper link format
    if (platform === "android" || platform === "facebook-app") {
      if (link.includes("m.facebook.com")) {
        link = link.replace("m.facebook.com", "www.facebook.com");
      }

      // Add ref to avoid redirection issues
      if (!link.includes("?")) {
        link += "?ref=web";
      } else if (!link.includes("ref=")) {
        link += "&ref=web";
      }
    }

    // Open link in a new tab or redirect directly
    if (platform === "facebook-app") {
      // Optional: Redirect users in the FB app to a troubleshooting page
      window.location.href = "https://example.com/redirect_fb";
    } else {
      window.open(link, "_blank");
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
