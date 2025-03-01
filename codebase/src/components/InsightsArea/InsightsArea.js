import DemographicInfo from "./components/DemographicInfo";
import { getEntityMarketSegments, getEntityNumInvestments, getEntitySolutionSegments, getEntityTotalInvested, getMarketSegmentName, getSolutionSegmentName } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";
import "./InsightsArea.css";
import InvestmentsGraphs from "./components/InvestmentsGraphs/InvestmentsGraphs";
import { useMemo } from "react";
import SegmentTable from "./components/SegmentTable";


function InsightsArea({ selectedEntity }) {  
    const marketSegments = useMemo(() => new Set(getEntityMarketSegments(selectedEntity).map(getMarketSegmentName)), [selectedEntity]);
    const solutionSegments = useMemo(() => new Set(getEntitySolutionSegments(selectedEntity).map(getSolutionSegmentName)), [selectedEntity]);
    
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
                <div className="investment-areas-wrapper">
                    <SegmentTable title="Market Segments" segments={[...marketSegments]}/>
                    <SegmentTable title="Solution Segments" segments={[...solutionSegments]}/>
                </div>
            </div>
            <InvestmentsGraphs selectedEntity={selectedEntity}/>
        </div>
    );
}

export default InsightsArea;