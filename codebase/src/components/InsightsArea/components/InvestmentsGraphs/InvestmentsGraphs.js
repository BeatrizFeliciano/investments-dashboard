import { getEntityInvestmentsList, getInvestmentAmount, getInvestmentEntityName, getInvestmentRound } from "../../../../utils/getters";
import { useEffect, useMemo, useState } from "react";
import { useTooltip } from '@visx/tooltip';
import "../../InsightsArea.css";
import InvestmentRoundsBarChart from "./components/InvestmentRoundsBarChart";
import InvestedEntitiesBubbleChart from "./components/InvestedEntitiesBubbleChart";

function InvestmentsGraphs({selectedEntity}) {

    const investmentsList = useMemo(() => getEntityInvestmentsList(selectedEntity), [selectedEntity]);
    const [investmentRounds, setInvestmentRounds] = useState({});
    const [investedEntities, setInvestedEntities] = useState({});

    useEffect(() => {
        setInvestedEntities({});
        setInvestmentRounds({});

        investmentsList.forEach((investment) => {
   
            setInvestmentRounds((investmentRounds) => {
                const currentInvestment = investmentRounds[getInvestmentRound(investment)];
    
                if (currentInvestment) 
                    return ({
                        ...investmentRounds,
                        [getInvestmentRound(investment)]: {
                            totalAmount: currentInvestment.totalAmount + getInvestmentAmount(investment),
                            investments: [...currentInvestment.investments, investment]
                        }
                    });
    
                return ({
                    ...investmentRounds,
                    [getInvestmentRound(investment)]: {
                        totalAmount: getInvestmentAmount(investment),
                        investments: [investment]
                    }
                });
            });

            setInvestedEntities((investedEntities) => {
                const currentEntity = investedEntities[getInvestmentEntityName(investment)];
    
                if (currentEntity) 
                    return ({
                        ...investedEntities,
                        [getInvestmentEntityName(investment)]: {
                            totalAmount: currentEntity.totalAmount + getInvestmentAmount(investment),
                            investments: [...currentEntity.investments, investment]
                        }
                    });
    
                return ({
                    ...investedEntities,
                    [getInvestmentEntityName(investment)]: {
                        totalAmount: getInvestmentAmount(investment),
                        investments: [investment]
                    }
                });
            });
        });
    }, investmentsList);

    return (
        <div style={{ display:"flex", flexDirection:"row", gap:20 }}>
            <InvestmentRoundsBarChart investmentRounds={investmentRounds}/>
             <InvestedEntitiesBubbleChart investedEntities={investedEntities}/>
        </div>
    );
}

export default InvestmentsGraphs;