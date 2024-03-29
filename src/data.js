// CONSTANTS
export const GETTING_STARTED = 1; // $ per pool location serviced
export const SCALING_UP = 2; // $ per pool location serviced
export const OWN_THE_MARKET = 3; // $ per pool location serviced

export const HOURS_SAVED_WITH_SKIMMER = 5;
export const GS_NUMBER_OF_POOLS = 1; // # of pools cleaned per hour for GETTING STARTED plan
export const SU_NUMBER_OF_POOLS = 2; // # of pools cleaned per hour for SCALING UP plan

export const CONTACT_US_URL =
  "https://skimmer-inc.webflow.io/utility/contact-us";

// FORMULAS
export const getIncrementalPoolsAddedBecauseOfTimeSavings = (
  numberOfTechs,
  planSelected
) => {
  return Number(
    numberOfTechs *
      HOURS_SAVED_WITH_SKIMMER *
      (planSelected === GETTING_STARTED
        ? GS_NUMBER_OF_POOLS
        : SU_NUMBER_OF_POOLS)
  );
};
export const getAvgMonthlyRevenue = (avgNumberOfPools, avgInvoiceMonth) => {
  return Number(avgNumberOfPools * avgInvoiceMonth);
};
export const getCostOfSkimmer = (planSelected, avgNumberOfPools) => {
  return Number(planSelected * avgNumberOfPools);
};
export const getCostAsAPercentageOfRevenue = (
  costOfSkimmer,
  avgMonthlyRevenue
) => {
  return Number(Number(costOfSkimmer / avgMonthlyRevenue) * 100).toFixed(2);
};
export const getMonthlyRevenueWithSkimmer = (
  avgNumberOfPools,
  incrementalPoolsAddedBecauseOfTimeSavings,
  avgInvoiceMonth
) => {
  return (
    (Number(avgNumberOfPools) +
      Number(incrementalPoolsAddedBecauseOfTimeSavings)) *
    avgInvoiceMonth
  );
};
export const getIncrementalMonthlyRevenue = (
  monthlyRevenueWithSkimmer,
  avgMonthlyRevenue
) => {
  return Number(monthlyRevenueWithSkimmer) - Number(avgMonthlyRevenue);
};
export const getReturnOnInvestment = (
  incrementalMonthlyRevenue,
  costOfSkimmer
) => {
  return Number(incrementalMonthlyRevenue / costOfSkimmer).toPrecision(2);
};

// USE ALL THE FORMULAS AND RETURNS THE RESULT
export const makeCalculations = (
  planSelected,
  avgNumberOfPools,
  numberOfTechs,
  numberOffficeStaff,
  avgInvoiceMonth
) => {
  const incrementalPoolsAddedBecauseOfTimeSavings =
    getIncrementalPoolsAddedBecauseOfTimeSavings(numberOfTechs);
  const avgMonthlyRevenue = getAvgMonthlyRevenue(
    avgNumberOfPools,
    avgInvoiceMonth
  );
  const costOfSkimmer = getCostOfSkimmer(planSelected, avgNumberOfPools);
  const costAsAPercentageOfRevenue = getCostAsAPercentageOfRevenue(
    costOfSkimmer,
    avgMonthlyRevenue
  );
  const monthlyRevenueWithSkimmer = getMonthlyRevenueWithSkimmer(
    avgNumberOfPools,
    incrementalPoolsAddedBecauseOfTimeSavings,
    avgInvoiceMonth
  );
  const incrementalMonthlyRevenue = getIncrementalMonthlyRevenue(
    monthlyRevenueWithSkimmer,
    avgMonthlyRevenue
  );
  const returnOnInvestment = getReturnOnInvestment(
    incrementalMonthlyRevenue,
    costOfSkimmer
  );

  return {
    incrementalMonthlyRevenue,
    incrementalPoolsAddedBecauseOfTimeSavings,
    avgMonthlyRevenue,
    costOfSkimmer,
    costAsAPercentageOfRevenue,
    monthlyRevenueWithSkimmer,
    returnOnInvestment,
  };
};

// DEFAULT VALUES
export const defaultValues = {
  inputs: {
    avgNumberOfPools: 1000,
    numberOfTechs: 10,
    numberOffficeStaff: 2,
    avgInvoiceMonth: 240,
  },
  results: {
    incrementalMonthlyRevenue: 24000,
    incrementalPoolsAddedBecauseOfTimeSavings: 100,
    avgMonthlyRevenue: 240000,
    costOfSkimmer: 1000,
    costAsAPercentageOfRevenue: 0.42,
    monthlyRevenueWithSkimmer: 264000,
    returnOnInvestment: 24,
  },
};
