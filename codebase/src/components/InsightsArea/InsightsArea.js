import DemographicInfo from "./components/DemographicInfo";
import { getEntityNumInvestments, getEntityTotalInvested } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";
import "./InsightsArea.css";
import InvestmentsGraphs from "./components/InvestmentsGraphs/InvestmentsGraphs";


function InsightsArea({ selectedEntity }) {         
    
    return (
        <div className="insights-area-wrapper">
            <div className="overview-marketsegments">
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
                <div style={{ width: "100%" }}>Tables will be here</div>
            </div>
            <InvestmentsGraphs selectedEntity={selectedEntity}/>
        </div>
    );
}

export default InsightsArea;