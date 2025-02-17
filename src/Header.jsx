import PropTypes from "prop-types";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

export function Header({
  modeSombre,
  setModeSombre,
  setAfficherHistorique,
  exporterHistorique,
}) {
  return (
    <div className="header">
      <button className="mode" onClick={() => setModeSombre(!modeSombre)}>
        {modeSombre ? <FaSun /> : <FaMoon />}
      </button>
      <h1> CryptMe </h1>
      <div className="historique-section">
        <button
          className="btn-historique"
          onClick={() => setAfficherHistorique(true)}
        >
          🗑️ Historique
        </button>
        <button className="btn-exporter" onClick={exporterHistorique}>
          <FiDownload />
        </button>
      </div>
    </div>
  );
}
Header.propTypes = {
  modeSombre: PropTypes.bool.isRequired,
  setModeSombre: PropTypes.func.isRequired,
  setAfficherHistorique: PropTypes.func.isRequired,
  exporterHistorique: PropTypes.func.isRequired,
};
