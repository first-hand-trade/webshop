import React from "react";
import AlbumGallery from "./AlbumGallery";
import AppHeader from "./AppHeader";
import "./App.css";

function App() {
  const textStyle = { fontFamily: "Times New Roman, Times, serif" };

  return (
    <div className="main-app-container" style={textStyle}>
      <header className="main-app-header">
        <img
          src="https://i.imgur.com/slVWHlo.jpeg"
          alt="First Hand Trade Logo"
          className="brand-logo"
        />
        <a
          href="https://www.facebook.com/profile.php?id=61552553316969"
          style={{ textDecoration: "none" }}
        >
          <h1>FIRST HAND TRADE</h1>
        </a>
      </header>
      <AppHeader />
      <AlbumGallery />
    </div>
  );
}

export default App;
