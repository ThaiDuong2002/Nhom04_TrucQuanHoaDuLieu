"use client";

import { BarChart } from "@/components/chart";
import { datasetUrl } from "@/constants";
import { DatasetInterface } from "@/interface";
import * as d3 from "d3";

const Domain01 = () => {
  d3.csv<DatasetInterface>(
    datasetUrl,
    (data: d3.DSVRowString<string>): DatasetInterface | null => {
      if (!data) return null;
      console.log(data);

      return {
        ProductName: data["Product Name"],
        Brand: data.Brand,
        ActualPrice: Number(data["Actual Price"]),
        DiscountPrice: Number(data["Discount Price"]),
        Discounted: Number(data.Discounted),
        Stars: Number(data.Stars),
        Rating: Number(data.Rating),
        Reviews: Number(data.Reviews),
        RAM: Number(data.RAM),
        Storage: Number(data.Storage),
        DisplaySize: Number(data["Display Size"]),
        Camera: data.Camera,
        Description: data.Description,
        Link: data.Link,
      };
    }
  ).then((data: DatasetInterface[]) => {
    
  });
  return (
    <div>
      <h1>Domain 1</h1>
      {/* <BarChart /> */}
    </div>
  );
};

export default Domain01;
