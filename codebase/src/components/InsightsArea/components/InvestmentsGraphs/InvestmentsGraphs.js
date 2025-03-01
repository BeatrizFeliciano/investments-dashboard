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
    const [highlightedInvestedEntities, setHighlightedInvestedEntities] = useState({});

    console.log(investedEntities);
    console.log(highlightRound);

    // highlightRound: string with name of the round
    // investedEntities: {} -> map() {name: {investments:[], totalAmount: N}}



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
                            rounds: currentEntity.rounds.add(getInvestmentRound(investment))
                        }
                    });
    
                return ({
                    ...investedEntities,
                    [getInvestmentEntityName(investment)]: {
                        totalAmount: getInvestmentAmount(investment),
                        rounds: new Set([getInvestmentRound(investment)])
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

    }, [investmentsList, highlightEntity]);



    return (
        <div style={{ display:"flex", flexDirection:"row", gap:20 }}>
            <InvestmentRoundsBarChart 
                investmentRounds={investmentRounds} 
                highlightEntity={highlightEntity}
                highlightedInvestmentRounds={highlightedInvestmentRounds}
                setHighlightRound={setHighlightRound}
            />
            <InvestedEntitiesBubbleChart 
                investedEntities={investedEntities} 
                setHighlightEntity={setHighlightEntity}
                highlightRound={highlightRound}
            />
        </div>
    );
}

export default InvestmentsGraphs;