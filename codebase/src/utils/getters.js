// getters for the entity
const getEntityID = (entity) => entity._id;
const getEntityName = (entity) => entity.name;
const getEntityType = (entity) => entity.type;
const getEntityHqCountry = (entity) => entity.hqCountry;
const getTotalInvested = (entity) => entity.totalInvested;
const getNumInvestments = (entity) => entity.numInvestments;
const getInvestmentsList = (entity) => entity.investments;
const getSolutionSegments = (entity) => entity.solutionSegments;
const getMarketSegments = (entity) => entity.marketSegments;

// getters for the investments
const getInvestmentEntityID = (investment) => investment.entity;
const getInvestmentEntityName = (investment) => investment.entityName;
const getInvestmentDate = (investment) => investment.date;
const getInvestmentRound = (investment) => investment.round;
const getInvestmentAmount = (investment) => investment.roundSizeUsd; // will only consider USD

// getters for the solution segments
const getSolutionSegmentName = (solutionSegment) => solutionSegment.name;
const getSolutionSegmentID = (solutionSegment) => solutionSegment._id;

// getters for the market segments
const getMarketSegmentName = (marketSegment) => marketSegment.name;
const getMarketSegmentID = (marketSegment) => marketSegment._id;