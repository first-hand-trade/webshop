import React from "react";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <header className="app-header">
      <h2 className="main-title">
        Veleprodaja Second Hand Garderobe - Beograd Zvezdara
      </h2>
      <p className="sub-title">
        Poručivanje putem Vibera na{" "}
        <a href="viber://contact?number=+38163355577">063 355 577</a>. Ako
        želite posetu, pišite na ovaj broj da zakažemo termin.
      </p>
      <p className="note">
        <strong>NAPOMENA:</strong> Nije moguća kupovina na komad, biranje ili
        deo džaka. Minimum za kupovinu je ceo džak. Nismo maloprodaja, već
        veleprodaja.
      </p>
    </header>
  );
};

export default AppHeader;
