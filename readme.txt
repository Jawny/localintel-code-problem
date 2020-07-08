How To Run Application
1. launch terminal and cd to localintel-coding-problem
2. run npm install
3. run npm start

How I Built It
The libraries I used to build this application are the following: reactJs, Material-UI, ChartJs, Bootstrap, and axios.
I fetched the data using axios, which I then mapped through to separate the provinces and population into their own
arrays. I then used helper functions such as findPopulationGrowth and sortPopulationGrowthAndCombineProvinces.

findPopulationGrowth: This function is used to calculate the population growth of a province from Q4 2019 to Q1 2020.
This is done by subtracting the population in Q1 2020 by the population in Q4 2019. I then push these values in a new array
and return the result.

sortPopulationGrowthAndCombineProvinces: This function is used to sort the population growth values of each province from smallest
to largest and to create an array of objects, each object having the province's name and it's corresponding population growth value.
My thought process for this function was that I needed a way to sort the growth values and maintain the connection with the province name.
This function accomplishes this by first adding all population growth values to a hashmap with the corresponding province as the key.
Next, create an array of objects with the data stored in the hashmap. Finally sort the array with a custom comparator that sorts the population
growth values while maintaing their relationship with the correct province.

To create the bar chart the data from sortPopulationGrowthAndCombineProvinces is spliced to only show the last 3 values in the array (the largest 3),
and is organized to fit ChartJs's syntax.

As for the data table, the data from sortPopulationGrowthAndCombineProvinces is mapped over and organized into rows of data
on the front-end using built-in tags and is styled by Bootstrap.

The toggle button is simply a toggle switch that changes the state when it's clicked which either shows the Table component
or the Chart component depending on whether the state is set to true or false.

