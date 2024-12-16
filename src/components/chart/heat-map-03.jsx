"use client";

import { domain03DataConvert } from "@/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import legend from "../legend";

const HeatMap03 = ({
  data,
  width,
  rowHeight,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const data03 = domain03DataConvert(data);
  const height = marginTop + marginBottom + rowHeight * data03.ram.length;

  const gx = useRef(null);
  const gy = useRef(null);
  const bar = useRef(null);

  const color = d3.scaleThreshold()
    .domain([3.6, 3.8, 4.0, 4.2, 4.4, 4.6]) // Ngưỡng chia khoảng từ 3.6 đến 4.6
    .range(d3.schemeRdBu[6]);

  const f = d3.format(".2f");

  const format = (d) =>
    isNaN(d)
      ? "N/A Star"
      : d === 0
      ? "0 Star"
      : d < 1
      ? "<1 Stars"
      : d < 1.5
      ? "1 Rupee"
      : `${f(d)} Stars`;

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
      void d3.select(gx.current).call(d3.axisBottom(x).tickSize(width / 120)),
    [gx, x, width]
  );

  useEffect(
    () => void d3.select(gy.current).call(d3.axisLeft(y).tickSize(height / 40)),
    [gy, y, height]
  );

  return (
    <>
      {legend({ color, title: "Average Stars" })}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-full h-auto"
      >
        {data03.stars.map((d, i) => (
          <g ref={bar} key={i} transform={`translate(0,${y(data03.ram[i])})`}>
            {d.map((v, j) => {
              if (j < d.length - 1) {
                return (
                  <rect
                    key={j}
                    x={x(data03.display[j]) + 1}
                    width={x(data03.display[j + 1]) - x(data03.display[j]) - 1}
                    height={y.bandwidth()}
                    fill={isNaN(v) ? "#eee" : v === 0 ? "#fff" : color(v)}
                  >
                    <title>{`Average Stars: ${format(v)}`}</title>
                  </rect>
                );
              } else if (j === d.length - 1) {
                return (
                  <rect
                    key={j}
                    x={x(data03.display[j]) + 1}
                    width={
                      x(data03.display[j]) +
                      width / (data03.display.length - 1) -
                      marginRight * 2
                    }
                    height={y.bandwidth()}
                    fill={isNaN(v) ? "#eee" : v === 0 ? "#fff" : color(v)}
                  >
                    <title>{`Average Stars: ${format(v)}`}</title>
                  </rect>
                );
              }
            })}
          </g>
        ))}
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
      </svg>
    </>
  );
};

export default HeatMap03;
