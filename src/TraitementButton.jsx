import PropTypes from "prop-types";

export function TraitementButton({ traiterTexte, modeChiffrement, vider }) {
  return (
    <div className="boutons">
      <button onClick={traiterTexte}>
        {modeChiffrement ? "Chiffrer 🔒" : "Déchiffrer 🔓"}
      </button>
      <button onClick={vider}>Vider</button>
    </div>
  );
}
TraitementButton.propTypes = {
  traiterTexte: PropTypes.func.isRequired,
  modeChiffrement: PropTypes.bool.isRequired,
  vider: PropTypes.func.isRequired
};
