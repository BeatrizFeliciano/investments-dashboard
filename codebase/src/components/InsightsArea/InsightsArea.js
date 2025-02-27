import { Typography } from "@mui/material";
import DemographicInfo from "./components/DemographicInfo";
import "./InsightsArea.css";
import { getEntityNumInvestments, getEntityTotalInvested } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";

function InsightsArea({ selectedEntity }) {
    return (
        <div className="insights-area-wrapper">
            <div className="overview-insigths">
                {selectedEntity && <DemographicInfo selectedEntity={selectedEntity}/>}
                <div className="total-investments-cards">
                    <InformationCard
                        label="Total amount invested"
                        value={`${numberFormatter(getEntityTotalInvested(selectedEntity))} USD`}
                    />
                    <InformationCard
                        label="Total investments count"
                        value={`${getEntityNumInvestments(selectedEntity)}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default InsightsArea;