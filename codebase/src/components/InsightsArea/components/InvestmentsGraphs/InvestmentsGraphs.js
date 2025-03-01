import { getEntityInvestmentsList, getInvestmentAmount, getInvestmentEntityName, getInvestmentRound } from "../../../../utils/getters";
import { useEffect, useMemo, useState } from "react";
import "../../InsightsArea.css";
import InvestmentRoundsBarChart from "./components/InvestmentRoundsBarChart";
import InvestedEntitiesBubbleChart from "./components/InvestedEntitiesBubbleChart";

function InvestmentsGraphs({selectedEntity}) {

    const investmentsList = useMemo(() => getEntityInvestmentsList(selectedEntity), [selectedEntity]);
    const [investmentRounds, setInvestmentRounds] = useState({});
    const [investedEntities, setInvestedEntities] = useState({});

    const [highlightRound, setHighlightRound] = useState();
    const [highlightEntity, setHighlightEntity] = useState();

    const [highlightedInvestmentRounds, setHighlightedInvestmentRounds] = useState({});

    console.log(highlightedInvestmentRounds);



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

    useEffect(() => {
        setHighlightedInvestmentRounds({});

        investmentsList.forEach((investment) => {
            setHighlightedInvestmentRounds((highlightedInvestmentRounds) => {
                const currentInvestment = highlightedInvestmentRounds[getInvestmentRound(investment)];
                const currentEntity = getInvestmentEntityName(investment);
    
                if (currentEntity === highlightEntity) {
                    if (currentInvestment)
                        return ({
                            ...highlightedInvestmentRounds,
                            [getInvestmentRound(investment)]: {
                                totalAmount: currentInvestment.totalAmount + getInvestmentAmount(investment),
                            }
                        });
    
                    return ({
                        ...highlightedInvestmentRounds,
                        [getInvestmentRound(investment)]: {
                            totalAmount: getInvestmentAmount(investment),
                        }
                    });
                }
    
                return highlightedInvestmentRounds;
    
            })
        });

    }, [highlightedInvestmentRounds]);

    return (
        <div style={{ display:"flex", flexDirection:"row", gap:20 }}>
            <InvestmentRoundsBarChart 
                investmentRounds={investmentRounds} 
                highlightEntity={highlightEntity}
                highlightedInvestmentRounds={highlightedInvestmentRounds}
            />
            <InvestedEntitiesBubbleChart investedEntities={investedEntities} setHighlightEntity={setHighlightEntity}/>
        </div>
    );
}

export default InvestmentsGraphs;