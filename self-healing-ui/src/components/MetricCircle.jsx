import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MetricCircle({ value, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div style={{ width: "120px", margin: "auto" }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: "#38bdf8",
            trailColor: "#334155"
          })}
        />
      </div>
    </div>
  );
}

export default MetricCircle;