import { BarChart } from "@/components/chart";
import { datasetUrl } from "@/constants";
import * as d3 from "d3";

const Domain01 = async () => {
  const data = await d3.csv(datasetUrl, (data) => {
    if (!data) return null;

    return {
      ProductName: data["Product Name"] || null,
      Brand: data.Brand || null,
      ActualPrice: Number(data["Actual price"]) || null,
      DiscountPrice: Number(data["Discount price"]) || null,
      Discounted: Number(data.Discounted) || null,
      Stars: Number(data.Stars) || null,
      Rating: Number(data.Rating) || null,
      Reviews: Number(data.Reviews) || null,
      RAM: Number(data["RAM (GB)"]) || null,
      Storage: Number(data["Storage (GB)"]) || null,
      DisplaySize: Number(data["Display Size (inch)"]) || null,
      Camera: data.Camera || null,
      Description: data.Description || null,
      Link: data.Link || null,
    };
  });

  const width = 960;
  const height = 500;
  const marginTop = 50;
  const marginRight = 20;
  const marginBottom = 50;
  const marginLeft = 40;

  return (
    <div>
      <BarChart
        data={data}
        width={width}
        height={height}
        marginTop={marginTop}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
      />
    </div>
  );
};

export default Domain01;
