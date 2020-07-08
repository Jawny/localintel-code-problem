import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
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
          setTableData(sortedPopulationGrowthWithProvinces);
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
    <div className="table">
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Province</th>
            <th>Population Growth</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.province}>
              <td>{item.province}</td>
              <td>{item.population}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default DataTable;
