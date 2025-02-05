import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [texte, setTexte] = useState("");
  const [decalage, setDecalage] = useState(0);
  const [resultat, setResultat] = useState("");
  const [afficherHistorique, setAfficherHistorique] = useState(false);
  const [filtres, setFiltres] = useState({ Tous: true, Chiffrement: false, Déchiffrement: false });

  const [historique, setHistorique] = useState(() => {
    const sauvegarde = localStorage.getItem("historiqueChiffrement");
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });

  useEffect(() => {
    localStorage.setItem("historiqueChiffrement", JSON.stringify(historique));
  }, [historique]);

  const chiffrerTexte = () => {
    const texteChiffre = chiffrementCesar(texte, decalage);
    setResultat(texteChiffre);
    ajouterAHistorique("Chiffrement", texte, texteChiffre, decalage);
  };

  const dechiffrerTexte = () => {
    const texteDechiffre = chiffrementCesar(texte, -decalage);
    setResultat(texteDechiffre);
    ajouterAHistorique("Déchiffrement", texte, texteDechiffre, decalage);
  };

  const ajouterAHistorique = (type, original, resultat, decalage) => {
    const nouvelleEntree = {
      type,
      original,
      resultat,
      decalage,
      date: new Date().toLocaleString(),
    };
    setHistorique([nouvelleEntree, ...historique]);
  };

  const viderHistorique = () => {
    setHistorique([]);
    localStorage.removeItem("historiqueChiffrement");
  };

  const filtrerHistorique = (entree) => {
    if (filtres.Tous) return true;
    if (filtres.Chiffrement && entree.type === "Chiffrement") return true;
    if (filtres.Déchiffrement && entree.type === "Déchiffrement") return true;
    return false;
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setFiltres({ Tous: false, Chiffrement: false, Déchiffrement: false, [name]: true });
  };

  return (
    <div className="application">
      <h1>🔒 Chiffrement De César 🔑</h1>

      <textarea
        placeholder="Entrez votre texte ici..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />

      <input
        type="number"
        placeholder="Décalage"
        value={decalage}
        onChange={(e) => setDecalage(Number(e.target.value))}
      />

      <div className="boutons">
        <button onClick={chiffrerTexte}>Chiffrer 🔒</button>
        <button onClick={dechiffrerTexte}>Déchiffrer 🔓</button>
      </div>

      <div className="resultat">
        <h2>Résultat :</h2>
        <p>{resultat}</p>
      </div>

      <button className="btn-historique" onClick={() => setAfficherHistorique(true)}>
        📂 Historique
      </button>

      <div className={`sidebar ${afficherHistorique ? "active" : ""}`}>
        <button className="btn-fermer" onClick={() => setAfficherHistorique(false)}>❌</button>
        <h2>Historique des opérations</h2>

        {/* Filtres */}
        <div className="filtres">
          <label>
            <input
              type="checkbox"
              name="Tous"
              checked={filtres.Tous}
              onChange={handleCheckboxChange}
            />
            Tous
          </label>
          <label>
            <input
              type="checkbox"
              name="Chiffrement"
              checked={filtres.Chiffrement}
              onChange={handleCheckboxChange}
            />
            Chiffrer
          </label>
          <label>
            <input
              type="checkbox"
              name="Déchiffrement"
              checked={filtres.Déchiffrement}
              onChange={handleCheckboxChange}
            />
            Déchiffrer
          </label>
        </div>

        {historique.filter(filtrerHistorique).length === 0 ? (
          <p>Aucune opération à afficher.</p>
        ) : (
          <ul className="historique-list">
            {historique.filter(filtrerHistorique).map((entree, index) => (
              <li key={index} className="historique-item">
                <strong>{entree.type}</strong> (Décalage: {entree.decalage})<br />
                <em>Texte original :</em> {entree.original}<br />
                <em>Résultat :</em> {entree.resultat}<br />
                <small>{entree.date}</small>
              </li>
            ))}
          </ul>
        )}
        <button className="btn-reset" onClick={viderHistorique}>Vider historique</button>
      </div>
    </div>
  );
}

function chiffrementCesar(texte, decalage) {
  return texte.replace(/[a-z]/gi, (lettre) => {
    const base = lettre === lettre.toUpperCase() ? 65 : 97;
    return String.fromCharCode(
      ((lettre.charCodeAt(0) - base + decalage + 26) % 26) + base
    );
  });
} 
