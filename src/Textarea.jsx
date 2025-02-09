import PropTypes from "prop-types";

export function Textarea({ texte, setTexte }) {
  return (
    <textarea
      placeholder="Entrez votre texte ici..."
      value={texte}
      onChange={(e) => setTexte(e.target.value)}
    />
  );
}
Textarea.propTypes = {
  texte: PropTypes.string.isRequired,
  setTexte: PropTypes.func.isRequired,
};
