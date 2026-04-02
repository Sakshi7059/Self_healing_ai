function StatusCard({ score, status }) {

  const getGlow = () => {
    if (score < 0.3) return "glow-green";
    if (score < 0.7) return "glow-yellow";
    return "glow-red";
  };

  return (
    <div className={`card ${getGlow()}`}>
      <h2>System Status</h2>
      <h3>{status}</h3>
      <p>Anomaly Score: {score}</p>
    </div>
  );
}

export default StatusCard;
