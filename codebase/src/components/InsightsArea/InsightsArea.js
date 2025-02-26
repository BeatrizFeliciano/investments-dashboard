import DemographicInfo from "./components/DemographicInfo";
import "./InsightsArea.css";

function InsightsArea({ selectedEntity }) {
    return (
        <div className="insights-area-wrapper">
            {selectedEntity && <DemographicInfo selectedEntity={selectedEntity}/>}
        </div>
    );
}

export default InsightsArea;