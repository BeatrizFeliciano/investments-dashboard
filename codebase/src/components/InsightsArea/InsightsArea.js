import DemographicInfo from "./components/DemographicInfo";
import "./InsightsArea.css";
import { getEntityInvestmentsList, getEntityNumInvestments, getEntityTotalInvested, getInvestmentAmount, getInvestmentDate, getInvestmentRound } from "../../utils/getters";
import InformationCard from "./components/InformationCard";
import { numberFormatter } from "../../utils/formatters";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { blueColor } from "../../constants";
import { Tooltip, useTooltip, TooltipWithBounds } from '@visx/tooltip';


function InsightsArea({ selectedEntity }) {
    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();
    const investmentsList = useMemo(() => getEntityInvestmentsList(selectedEntity), [selectedEntity]);
    const investmentRounds = {};

    const width = 500;
    const height = 500;
    const marginBottom = 40;
    const marginTop = 10;
    const marginLeft = 50;

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
                range: [0, width - marginLeft], // TODO: define graph dimensions
                domain: Object.keys(investmentRounds),
            }), [maxAmount]
    );

    const yScale = useMemo(
        () => 
            scaleLinear({
                range: [height - marginBottom - marginTop, 0], // TODO: define graph dimensions
                domain: [0, maxAmount],
                nice: true,
            })
    );

    console.log(tooltipOpen)
    


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
            <div style={{ display:"flex", flexDirection:"row", gap:20 }}>
                <svg width={width} height={height}>
                    <Group
                        left={marginLeft}
                        top={marginTop}
                    >
                        <GridRows
                            scale={yScale}
                            width={width - marginLeft}
                            height={height - marginBottom - marginTop}
                            stroke="rgba(0,0,0,0.3)"
                        />

                        {Object.keys(investmentRounds).map((investmentRoundKey) => {
                            const round = investmentRoundKey;
                            const totalAmount = investmentRounds[investmentRoundKey].totalAmount;
                            const barsMargin = xScale.bandwidth() / 5;
                            const barWidth = xScale.bandwidth() - barsMargin;
                            const barHeight = height - marginTop - marginBottom - yScale(totalAmount);
                            const barX = xScale(round) + barsMargin/2;
                            const barY = height - marginBottom - marginTop - barHeight;

                            return (
                                <Bar
                                    key={`bar-${round}`}
                                    x={barX}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={blueColor}
                                    onMouseEnter={(e) => {
                                        showTooltip({
                                            tooltipData: { 
                                                round, 
                                                totalAmount, 
                                                dates: [...investmentRounds[investmentRoundKey].investments.map((investment)=>investment.date)]
                                            },
                                            tooltipLeft: e.clientX,
                                            tooltipTop: e.clientY,
                                        });
                                    }}
                                    onMouseLeave={() => hideTooltip()}
                                />
                            )
                        })}
                        <AxisBottom
                            scale={xScale}
                            top={height - marginBottom - marginTop}
                        />
                        <AxisLeft
                            scale={yScale}
                            tickFormat={(value) => `${numberFormatter(value)}`}
                        />

                    </Group>
                </svg>
                {tooltipOpen && (
                    <TooltipWithBounds
                        top={tooltipTop}
                        left={tooltipLeft}
                        style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', position:"absolute" }}
                    >
                        <div>
                            <strong>{tooltipData.round}</strong>
                            <div>{numberFormatter(tooltipData.totalAmount)} USD</div>
                            {tooltipData.dates.map((date) => <div>{new Date(date).toString()}</div>)}
                        </div>
                    </TooltipWithBounds>
                )}
                <div>Graph2</div>
            </div>
        </div>
    );
}

export default InsightsArea;