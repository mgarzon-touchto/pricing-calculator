import React from "react";
import { createRoot } from 'react-dom/client';
import "./app.css"

import PricingCalculator from "./PricingCalculator";

const container = document.getElementById('react-target');
const root = createRoot(container);
root.render(<PricingCalculator />);