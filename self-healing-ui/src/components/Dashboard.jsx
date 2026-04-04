/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState,} from "react";
//import { fetchData } from "../services/api";
import StatusCard from "./StatusCard";
import AnomalyChart from "./AnomalyChart";
import SuggestionPanel from "./SuggestionPanel";
import MetricCircle from "./MetricCircle";




function Dashboard() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [animateStatus, setAnimateStatus] = useState(false);
  const [toast, setToast] = useState("");
  const [healing, setHealing] = useState("");
  const [logs, setLogs] = useState([]);


  const loadData = () => {

  const randomScore = Math.random();
  const cpu = Math.floor(Math.random() * 100);
  const memory = Math.floor(Math.random() * 100);
  const latency = Math.floor(Math.random() * 300);

  let status = "";
  let suggestion = "";

  if (randomScore < 0.3) {
    status = "Healthy";
    suggestion = "System stable.";
  } 
  else if (randomScore < 0.7) {
    status = "Warning";
    suggestion = "Monitor memory usage.";
  } 
  else {
    status = "Critical";
    suggestion = "Restart affected service immediately.";
  }

  const mockResponse = {
    anomaly_score: randomScore.toFixed(2),
    status: status,
    suggestion: suggestion,
    cpu,
    memory,
    latency
  };

  setData(mockResponse);

  setHistory(prev => [
    ...prev,
    {
      time: new Date().toLocaleTimeString(),
      score: randomScore
    }
  ]);
  const time = new Date().toLocaleTimeString();

setLogs(prev => [
  ...prev,
  `[${time}] Status: ${status}`
]);
setLogs(prev => {
  const updated = [
    ...prev,
    `[${time}] Status: ${status}`
  ];
  return updated.slice(-8); // keep last 8 logs
});
};

useEffect(() => {
  if (data?.status) {
    setAnimateStatus(true);

    const timer = setTimeout(() => {
      setAnimateStatus(false);
    }, 500);

    return () => clearTimeout(timer);
    
  }
}, [data?.status]);

useEffect(() => {
  if (data?.status) {
    setToast(`System status changed to ${data.status}`);

    setTimeout(() => setToast(""), 2000);
  }
}, [data?.status]);


  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);
  

 const handleRecovery = () => {
  setToast("Auto-Healing Started...");
  setHealing(true);

  setTimeout(() => {
  setHealing(false);
    setToast("System Recovered Successfully");
  }, 1500);
};


  return (
  <div className="dashboard">
    <div className="title">
      🤖 Live System Insights
      <span className="ai-indicator"></span>
    </div>
     {toast && (
  <div className="toast">
    {toast}
  </div>
)}

{healing && <div className="heal-success card">Healing in progress...</div>}
    {data && (
      <>
        {/* Metrics */}
        <div className="grid">

  <div className="card">
  <h3>CPU Usage</h3>

  <div className="bar">
    <div 
      className="fill" 
      style={{ width: `${data.cpu}%` }}
    ></div>
  </div>

  <p>{data.cpu}%</p>
</div>

  <div className="card">
    <h3>Network Latency</h3>
    <h2>{data.latency} ms</h2>
  </div>

 <div className="card">
  <h3>Memory Usage</h3>

  <div className="bar">
    <div 
      className="fill" 
      style={{ width: `${data.memory}%` }}
    ></div>
  </div>

  <p>{data.memory}%</p>
</div>
<div 
  className="fill"
  style={{
    width: `${data.cpu}%`,
    background:
      data.cpu < 40
        ? "#22c55e"   // green
        : data.cpu < 70
        ? "#facc15"   // yellow
        : "#ef4444"   // red
  }}
></div>
  

 <div className={`card ${data.status.toLowerCase()} ${data.status === "Critical" ? "critical-pulse" : ""} ${animateStatus ? "status-animate" : ""}`}>

    <h3>System Status</h3>
    <h2>{data.status}</h2>
    <p>Anomaly Score: {data.anomaly_score}</p>

    {data.status === "Critical" && (
      <button className="button" onClick={handleRecovery}>
        🔄 Trigger Auto-Healing
      </button>
    )}
  </div>

</div>

    {/* Suggestion */}
      <div className="card" style={{ marginTop: "20px" }}>
          <h3>AI Prevention Suggestion</h3>
          <p>{data.suggestion}</p>
        </div>
        <div className="card" style={{ marginTop: "20px" }}>
  <h3>System Logs</h3>

  <div className="logs">
    {logs.length === 0 ? (
      <p>No logs yet...</p>
    ) : (
      logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))
    )}
  </div>
</div>

        {/* Chart */}
        <div style={{ marginTop: "20px", width: "100%" }}>
  <AnomalyChart history={history} />
</div>
<MetricCircle value={data.cpu} title="CPU Usage" />
<MetricCircle value={data.memory} title="Memory Usage" />
{toast && <div className="toast">{toast}</div>}
      </>
    )}
  </div>
);
}

export default Dashboard;
