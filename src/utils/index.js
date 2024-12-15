const countUniqueStorage = (data) => {
  const uniqueValues = new Set(data.map((d) => d.Storage));
  return uniqueValues.size;
};

const domain02DataConvert = (data) => {
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

  const domain02Data = {
    storage: storageData.map((value) =>
      value === null ? "null" : value.toString()
    ),
    display: Array.from(displayData).map(String),
    prices: prices,
  };

  return domain02Data;
};

const domain03DataConvert = (data) => {
  const ramData = [...new Set(data.map((d) => d.RAM))].sort(
    (a, b) => (b ?? 0) - (a ?? 0)
  );

  const displayData = [
    ...new Set(
      data.map((d) => d.DisplaySize).filter((value) => value !== null)
    ),
  ].sort();

  const stars = ramData.map((ram) => {
    return displayData.map((display) => {
      const filteredData = data.filter(
        (d) => d.RAM === ram && d.DisplaySize === display
      );
      const averageStar =
        filteredData.reduce((acc, curr) => acc + (curr.Stars ?? 0), 0) /
        filteredData.length;

      return isNaN(averageStar) ? 0 : averageStar;
    });
  });

  const domain03Data = {
    ram: ramData.map((value) => (value === null ? "null" : value.toString())),
    display: Array.from(displayData).map(String),
    stars: stars,
  };

  return domain03Data;
};

export { countUniqueStorage, domain02DataConvert, domain03DataConvert };
