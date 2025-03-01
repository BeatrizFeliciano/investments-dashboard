import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { blueColor } from "../../../../../constants";
import * as d3 from 'd3';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import { numberFormatter } from "../../../../../utils/formatters";
import "../../../InsightsArea.css";

function InvestedEntitiesBubbleChart({investedEntities, setHighlightEntity}) {

    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();

    return (
        <div style={{ width:"50%", height: "100%" }}>
            <ParentSize style={{width: "100%", height: 500}}>
                {({ width, height }) => {
                const radiusScale = d3.scaleSqrt()
                .domain([
                    Math.min(...Object.keys(investedEntities).map(key => investedEntities[key].totalAmount)), 
                    Math.max(...Object.keys(investedEntities).map(key => investedEntities[key].totalAmount)),
                ])
                .range([10, width/6]); // Min and Max bubble radius
            
                // Create the nodes with radius
                const initialNodes = Object.keys(investedEntities).map(key => ({
                ...investedEntities[key],
                name: key,
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
                        <Circle
                            key={i}
                            cx={d.x}
                            cy={d.y}
                            r={d.radius}
                            fill={blueColor}
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
                    <div>
                        <strong>{tooltipData.name}</strong>
                        <div>{numberFormatter(tooltipData.totalAmount)} USD</div>
                    </div>
                </TooltipWithBounds>
            )}
        </div>
    );
}

export default InvestedEntitiesBubbleChart;