import PropTypes from "prop-types";

export function Decalage({ decalage, setDecalage }) {
  return (
    <input
      type="number"
      placeholder="Décalage"
      value={decalage}
      onChange={(e) => setDecalage(Number(e.target.value))}
    />
  );
}
Decalage.propTypes = {
  decalage: PropTypes.number.isRequired,
  setDecalage: PropTypes.func.isRequired,
};
