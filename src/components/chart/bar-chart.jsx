"use client";

import { domain01DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const BarChart = ({
  data,
  width,
  height,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const gx = useRef(null);
  const gy = useRef(null);
  const bar = useRef(null);

  const f = d3.format(",d");

  const format = (d) => (isNaN(d) ? "N/A" : `${f(d)}`);

  const bins = d3
    .bin()
    .thresholds(40)
    .value((d) => d)(
    data.map((d) => d.Discounted).filter((value) => value !== null)
  );

  const x = d3
    .scaleLinear()
    .domain([bins[0].x0 ?? 0, bins[bins.length - 1].x1 ?? 0])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length) ?? 0])
    .range([height - marginBottom, marginTop]);

  useEffect(
    () =>
      void d3.select(gx.current).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      ),
    [gx, x, width]
  );

  useEffect(
    () =>
      void d3
        .select(gy.current)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select(".domain").remove()),
    [gy, y, height]
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="max-w-full h-auto"
    >
      <g ref={bar} fill="steelblue">
        {bins.map((d, i) => (
          <rect
            key={i}
            x={x(d.x0) + 1}
            width={x(d.x1) - x(d.x0) - 1}
            y={y(d.length)}
            height={y(0) - y(d.length)}
          >
            <title>{`Count of Discounted: ${format(d.length)}`}</title>
          </rect>
        ))}
      </g>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`}>
        <text x="50%" y={marginBottom} fill="currentColor" textAnchor="end">
          Discounted (%) →
        </text>
      </g>
      <g ref={gy} transform={`translate(${marginLeft},0)`}>
        <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">
          Frequency (no. of Discounted) ↑
        </text>
      </g>
    </svg>
  );
};

export default BarChart;
