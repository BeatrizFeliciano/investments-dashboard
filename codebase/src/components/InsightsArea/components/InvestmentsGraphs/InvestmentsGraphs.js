import { getEntityInvestmentsList, getInvestmentAmount, getInvestmentDate, getInvestmentEntityName, getInvestmentRound } from "../../../../utils/getters";
import { useEffect, useMemo, useState } from "react";
import InvestmentRoundsBarChart from "./components/InvestmentRoundsBarChart";
import InvestedEntitiesBubbleChart from "./components/InvestedEntitiesBubbleChart";
import "../../InsightsArea.css";

function InvestmentsGraphs({selectedEntity}) {

    const investmentsList = useMemo(() => 
        getEntityInvestmentsList(selectedEntity)
            .sort((investment1, investment2) => 
                getInvestmentDate(investment1) - getInvestmentDate(investment2)
    ), [selectedEntity]);
    
    const [investmentRounds, setInvestmentRounds] = useState({});
    const [investedEntities, setInvestedEntities] = useState({});

    const [highlightRound, setHighlightRound] = useState();
    const [highlightEntity, setHighlightEntity] = useState();

    const [highlightedInvestmentRounds, setHighlightedInvestmentRounds] = useState({});


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
    }, [investmentsList]);

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
        <div className="investments-graphs">
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