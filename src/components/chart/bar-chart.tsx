"use client";

import { DatasetInterface } from "@/interface";
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
}: {
  data: d3.DSVParsedArray<DatasetInterface>;
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);
  const bar = useRef(null);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.DiscountPrice!.toString()))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.Discounted) ?? 0])
    .nice()
    .range([height - marginBottom, marginTop]);

  useEffect(
    () =>
      void d3
        .select(gx.current as SVGSVGElement)
        .call(d3.axisBottom(x).tickSizeOuter(0)),
    [gx, x]
  );
  useEffect(
    () =>
      void d3
        .select(gy.current as SVGSVGElement)
        .call(
          d3
            .axisLeft(y)
            .tickFormat((value) => ((value as number) * 100).toFixed())
        )
        .call((g) => g.select(".domain").remove()),
    [gy, y]
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`max-w-[${width}px] h-auto overflow-visible font-sans`}
    >
      <g ref={bar} fill="steelblue">
        {data.map((d) => (
          <rect
            key={d.Link}
            style={{
              mixBlendMode: "multiply",
            }}
            x={x(d.ActualPrice!.toString())}
            y={y(d.Discounted!)}
            width={x.bandwidth()}
            height={y(0) - y(d.Discounted!)}
          ></rect>
        ))}
      </g>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
    </svg>
  );
};

export default BarChart;
