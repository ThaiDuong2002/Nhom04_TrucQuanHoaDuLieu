"use client";

import { domain01DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const BarChart = ({
  data,
  width,
  height,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const svgRef = useRef(null);
  const selectRef = useRef(null);

  const [selected, setSelected] = useState(0);

  const x = d3.scaleBand();
  const y = d3.scaleLinear();

  const max = d3.max(data, (d) => d.Discounted);
  const data01 = domain01DataConvert(data, max);

  const f = d3.format(",d");

  const format = (d) => (isNaN(d) ? "N/A" : `${f(d)}`);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const select = d3.select(selectRef.current);

    let newSortedData;

    if (selected === 0) {
      newSortedData = data01.sort((a, b) => a.discounted - b.discounted);
    } else if (selected === 1) {
      newSortedData = data01.sort((a, b) => b.frequency - a.frequency);
    } else {
      newSortedData = data01.sort((a, b) => a.frequency - b.frequency);
    }

    x.domain(newSortedData.map((d) => d.discounted))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    y.domain([0, d3.max(newSortedData, (d) => d.frequency)])
      .nice()
      .range([height - marginBottom, marginTop]);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);

    const t = svg.transition().duration(750);

    const bar = svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(newSortedData)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", (d) => x(d.discounted))
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => y(0) - y(d.frequency))
      .attr("width", x.bandwidth())
      .append("title")
      .text(
        (d, i) => `Count of ${d.discounted}% Discounted: ${format(d.frequency)}`
      );

    const gx = svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call((g) =>
        g
          .append("text")
          .attr("x", "50%")
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Discounted (%) →")
      );

    const gy = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => y.toFixed()))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Frequency (no. of Discounted) ↑")
      );

    bar
      .transition(t)
      .delay((d, i) => i * 20)
      .attr("x", (d) => x(d.letter));

    gx.transition(t)
      .call(xAxis)
      .selectAll(".tick")
      .delay((d, i) => i * 20);

    select.on("change", () => {
      setSelected(parseInt(select.node().value));
    });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data01]);

  return (
    <>
      <select ref={selectRef} style={{ marginBottom: "1rem" }}>
        <option value={0}>Discounted</option>
        <option value={1}>Descending</option>
        <option value={2}>Ascending</option>
      </select>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          maxWidth: "100%",
          height: "auto",
          font: "10px sans-serif",
          overflow: "visible",
          marginTop: "1rem",
        }}
      ></svg>
    </>
  );
};

export default BarChart;
