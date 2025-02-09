import PropTypes from "prop-types";

export function Resultat({ resultat }) {
  return (
    <div className="resultat">
      <h2>Résultat :</h2>
      <p>{resultat}</p>
    </div>
  );
}
Resultat.propTypes = {
  resultat: PropTypes.string.isRequired,
};
