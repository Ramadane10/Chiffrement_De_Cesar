import { useState, useEffect } from "react";
import "./index.css";
import { Header } from "./Header";
import { Textarea } from "./Textarea";
import { Decalage } from "./Decalage";
import { TraitementButton } from "./TraitementButton";
import { Resultat } from "./Resultat";
import { Sidebar } from "./Sidebar";

function App() {
  const [texte, setTexte] = useState("");
  const [decalage, setDecalage] = useState(0);
  const [resultat, setResultat] = useState("");
  const [afficherHistorique, setAfficherHistorique] = useState(false);
  const [filtres, setFiltres] = useState({
    Tous: true,
    Chiffrement: false,
    Déchiffrement: false,
  });
  const [modeChiffrement, setModeChiffrement] = useState(true);
  const [modeSombre, setModeSombre] = useState(false);

  const [historique, setHistorique] = useState(() => {
    const sauvegarde = localStorage.getItem("historiqueChiffrement");
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });

  useEffect(() => {
    localStorage.setItem("historiqueChiffrement", JSON.stringify(historique));
  }, [historique]);

  // const traiterTexte = () => {
  //   if (modeChiffrement) {
  //     const texteChiffre = chiffrementCesar(texte, decalage);
  //     setResultat(texteChiffre);
  //     setTexte(texteChiffre);
  //     ajouterAHistorique("Chiffrement", texte, texteChiffre, decalage);
  //   } else {
  //     const texteDechiffre = chiffrementCesar(texte, -decalage);
  //     setResultat(texteDechiffre);
  //     setTexte(texteDechiffre);
  //     ajouterAHistorique("Déchiffrement", texte, texteDechiffre, decalage);
  //   }
  // };

  const traiterTexte = () => {
    let texteTransforme;
    if (modeChiffrement) {
      texteTransforme = chiffrementCesar(texte, decalage);
      ajouterAHistorique("Chiffrement", texte, texteTransforme, decalage);
    } else {
      texteTransforme = chiffrementCesar(texte, -decalage);
      ajouterAHistorique("Déchiffrement", texte, texteTransforme, decalage);
    }
    setResultat(texteTransforme);
    setTexte(texteTransforme);
    setModeChiffrement(!modeChiffrement);
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

  const exporterHistorique = () => {
    const contenu = historique
      .map(
        (entree) =>
          `Date: ${entree.date}\nType: ${entree.type}\nDécalage: ${entree.decalage}\nTexte original: ${entree.original}\nRésultat: ${entree.resultat}\n--------------------\n`
      )
      .join("\n");
    const blob = new Blob([contenu], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historique_chiffrement.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filtrerHistorique = (entree) => {
    if (filtres.Tous) return true;
    if (filtres.Chiffrement && entree.type === "Chiffrement") return true;
    if (filtres.Déchiffrement && entree.type === "Déchiffrement") return true;
    return false;
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setFiltres({
      Tous: false,
      Chiffrement: false,
      Déchiffrement: false,
      [name]: true,
    });
  };

  const vider = () => {
    setTexte("");
    setResultat("");
    setDecalage(0);
  }
  return (
    <div className={`application ${modeSombre ? "dark-mode" : ""}`}>
      <Header
        modeSombre={modeSombre}
        setModeSombre={setModeSombre}
        setAfficherHistorique={setAfficherHistorique}
        exporterHistorique={exporterHistorique}
      />
      {/* Ajout des boutons radio */}
      <div className="mode-selection">
        <label>
          <input
            type="radio"
            name="mode"
            value="chiffrement"
            checked={modeChiffrement}
            onChange={() => setModeChiffrement(true)}
          />
          Chiffrer
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="dechiffrement"
            checked={!modeChiffrement}
            onChange={() => setModeChiffrement(false)}
          />
          Déchiffrer
        </label>
      </div>
      <Textarea texte={texte} setTexte={setTexte} />
      <Decalage decalage={decalage} setDecalage={setDecalage} />

      

      <TraitementButton traiterTexte={traiterTexte} modeChiffrement={modeChiffrement} vider={vider}/>
      <Resultat resultat={resultat} />
      <Sidebar
        afficherHistorique={afficherHistorique}
        setAfficherHistorique={setAfficherHistorique}
        historique={historique}
        filtrerHistorique={filtrerHistorique}
        filtres={filtres}
        handleCheckboxChange={handleCheckboxChange}
        viderHistorique={viderHistorique}
      />
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

export default App;
