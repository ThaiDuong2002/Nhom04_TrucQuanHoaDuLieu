"use client";

import { domain04DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import legend from "../legend"; // Nếu bạn dùng phần legend

const ScatterPlot04 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Gọi hàm domain04DataConvert để chuyển đổi dữ liệu
    const scatterPlotData = domain04DataConvert(data);

    // In ra console các giá trị đã đọc
    console.log("Scatter Plot Data:", scatterPlotData);

    // Thiết lập D3 chart
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Xóa nội dung cũ trong SVG

    const containerWidth = svgRef.current.parentElement.offsetWidth;
    const width = containerWidth - 100;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterPlotData.x)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(scatterPlotData.y)])
      .range([height - margin.bottom, margin.top]);

    // Trục X
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .text("Total ratings")
      .call(d3.axisBottom(xScale));

    // Trục Y
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .text("Average stars")
      .call(d3.axisLeft(yScale));

    // Các điểm scatter plot
    svg
      .selectAll("circle")
      .data(scatterPlotData.labels)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(scatterPlotData.x[i]))
      .attr("cy", (d, i) => yScale(scatterPlotData.y[i]))
      .attr("r", 8)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2);

    // Nhãn của từng điểm
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

  return (
    <div>
      <svg ref={svgRef} width={800} height={500}></svg>
    </div>
  );
};

export default ScatterPlot04;
