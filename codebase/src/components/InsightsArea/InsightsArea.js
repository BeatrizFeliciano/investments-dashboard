import DemographicInfo from "./components/DemographicInfo";
import "./InsightsArea.css";
import { getEntityInvestmentsList, getEntityNumInvestments, getEntityTotalInvested, getInvestmentAmount, getInvestmentRound } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useMemo } from "react";

function InsightsArea({ selectedEntity }) {
    const investmentsList = useMemo(() => getEntityInvestmentsList(selectedEntity), [selectedEntity]);
    const investmentRounds = {};

    investmentsList.forEach((investment) => {
        const currentInvestment = investmentRounds[getInvestmentRound(investment)];

        if (currentInvestment) {
            investmentRounds[getInvestmentRound(investment)] = {
                totalAmount: currentInvestment.totalAmount + getInvestmentAmount(investment),
                investments: [...currentInvestment.investments, investment],
            };

        }
        else {
            investmentRounds[getInvestmentRound(investment)] = {
                totalAmount: getInvestmentAmount(investment),
                investments: [investment],
            };
        }
    });

    const maxAmount = 
        Math.max(...Object.keys(investmentRounds).map(
            (investmentKey) => investmentRounds[investmentKey].totalAmount));

    const xScale = useMemo(
        () => 
            scaleBand({
                range: [0, 5000], // TODO: define graph dimensions
                domain: Object.keys(investmentRounds),
            }), [maxAmount]
    );

    const yScale = useMemo(
        () => 
            scaleLinear({
                range: [5000, 0], // TODO: define graph dimensions
                domain: [0, maxAmount],
                nice: true,
            })
    );
    


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
            <div>Graphs will be here</div>
        </div>
    );
}

export default InsightsArea;