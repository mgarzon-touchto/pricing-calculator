import React, { useEffect, useState } from "react";
import classNames from "classnames";

import {
  defaultValues,
  makeCalculations,
  GETTING_STARTED,
  SCALING_UP,
  OWN_THE_MARKET,
  CONTACT_US_URL,
} from "./data";

const PricingCalculator = () => {
  const [inputData, setInputData] = useState({
    avgNumberOfPools: defaultValues.inputs.avgNumberOfPools,
    numberOfTechs: defaultValues.inputs.numberOfTechs,
    numberOffficeStaff: defaultValues.inputs.numberOffficeStaff,
    avgInvoiceMonth: defaultValues.inputs.avgInvoiceMonth,
  });
  const [results, setResults] = useState(defaultValues.results);
  const [planSelected, setPlanSelected] = useState(GETTING_STARTED);

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const results = makeCalculations(
      planSelected,
      inputData.avgNumberOfPools,
      inputData.numberOfTechs,
      inputData.numberOffficeStaff,
      inputData.avgInvoiceMonth
    );
    setResults(results);
  }, [inputData, planSelected])

  return (
    <div className="w-full min-h-screen overflow-y-auto p-4 gap-4 md:p-10 md:gap-8 lg:p-28 lg:gap-16 flex flex-col justify-center items-center bg-skimmer-light-100">
      {/* Heading */}
      <h1 className="text-4xl text-skimmer-text-dark font-display font-bold text-center">
        Calculate how much more revenue your firm can earn
      </h1>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-10">
        {/* Left Container: INPUTS */}
        <div className="w-full py-4 sm:py-8 flex flex-col gap-8">
          <div className="w-full flex flex-col md:flex-row gap-2.5">
            <div className="basis-1/2 flex flex-col gap-2">
              <label
                className="font-body font-medium text-skimmer-text-dark"
                htmlFor="avg_pools_serviced"
              >
                Avg Number of Pools Serviced/mo
              </label>
              <input
                className="bg-white py-2.5 px-3 rounded-md border border-gray-300 shadow-sm"
                id="avg_pools_serviced"
                min={0}
                name="avgNumberOfPools"
                onChange={handleChange}
                type="number"
                value={inputData.avgNumberOfPools}
              />
            </div>
            <div className="basis-1/2 flex flex-col gap-2">
              <label
                className="font-body font-medium text-skimmer-text-dark"
                htmlFor="number_of_techs"
              >
                # of Techs
              </label>
              <input
                className="bg-white py-2.5 px-3 rounded-md border border-gray-300 shadow-sm"
                id="number_of_techs"
                min={0}
                name="numberOfTechs"
                onChange={handleChange}
                type="number"
                value={inputData.numberOfTechs}
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-2.5">
            <div className="basis-1/2 flex flex-col gap-2">
              <label
                className="font-body font-medium text-skimmer-text-dark"
                htmlFor="number_office_staff"
              >
                # of Office Staff
              </label>
              <input
                className="bg-white py-2.5 px-3 rounded-md border border-gray-300 shadow-sm"
                id="number_office_staff"
                min={0}
                name="numberOffficeStaff"
                onChange={handleChange}
                type="number"
                value={inputData.numberOffficeStaff}
              />
            </div>
            <div className="basis-1/2 flex flex-col gap-2">
              <label
                className="font-body font-medium text-skimmer-text-dark"
                htmlFor="avg_invoice_month"
              >
                Avg Invoice/Month
              </label>
              <div className="flex flex-row gap-1 items-center bg-white py-2.5 px-3 rounded-md border border-gray-300 shadow-sm">
                <span>$</span>
                <input
                  className="w-full"
                  id="avg_invoice_month"
                  min={0}
                  name="avgInvoiceMonth"
                  onChange={handleChange}
                  type="number"
                  value={inputData.avgInvoiceMonth}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-2.5 items-center justify-center lg:justify-start">
            <button
              className={classNames(
                "w-full sm:w-auto py-2.5 px-6 rounded-md font-display text-skimmer-text-light hover:bg-skimmer-light-700",
                planSelected === GETTING_STARTED
                  ? "bg-skimmer-light-600 ring-4 ring-skimmer-light-200"
                  : "bg-skimmer-light-600/50"
              )}
              onClick={() => setPlanSelected(GETTING_STARTED)}
            >
              Getting Started
            </button>
            <button
              className={classNames(
                "w-full sm:w-auto py-2.5 px-6 rounded-md font-display text-skimmer-text-light hover:bg-orchid-700",
                planSelected === SCALING_UP
                  ? "bg-orchid-600 ring-4 ring-skimmer-light-200"
                  : "bg-orchid-600/50"
              )}
              onClick={() => setPlanSelected(SCALING_UP)}
            >
              Scaling Up
            </button>
            <button
              className={classNames(
                "w-full sm:w-auto py-2.5 px-6 rounded-md font-display text-skimmer-text-light hover:bg-navy-700",
                planSelected === OWN_THE_MARKET
                  ? "bg-navy-600 ring-4 ring-skimmer-light-200"
                  : "bg-navy-600/50"
              )}
              onClick={() => setPlanSelected(OWN_THE_MARKET)}
            >
              Own the Market
            </button>
          </div>
        </div>

        {/* Right Container: RESULTS */}
        <div className="bg-white w-full py-4 sm:py-8 px-2 sm:px-6 shadow-md rounded-2xl flex flex-col items-center gap-5">
          <h6 className="text-center font-display font-bold text-xl">
            Estimated monthly revenue increase*
          </h6>

          {planSelected === OWN_THE_MARKET ? (
            <a href={CONTACT_US_URL} target="_blank" className="my-0.5">
              <button className="py-2.5 px-6 rounded-md font-display text-secondary bg-primary hover:bg-primary/75">
                Contact Us
              </button>
            </a>
          ) : (
            <p className="text-center font-display font-extrabold text-5xl text-skimmer-light-600">
              {`$${(results?.incrementalMonthlyRevenue || 0).toLocaleString(
                "en-US"
              )}`}
            </p>
          )}

          <div className="w-full flex flex-col gap-4">
            {/* Incremental Pools Added Because of Time Savings */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Incremental Pools Added Because of Time Savings
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : results?.incrementalPoolsAddedBecauseOfTimeSavings}
              </p>
            </div>

            {/* Avg Monthly Revenue */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Avg Monthly Revenue
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : `$${(results?.avgMonthlyRevenue || 0).toLocaleString(
                      "en-US"
                    )}`}
              </p>
            </div>

            {/* Cost of Skimmer */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Cost of Skimmer
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : `$${(results?.costOfSkimmer || 0).toLocaleString("en-US")}`}
              </p>
            </div>

            {/* Cost as a % of Revenue */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Cost as a % of Revenue
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : `${results?.costAsAPercentageOfRevenue}%`}
              </p>
            </div>

            {/* Monthly Revenue with Skimmer */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Monthly Revenue with Skimmer
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : `$${(
                      results?.monthlyRevenueWithSkimmer || 0
                    ).toLocaleString("en-US")}`}
              </p>
            </div>

            {/* Return on Investment */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-full flex flex-row items-center gap-2">
                <p className="font-body text-skimmer-text-dark sm:text-lg">
                  Return on Investment
                </p>
              </div>
              <p className="font-body font-semibold text-skimmer-light-600 text-lg">
                {planSelected === OWN_THE_MARKET
                  ? "-"
                  : `${results?.returnOnInvestment}x`}
              </p>
            </div>
          </div>

          <p className="text-center font-body text-skimmer-text-medium font-normal text-base">
            *Hours Saved with Skimmer/Week/Tech
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
