import React, { useEffect, useState } from "react";
import axios from "axios";
import EVBarChart from "./components/BarChart";
import { AnalysisTab } from "./components/AnalysisTab";

const MainContent = () => {
  const [evByCity, setEvByCity] = useState([]);
  const [evByCounty, setEvByCounty] = useState([]);
  const [evByState, setEvByState] = useState([]);
  const [evGrowthTrend, setEvGrowthTrend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cityResult = await axios.get(
        "http://localhost:5000/api/ev-by-city"
      );
      const countyResult = await axios.get(
        "http://localhost:5000/api/ev-by-county"
      );
      const stateResult = await axios.get(
        "http://localhost:5000/api/ev-by-state"
      );
      const growthTrendResult = await axios.get(
        "http://localhost:5000/api/ev-growth-trend"
      );

      setEvByCity(cityResult.data);
      setEvByCounty(countyResult.data);
      setEvByState(stateResult.data);
      setEvGrowthTrend(growthTrendResult.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="py-3 py-lg-4">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="page-title mb-0">Dashboard</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <EVBarChart
                data={evByCity}
                title="EVs by City"
                dataKey="EV Count"
                xAxisKey="City"
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <EVBarChart
                data={evByCounty}
                title="EVs by County"
                dataKey="EV Count"
                xAxisKey="County"
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <EVBarChart
                data={evByState}
                title="EVs by State"
                dataKey="EV Count"
                xAxisKey="State"
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <EVBarChart
                data={evGrowthTrend}
                title="EV Growth Trend by Model Year"
                dataKey="EV Count"
                xAxisKey="Model Year"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
