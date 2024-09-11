import React from "react";
import albumData from "./albumData.json";
import "./App.css"; // Make sure the CSS file is imported

// Group the albums by category
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

  return (
    <div className="album-gallery">
      {categoryOrder.map(
        (category) =>
          groupedAlbums[category] && (
            <div key={category} className="category-section">
              <h2>{category}</h2>
              <div className="album-items">
                {groupedAlbums[category].map((album) => (
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
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <p>{album.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default AlbumGallery;
