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
    }
  );

  return (
    <div>
      <BarChart
        data={data}
        width={960}
        height={500}
        marginTop={50}
        marginRight={20}
        marginBottom={50}
        marginLeft={40}
      />
    </div>
  );
};

export default Domain01;
