const countUniqueStorage = (data) => {
  const uniqueValues = new Set(data.map((d) => d.Storage));
  return uniqueValues.size;
};

const domain01DataConvert = (data, max) => {
  const result = [];

  for (let i = 0; i <= max; i++) {
    const frequency = data.filter((item) => item.Discounted === i).length;

    result.push({ frequency, discounted: i });
  }

  return result;
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

const domain04DataConvert = (data) => {
  // Lấy danh sách các brand duy nhất
  const brands = [...new Set(data.map((d) => d.Brand))];

  // Tính tổng rating và trung bình Stars cho từng brand
  const brandStats = brands.map((brand) => {
    const filteredData = data.filter((d) => d.Brand === brand);

    // Tính tổng số rating và trung bình Stars
    const totalRating = filteredData.reduce(
      (acc, curr) => acc + (curr.Rating ?? 0),
      0
    );

    const averageStars =
      filteredData.reduce((acc, curr) => acc + (curr.Stars ?? 0), 0) /
      filteredData.length;

    return {
      brand: brand,
      totalRating: totalRating,
      averageStars: isNaN(averageStars) ? 0 : averageStars,
    };
  });

  // Dữ liệu trả về để vẽ scatter plot
  const domain04Data = {
    x: brandStats.map((b) => b.totalRating), // Tổng rating (trục X)
    y: brandStats.map((b) => b.averageStars), // Trung bình Stars (trục Y)
    labels: brandStats.map((b) => b.brand), // Tên brand
  };

  return domain04Data;
};

export {
  countUniqueStorage,
  domain01DataConvert,
  domain02DataConvert,
  domain03DataConvert,
  domain04DataConvert,
};
