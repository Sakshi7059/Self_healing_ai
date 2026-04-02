import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function AnomalyChart({ history }) {
  return (
    <div className="card" style={{ height: "400px", width: "100%" }}>
      <h2>Anomaly Trend</h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={history}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnomalyChart;
