// getters for the entity
export const getEntityID = (entity) => entity._id;
export const getEntityName = (entity) => entity.name;
export const getEntityType = (entity) => entity.type;
export const getEntityHqCountry = (entity) => entity.hqCountry;
export const getTotalInvested = (entity) => entity.totalInvested;
export const getNumInvestments = (entity) => entity.numInvestments;
export const getInvestmentsList = (entity) => entity.investments;
export const getSolutionSegments = (entity) => entity.solutionSegments;
export const getMarketSegments = (entity) => entity.marketSegments;

// getters for the investments
export const getInvestmentEntityID = (investment) => investment.entity;
export const getInvestmentEntityName = (investment) => investment.entityName;
export const getInvestmentDate = (investment) => investment.date;
export const getInvestmentRound = (investment) => investment.round;
export const getInvestmentAmount = (investment) => investment.roundSizeUsd; // will only consider USD

// getters for the solution segments
export const getSolutionSegmentName = (solutionSegment) => solutionSegment.name;
export const getSolutionSegmentID = (solutionSegment) => solutionSegment._id;

// getters for the market segments
export const getMarketSegmentName = (marketSegment) => marketSegment.name;
export const getMarketSegmentID = (marketSegment) => marketSegment._id;