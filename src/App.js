import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlbumGallery from "./AlbumGallery";
import VideoListPage from "./VideoListPage";
import AppHeader from "./AppHeader";
import "./App.css";

function App() {
  const textStyle = { fontFamily: "Times New Roman, Times, serif" };

  return (
    <Router>
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
        <Routes>
          <Route path="/webshop" element={<AlbumGallery />} />
          <Route path="/videos/:albumId" element={<VideoListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
