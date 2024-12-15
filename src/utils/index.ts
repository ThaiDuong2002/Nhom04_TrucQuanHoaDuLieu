import { DatasetInterface, Domain02Interface, Domain03Interface } from "@/interface";
import * as d3 from "d3";

const countUniqueStorage = (data: d3.DSVParsedArray<DatasetInterface>) => {
  const uniqueValues = new Set(data.map((d) => d.Storage));
  return uniqueValues.size;
};

const domain02DataConvert = (data: d3.DSVParsedArray<DatasetInterface>) => {
  const storageData = [...new Set(data.map((d) => d.Storage))].sort(
    (a, b) => (b ?? 0) - (a ?? 0)
  );

  const displayData = [
    ...new Set(
      data.map((d) => d.DisplaySize).filter((value) => value !== null)
    ),
  ].sort();

  const prices = storageData.map((storage) => {
    return displayData.map((display) => {
      const filteredData = data.filter(
        (d) => d.Storage === storage && d.DisplaySize === display
      );
      const averageActualPrice =
        filteredData.reduce((acc, curr) => acc + (curr.ActualPrice ?? 0), 0) /
        filteredData.length;

      return isNaN(averageActualPrice) ? 0 : averageActualPrice;
    });
  });

  const domain02Data: Domain02Interface = {
    storage: storageData.map((value) =>
      value === null ? "null" : value.toString()
    ),
    display: Array.from(displayData).map(String),
    prices: prices,
  };

  return domain02Data;
};

const domain03DataConvert = (data: d3.DSVParsedArray<DatasetInterface>) => {
  const ramData = [...new Set(data.map((d) => d.RAM))].sort(
    (a, b) => (b ?? 0) - (a ?? 0)
  );

  const displayData = [
    ...new Set(
      data.map((d) => d.DisplaySize).filter((value) => value !== null)
    ),
  ].sort();

  const prices = ramData.map((ram) => {
    return displayData.map((display) => {
      const filteredData = data.filter(
        (d) => d.RAM === ram && d.DisplaySize === display
      );
      const averageActualPrice =
        filteredData.reduce((acc, curr) => acc + (curr.ActualPrice ?? 0), 0) /
        filteredData.length;

      return isNaN(averageActualPrice) ? 0 : averageActualPrice;
    });
  });

  const domain03Data: Domain03Interface = {
    ram: ramData.map((value) =>
      value === null ? "null" : value.toString()
    ),
    display: Array.from(displayData).map(String),
    prices: prices,
  };

  return domain03Data;
};

export { countUniqueStorage, domain02DataConvert, domain03DataConvert };
