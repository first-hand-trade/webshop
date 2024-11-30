import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlbumGallery from "./AlbumGallery";
import VideoGallery from "./VideoListPage";
import AppHeader from "./AppHeader";
import "./App.css";

function App() {
  const textStyle = { fontFamily: "Times New Roman, Times, serif" };
  const pageId = "162319753623834"; 
  const accessToken = "EAAVY2FTdg5EBO8r611rZAVJw5xJcSyVfPQWfXNh1HpzAwwpXATFyem4IwyFc4qZCnXyUcvFSiT3RAxbTVgnZBW9tsl5dFXauoZAXSzx04RemJlJp3pYtkAM8lNiNg0OJ2J5ZAdmMTZADgJUFbHcE1REozpOECqkLxJ6YLgATIKvP5nWZCORaaLJ8gOZCSZCjkZBwkZD"; // Replace with your access token
  const albumNames = [
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
          <Route path="/videos/:albumName" element={<VideoGallery pageId={pageId} accessToken={accessToken} albumNames={albumNames} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
