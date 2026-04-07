import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex " }}>
      
      {/* Sidebar
      <div className="sidebar">
        <a href="#">Dashboard</a>
        <a href="#">Logs</a>
        <a href="#">AI Model</a>
        <a href="#">Settings</a>
      </div> */}

          <div className="main-content">
        {/* Header Bar */}
        <div className="header">
          <h2>AI Self-Healing Monitoring System</h2>
        </div>

      {/* Main Dashboard Area */}
      <Dashboard />
    </div>
    </div>
  );
}

export default App;
