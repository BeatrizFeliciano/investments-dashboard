import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { blueColor } from "../../../../../constants";
import { useTooltip } from '@visx/tooltip';
import * as d3 from 'd3';
import "../../../InsightsArea.css";

function InvestedEntitiesBubbleChart({investedEntities}) {

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
                        />
                        ))}
                    </Group>
                    </svg>
                );
                }}
            </ParentSize>
        </div>
    );
}

export default InvestedEntitiesBubbleChart;