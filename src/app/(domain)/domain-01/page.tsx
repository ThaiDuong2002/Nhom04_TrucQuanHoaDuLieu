import { BarChart } from "@/components/chart";
import { datasetUrl } from "@/constants";
import { DatasetInterface } from "@/interface";
import * as d3 from "d3";

const Domain01 = async () => {
  const data = await d3.csv<DatasetInterface>(
    datasetUrl,
    (data: d3.DSVRowString<string>): DatasetInterface | null => {
      if (!data) return null;

      // console.log(data);

      return {
        ProductName: data["Product Name"] || null,
        Brand: data.Brand || null,
        ActualPrice: Number(data["Actual price"]) || 0,
        DiscountPrice: Number(data["Discount price"]) || 0,
        Discounted: Number(data.Discounted) || 0,
        Stars: Number(data.Stars) || 0,
        Rating: Number(data.Rating) || 0,
        Reviews: Number(data.Reviews) || 0,
        RAM: Number(data["RAM (GB)"]) || 0,
        Storage: Number(data["Storage (GB)"]) || 0,
        DisplaySize: Number(data["Display Size (inch)"]) || 0,
        Camera: data.Camera || null,
        Description: data.Description || null,
        Link: data.Link || null,
      };
    }
  );

  return (
    <div>
      <h1>Domain 1</h1>
      <BarChart
        data={data}
        width={1000}
        height={400}
        marginTop={20}
        marginRight={0}
        marginBottom={30}
        marginLeft={40}
      />
    </div>
  );
};

export default Domain01;
