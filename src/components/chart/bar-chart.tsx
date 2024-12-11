import * as d3 from "d3";

const BarChart = async () => {
  const dataOutput = await d3.csv("./data/Mobiles_Dataset.csv");
  console.log(dataOutput);
  return <div>BarChart</div>;
};

export default BarChart;
