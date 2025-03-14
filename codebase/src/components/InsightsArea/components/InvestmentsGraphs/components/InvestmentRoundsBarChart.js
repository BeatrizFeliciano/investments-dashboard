import { ParentSize } from "@visx/responsive";
import { numberFormatter } from "../../../../../utils/formatters";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { blueColor, blueLightColor, graphDimensions } from "../../../../../constants";
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import "../../../InsightsArea.css";
import { Typography } from "@mui/material";

function InvestmentRoundsBarChart({investmentRounds, highlightEntity, highlightedInvestmentRounds, setHighlightRound}) {

    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();

    const maxAmount = 
        Math.max(...Object.keys(investmentRounds).map(
            (investmentKey) => investmentRounds[investmentKey].totalAmount)); 

    return (
        <div className="chart-wrapper">
            <Typography variant="h6" align="left">Money invested per investment round</Typography>
            <ParentSize style={{height: graphDimensions.height}}>
                {({ width, height }) => {
                    const xScale = scaleBand(
                        {
                            range: [0, width - graphDimensions.marginLeft],
                            domain: Object.keys(investmentRounds),
                        }
                    );
                
                    const yScale = scaleLinear(
                        {
                            range: [height - graphDimensions.marginBottom - graphDimensions.marginTop, 0],
                            domain: [0, maxAmount],
                            nice: true,
                        }
                    );

                    return (
                        <svg width={width} height={height}>
                            <Group
                                left={graphDimensions.marginLeft}
                                top={graphDimensions.marginTop}
                            >
                                <GridRows
                                    scale={yScale}
                                    width={width - graphDimensions.marginLeft}
                                    height={height - graphDimensions.marginBottom - graphDimensions.marginTop}
                                    stroke="rgba(0,0,0,0.3)"
                                />

                                {Object.keys(investmentRounds).map((investmentRoundKey) => {
                                    const round = investmentRoundKey;
                                    const totalAmount = investmentRounds[investmentRoundKey].totalAmount;
                                    const dates = [...investmentRounds[investmentRoundKey].investments.map((investment)=>investment.date)];
                                    const barsMargin = xScale.bandwidth() / 5;
                                    const barWidth = xScale.bandwidth() - barsMargin;
                                    const barHeight = height - graphDimensions.marginTop - graphDimensions.marginBottom - yScale(totalAmount);
                                    const barX = xScale(round) + barsMargin/2;
                                    const barY = height - graphDimensions.marginBottom - graphDimensions.marginTop - barHeight;

                                    return (
                                        <Bar
                                            key={`bar-${round}`}
                                            x={barX}
                                            y={barY}
                                            width={barWidth}
                                            height={barHeight}
                                            fill={highlightEntity ? blueLightColor : blueColor } 
                                            onMouseEnter={(e) => {
                                                showTooltip({
                                                    tooltipData: { 
                                                        round, 
                                                        totalAmount, 
                                                        dates
                                                    },
                                                    tooltipLeft: e.clientX,
                                                    tooltipTop: e.clientY,
                                                });
                                                setHighlightRound(round);
                                            }}
                                            onMouseLeave={() => {
                                                hideTooltip();
                                                setHighlightRound();
                                            }}
                                            onMouseMove={(e) => {
                                                showTooltip({
                                                    tooltipData: { round, totalAmount, dates },
                                                    tooltipLeft: e.clientX,
                                                    tooltipTop: e.clientY,
                                                });
                                            }}
                                        />
                                    )
                                })}
                                {/* Highlight amounts corresponding to hovered entity */}
                                {highlightEntity && Object.keys(highlightedInvestmentRounds).map((investmentRoundKey) => {
                                    const round = investmentRoundKey;
                                    const totalAmount = highlightedInvestmentRounds[investmentRoundKey].totalAmount;
                                    const barsMargin = xScale.bandwidth() / 5;
                                    const barWidth = xScale.bandwidth() - barsMargin;
                                    const barHeight = height - graphDimensions.marginTop - graphDimensions.marginBottom - yScale(totalAmount);
                                    const barX = xScale(round) + barsMargin/2;
                                    const barY = height - graphDimensions.marginBottom - graphDimensions.marginTop - barHeight;

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
                                                    },
                                                    tooltipLeft: e.clientX,
                                                    tooltipTop: e.clientY,
                                                });
                                            }}
                                            onMouseLeave={() => hideTooltip()}
                                            onMouseMove={(e) => {
                                                showTooltip({
                                                    tooltipData: { round, totalAmount },
                                                    tooltipLeft: e.clientX,
                                                    tooltipTop: e.clientY,
                                                });
                                            }}
                                        />
                                    )
                                })}
                                <AxisBottom
                                    scale={xScale}
                                    top={height - graphDimensions.marginBottom - graphDimensions.marginTop}
                                />
                                <AxisLeft
                                    scale={yScale}
                                    tickFormat={(value) => `${numberFormatter(value)}`}
                                />

                            </Group>
                        </svg>
                    );
                }}
            </ParentSize>
            {tooltipOpen && (
                <TooltipWithBounds
                    top={tooltipTop}
                    left={tooltipLeft}
                    className="tooltip"
                >
                    <div>
                        <Typography align="left">
                            <b>Investment round:</b> {tooltipData.round}
                        </Typography>
                        <Typography align="left">
                            <b>Total amount:</b> {numberFormatter(tooltipData.totalAmount)} USD
                        </Typography>
                        <Typography align="left">
                            <b>Dates:</b> {tooltipData.dates.map((date) => 
                                    `${new Date(date).toLocaleString("en-US", { month: "long", year: "numeric" })} `
                            )}
                        </Typography>
                    </div>
                </TooltipWithBounds>
            )}
        </div>
                
    );
}

export default InvestmentRoundsBarChart;