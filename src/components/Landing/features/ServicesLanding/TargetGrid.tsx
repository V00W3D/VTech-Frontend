import React from "react";

interface Target {
  _id: string;
  name: string;
  icon?: string;
}

interface TargetGridProps {
  serviceName: string;
  targets: Target[];
  onRequest: () => void;
}

const TargetGrid: React.FC<TargetGridProps> = ({
  serviceName,
  targets,
  onRequest,
}) => {
  return (
    <div className="service-black-container">
      <h3 className="targets-title">
        Hacemos <span className="accent-text">{serviceName}</span> de:
      </h3>

      <div className="targets-grid">
        {targets.map((t) => (
          <div key={t._id} className="target-card">
            <div className="target-icon-wrapper">
              {t.icon ? (
                <img src={t.icon} alt={t.name} className="target-icon" />
              ) : (
                <div className="target-icon-placeholder" />
              )}
            </div>
            <span className="target-name">{t.name}</span>
          </div>
        ))}
      </div>

      <button className="request-btn" onClick={onRequest}>
        Solicitar un/una {serviceName}
      </button>
    </div>
  );
};

export default TargetGrid;
