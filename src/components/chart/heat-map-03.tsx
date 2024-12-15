"use client";

import { DatasetInterface } from "@/interface";
import { domain03DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const HeatMap03 = ({
  data,
  width,
  rowHeight,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: {
  data: d3.DSVParsedArray<DatasetInterface>;
  width: number;
  rowHeight: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}) => {
  const data03 = domain03DataConvert(data);
  const height = marginTop + marginBottom + rowHeight * data03.ram.length;

  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);
  const bar = useRef<SVGSVGElement>(null);

  const color = d3.scaleSequentialSqrt(
    [0, d3.max(data03.prices, (d) => d3.max(d)) ?? 0],
    d3.interpolatePuRd
  );

  const f = d3.format(",d");

  const format = (d: number) =>
    isNaN(d)
      ? "N/A Rupees"
      : d === 0
      ? "0 Rupees"
      : d < 1
      ? "<1 Rupees"
      : d < 1.5
      ? "1 Rupee"
      : `${f(d)} Rupees`;

  const x = d3
    .scaleBand()
    .domain(data03.display)
    .rangeRound([marginLeft, width - marginRight]);

  const y = d3
    .scaleBand()
    .domain(data03.ram)
    .rangeRound([marginTop, height - marginBottom]);

  useEffect(
    () =>
      void d3
        .select(gx.current as SVGSVGElement)
        .call(d3.axisBottom(x).tickSize(width / 120)),
    [gx, x, width]
  );

  useEffect(
    () =>
      void d3
        .select(gy.current as SVGSVGElement)
        .call(d3.axisLeft(y).tickSize(height / 40)),
    [gy, y, height]
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="max-w-full h-auto"
    >
      {data03.prices.map((d, i) => (
        <g ref={bar} key={i} transform={`translate(0,${y(data03.ram[i])})`}>
          {d.map((v, j) => {
            if (j < d.length - 1) {
              return (
                <rect
                  key={j}
                  x={x(data03.display[j])! + 1}
                  width={x(data03.display[j + 1])! - x(data03.display[j])! - 1}
                  height={y.bandwidth()}
                  fill={isNaN(v) ? "#eee" : v === 0 ? "#fff" : color(v)}
                >
                  <title>{`Actual Value: ${format(v)}`}</title>
                </rect>
              );
            } else if (j === d.length - 1) {
              return (
                <rect
                  key={j}
                  x={x(data03.display[j])! + 1}
                  width={
                    x(data03.display[j])! +
                    width / (data03.display.length - 1) -
                    marginRight * 2
                  }
                  height={y.bandwidth()}
                  fill={isNaN(v) ? "#eee" : v === 0 ? "#fff" : color(v)}
                >
                  <title>{`Actual Value: ${format(v)}`}</title>
                </rect>
              );
            }
          })}
        </g>
      ))}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
    </svg>
  );
};

export default HeatMap03;
