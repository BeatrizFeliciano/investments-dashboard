import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { blueColor, blueLightColor, graphDimensions } from "../../../../../constants";
import * as d3 from 'd3';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { numberFormatter } from "../../../../../utils/formatters";
import "../../../InsightsArea.css";
import { Typography } from "@mui/material";

function InvestedEntitiesBubbleChart({investedEntities, setHighlightEntity, highlightRound}) {

    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();

    return (
        <div style={{ width:"50%", height: "100%" }}>
            <Typography variant="h6" align="left">Invested entities</Typography>
            <ParentSize style={{width: "100%", height: graphDimensions.height}}>
                {({ width, height }) => {
                const radiusScale = d3.scaleSqrt()
                    .domain([
                        0, 
                        Math.max(...Object.keys(investedEntities).map(key => investedEntities[key].totalAmount)),
                    ])
                .range([1, width/6]); // Min and Max bubble radius
            
                // Create the nodes with radius
                const initialNodes = Object.keys(investedEntities).map(key => ({
                    ...investedEntities[key],
                    name: key,
                    rounds: investedEntities[key].rounds,
                    radius: radiusScale(investedEntities[key].totalAmount),
                }));
            
                // Create Force Simulation
                const simulation = d3.forceSimulation(initialNodes)
                .force("charge", d3.forceManyBody().strength(0)) // No attraction/repulsion
                .force("collision", d3.forceCollide().radius(d => d.radius + 2).strength(1))
                .force("x", d3.forceX(width / 2).strength(0.3)) // Centering force horizontally
                .force("y", d3.forceY(height / 2).strength(0.3)) // Centering force vertically
                .stop()
                .tick(300);

                return (
                    <svg width={width} height={height}>
                    <Group>
                        {initialNodes.map((d, i) => (
                            <>
                            <Circle
                                key={i}
                                cx={d.x}
                                cy={d.y}
                                r={d.radius}
                                fill={highlightRound ? blueLightColor : blueColor}
                                onMouseEnter={(e) => {
                                    showTooltip({
                                        tooltipData: { 
                                            name: d.name, 
                                            totalAmount: d.totalAmount, 
                                        },
                                        tooltipLeft: e.clientX,
                                        tooltipTop: e.clientY,
                                    });
                                    setHighlightEntity(d.name);
                                }}
                                onMouseLeave={() => {
                                    hideTooltip();
                                    setHighlightEntity();
                                }}
                                onMouseMove={(e) => {
                                    showTooltip({
                                        tooltipData: { 
                                            name: d.name, 
                                            totalAmount: d.totalAmount, 
                                        },
                                        tooltipLeft: e.clientX,
                                        tooltipTop: e.clientY,
                                    });
                                }}
                            />
                            {/* highlight circles according to hover on bar chart  */}
                            {highlightRound && d.rounds.has(highlightRound) && (
                                <Circle
                                    key={`highlight-${i}`}
                                    cx={d.x}
                                    cy={d.y}
                                    r={d.radius}
                                    fill={blueColor}
                                />
                            )}
                            
                            </>
                        ))}
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
                    <Typography align="left">
                        <b>Entity name:</b> {tooltipData.name}
                    </Typography>
                    <Typography align="left">
                        <b>Amount invested:</b> {numberFormatter(tooltipData.totalAmount)} USD
                    </Typography>
                </TooltipWithBounds>
            )}
        </div>
    );
}

export default InvestedEntitiesBubbleChart;