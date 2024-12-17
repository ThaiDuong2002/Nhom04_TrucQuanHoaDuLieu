"use client";

import { domain04DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const ScatterPlot04 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const scatterPlotData = domain04DataConvert(data);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Xóa nội dung cũ

    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterPlotData.x)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterPlotData.y)])
      .range([height - margin.bottom, margin.top]);

    // Vẽ trục X
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Chú thích trục X
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 2 + 10)
      .attr("text-anchor", "middle")
      .text("Total Ratings") // Nội dung chú thích trục X
      .attr("font-size", "14px")
      .attr("fill", "black");

    // Vẽ trục Y
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Chú thích trục Y
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left / 2 - 10)
      .attr("transform", "rotate(-90)") // Xoay văn bản để hiển thị theo trục Y
      .attr("text-anchor", "middle")
      .text("Average Stars") // Nội dung chú thích trục Y
      .attr("font-size", "14px")
      .attr("fill", "black");

    // Vẽ các node scatter plot
    svg
      .selectAll("circle")
      .data(scatterPlotData.labels)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(scatterPlotData.x[i]))
      .attr("cy", (d, i) => yScale(scatterPlotData.y[i]))
      .attr("r", 8) // Kích thước node
      .attr("fill", "none") // Node rỗng (không có nền)
      .attr("stroke", "orange") // Viền màu cam
      .attr("stroke-width", 2); // Độ dày viền

    // Thêm nhãn cho các điểm
    svg
      .selectAll("text.label")
      .data(scatterPlotData.labels)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => xScale(scatterPlotData.x[i]) + 10)
      .attr("y", (d, i) => yScale(scatterPlotData.y[i]) - 10)
      .text((d) => d)
      .attr("font-size", "12px")
      .attr("fill", "black");
  }, [data]);

  return <svg ref={svgRef} width={1200} height={500}></svg>;
};

export default ScatterPlot04;
