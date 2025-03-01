import { ParentSize } from "@visx/responsive";
import { getEntityInvestmentsList, getInvestmentAmount, getInvestmentEntityName, getInvestmentRound } from "../../../../utils/getters";
import { numberFormatter } from "../../../../utils/formatters";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { Bar, Circle } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { blueColor } from "../../../../constants";
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';
import * as d3 from 'd3';
import "../../InsightsArea.css";
import InvestmentRoundsBarChart from "./components/InvestmentRounds";

function InvestmentsGraphs({selectedEntity}) {

    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();
    const investmentsList = useMemo(() => getEntityInvestmentsList(selectedEntity), [selectedEntity]);
    const investmentRounds = {};
    const investedEntities = {};

    const marginBottom = 40;
    const marginTop = 10;
    const marginLeft = 50;

    investmentsList.forEach((investment) => {
        const currentInvestment = investmentRounds[getInvestmentRound(investment)];
        const currentEntity = investedEntities[getInvestmentEntityName(investment)];

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

        if (currentEntity) {
            investedEntities[getInvestmentEntityName(investment)] = {
                totalAmount: currentEntity.totalAmount + getInvestmentAmount(investment),
                investments: [...currentEntity.investments, investment],
            };
        }
        else {
            investedEntities[getInvestmentEntityName(investment)] = {
                totalAmount: getInvestmentAmount(investment),
                investments: [investment],
            };
        }
    });

    const maxAmount = 
        Math.max(...Object.keys(investmentRounds).map(
            (investmentKey) => investmentRounds[investmentKey].totalAmount)); 

    return (
        <div style={{ display:"flex", flexDirection:"row", gap:20 }}>
            <InvestmentRoundsBarChart selectedEntity={selectedEntity}/>
                <ParentSize style={{width: "50%", height: 500}}>
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

export default InvestmentsGraphs;