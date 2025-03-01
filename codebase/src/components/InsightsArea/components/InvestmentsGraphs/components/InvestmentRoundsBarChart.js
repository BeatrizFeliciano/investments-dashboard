import { ParentSize } from "@visx/responsive";
import { numberFormatter } from "../../../../../utils/formatters";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { blueColor } from "../../../../../constants";
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import "../../../InsightsArea.css";

function InvestmentRoundsBarChart({investmentRounds}) {

    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();

    const marginBottom = 40;
    const marginTop = 10;
    const marginLeft = 50;

    const maxAmount = 
        Math.max(...Object.keys(investmentRounds).map(
            (investmentKey) => investmentRounds[investmentKey].totalAmount)); 

    return (
        <div style={{width: "50%", height: "100%"}}>
            <ParentSize style={{width: "100%", height: 500}}>
                {({ width, height }) => {
                    const xScale = scaleBand(
                        {
                            range: [0, width - marginLeft],
                            domain: Object.keys(investmentRounds),
                        }
                    );
                
                    const yScale = scaleLinear(
                        {
                            range: [height - marginBottom - marginTop, 0],
                            domain: [0, maxAmount],
                            nice: true,
                        }
                    );

                    return (
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
                                    const dates = [...investmentRounds[investmentRoundKey].investments.map((investment)=>investment.date)];
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
                                                        dates
                                                    },
                                                    tooltipLeft: e.clientX,
                                                    tooltipTop: e.clientY,
                                                });
                                            }}
                                            onMouseLeave={() => hideTooltip()}
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
                    );
                }}
            </ParentSize>
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
        </div>
                
    );
}

export default InvestmentRoundsBarChart;