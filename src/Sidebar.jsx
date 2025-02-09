import PropTypes from "prop-types";

export function Sidebar({
  afficherHistorique,
  setAfficherHistorique,
  historique,
  filtrerHistorique,
  filtres,
  handleCheckboxChange,
  viderHistorique,
}) {
  return (
    <div className={`sidebar ${afficherHistorique ? "active" : ""}`}>
      <button
        className="btn-fermer"
        onClick={() => setAfficherHistorique(false)}
      >
        ❌
      </button>
      <h2>Historique des opérations</h2>
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
              <em>Texte original :</em> {entree.original}
              <br />
              <em>Résultat :</em> {entree.resultat}
              <br />
              <small>{entree.date}</small>
            </li>
          ))}
        </ul>
      )}
      <button className="btn-reset" onClick={viderHistorique}>
        Vider historique
      </button>
    </div>
  );
}
Sidebar.propTypes = {
  afficherHistorique: PropTypes.bool.isRequired,
  setAfficherHistorique: PropTypes.func.isRequired,
  historique: PropTypes.array.isRequired,
  filtrerHistorique: PropTypes.func.isRequired,
  filtres: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  viderHistorique: PropTypes.func.isRequired,
};
