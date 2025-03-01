import DemographicInfo from "./components/DemographicInfo";
import { getEntityMarketSegments, getEntityNumInvestments, getEntitySolutionSegments, getEntityTotalInvested, getMarketSegmentName, getSolutionSegmentName } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";
import "./InsightsArea.css";
import InvestmentsGraphs from "./components/InvestmentsGraphs/InvestmentsGraphs";
import { Box, Grid, Typography } from "@mui/material";
import { blueColor, BOX_SHADOW } from "../../constants";


function InsightsArea({ selectedEntity }) {  
    const marketSegments = getEntityMarketSegments(selectedEntity);   
    const solutionSegments = getEntitySolutionSegments(selectedEntity);    
    
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
                    {marketSegments && <Box 
                        className="investment-areas"
                        component={Grid}
                        direction="column"
                        container
                        boxShadow={BOX_SHADOW}
                    >
                        <Typography 
                            className="investment-areas-title" 
                            color={blueColor} 
                            fontWeight="bold"
                            align="left"
                        >
                            Market Segments
                        </Typography>
                        <Typography 
                            className="investment-areas-list"
                            align="left"
                        >
                            {getEntityMarketSegments(selectedEntity).map((marketSegment) => (
                                <div className="area-investment">{getMarketSegmentName(marketSegment)}</div>
                            ))}
                        </Typography>
                    </Box>}
                    {solutionSegments && <Box 
                        className="investment-areas"
                        component={Grid}
                        direction="column"
                        container
                        boxShadow={BOX_SHADOW}
                    >
                        <div className="investment-areas-title">Solution Segments</div>
                        <div className="investment-areas-list">
                            {solutionSegments.map((solutionSegment) => (
                                <div className="area-investment">{getSolutionSegmentName(solutionSegment)}</div>
                            ))}
                        </div>
                    </Box>}
                </div>
            </div>
            <InvestmentsGraphs selectedEntity={selectedEntity}/>
        </div>
    );
}

export default InsightsArea;