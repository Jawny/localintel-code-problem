import React, { useState, useEffect } from "react";
import axios from "axios";

// ChartJs Imports
import { Bar } from "react-chartjs-2";

const Chart = () => {
  const [chartData, setChartData] = useState({});

  const data = () => {
    axios
      .all([
        axios.get(
          "https://lisampledata.blob.core.windows.net/sample/q1-2020.json"
        ), // q1 2020 data
        axios.get(
          "https://lisampledata.blob.core.windows.net/sample/q4-2019.json"
        ), // q4 2019 data
      ])
      .then(
        axios.spread((q12020, q42019) => {
          // Data organized into arrays and array of objects
          let q42019Data = q42019.data.map((item) =>
            parseFloat(item["Q4 2019"].replace(/,/g, ""))
          );
          let q12020Data = q12020.data.map((item) =>
            parseFloat(item["Q1 2020"].replace(/,/g, ""))
          );
          let provinces = q12020.data.map((item) => item.Geography);
          let populationGrowth = findPopulationGrowth(q12020Data, q42019Data);
          let sortedPopulationGrowthWithProvinces = sortPopulationGrowthAndCombineProvinces(
            provinces,
            populationGrowth
          );
          setChartData({
            datasets: [
              {
                label: "Population Growth",
                data: sortedPopulationGrowthWithProvinces
                  .map((item) => item.population)
                  .splice(sortedPopulationGrowthWithProvinces.length - 3),
                borderWidth: 1,
                backgroundColor: ["#ACECD5", "#FFF9AA", "#FFD5B8"],
                borderColor: "#777",
                hoverBorderWidth: 3,
                hoverBorderColor: "#000",
              },
            ],
            labels: sortedPopulationGrowthWithProvinces
              .map((item) => item.province)
              .splice(sortedPopulationGrowthWithProvinces.length - 3),
          });
        })
      );
  };
  // Takes in two arrays and finds the population growth.
  // newYear - oldYear = population growth
  const findPopulationGrowth = (newYear, oldYear) => {
    let result = [];
    for (let i = 0; i < newYear.length; i++) {
      result.push(newYear[i] - oldYear[i]);
    }
    return result;
  };

  // Takes all provinces and population growth and combines them, and returns an array of
  // objects with a province and the population growth arr = [{province: " ", population: 0}, ...]
  const sortPopulationGrowthAndCombineProvinces = (
    provinces,
    populationGrowth
  ) => {
    let hashmap = {};
    let result = [];
    for (let i = 0; i < provinces.length; i++) {
      hashmap[provinces[i]] = populationGrowth[i];
    }
    for (let key in hashmap) {
      result.push({ province: key, population: hashmap[key] });
    }

    let sortedResult = result.sort((a, b) => {
      return a.population > b.population
        ? 1
        : b.population > a.population
        ? -1
        : 0;
    });
    return sortedResult;
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="chart">
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Top Three Provinces With The Largest Population Growth",
            fontSize: 25,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Population Growth",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Provinces",
                },
              },
            ],
          },
        }}
      ></Bar>
    </div>
  );
};

export default Chart;
