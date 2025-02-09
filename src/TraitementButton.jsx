import PropTypes from "prop-types";

export function TraitementButton({ traiterTexte, modeChiffrement }) {
  return (
    <div className="boutons">
      <button onClick={traiterTexte}>
        {modeChiffrement ? "Chiffrer 🔒" : "Déchiffrer 🔓"}
      </button>
    </div>
  );
}
TraitementButton.propTypes = {
  traiterTexte: PropTypes.func.isRequired,
  modeChiffrement: PropTypes.bool.isRequired,
};
