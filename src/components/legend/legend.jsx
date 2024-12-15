"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Legend = (
  color,
  {
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues,
  } = {}
) => {
  const axisRef = useRef(null);
  const ramp = (color, n = 256) => {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  };

  let tickAdjust = (g) =>
    g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  useEffect(() => {
    if (typeof window !== "undefined") {
      d3.select(axisRef.current)
        .call(
          d3
            .axisBottom(x)
            .ticks(
              ticks,
              typeof tickFormat === "string" ? tickFormat : undefined
            )
            .tickFormat(
              typeof tickFormat === "function" ? tickFormat : undefined
            )
            .tickSize(tickSize)
            .tickValues(tickValues)
        )
        .call(tickAdjust)
        .call((g) => g.select(".domain").remove());
    }
  }, [axisRef, x, tickAdjust, ticks, tickFormat, tickValues]);
  console.log(color.interpolate);
  console.log(color.interpolator);
  console.log(color.invertExtent);
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);
    x = color
      .copy()
      .rangeRound(
        d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
      );

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          overflow: "visible",
          display: "block",
        }}
      >
        <g ref={axisRef} transform={`translate(0,${height - marginBottom})`}>
          <text
            x={marginLeft}
            y={marginTop + marginBottom - height - 6}
            fill="currentColor"
            textAnchor="start"
            fontWeight="bold"
            className="title"
          >
            {title}
          </text>
        </g>
        <image
          x={marginLeft}
          y={marginTop}
          width={width - marginLeft - marginRight}
          height={height - marginTop - marginBottom}
          preserveAspectRatio="none"
          xlinkHref={ramp(
            color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
          ).toDataURL()}
        ></image>
      </svg>
    );
  } else if (color.interpolator) {
    x = Object.assign(
      color
        .copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {
        range() {
          return [marginLeft, width - marginRight];
        },
      }
    );

    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3
          .range(n)
          .map((i) => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          overflow: "visible",
          display: "block",
        }}
      >
        <g ref={axisRef} transform={`translate(0,${height - marginBottom})`}>
          <text
            x={marginLeft}
            y={marginTop + marginBottom - height - 6}
            fill="currentColor"
            textAnchor="start"
            fontWeight="bold"
            className="title"
          >
            {title}
          </text>
        </g>
        <image
          x={marginLeft}
          y={marginTop}
          width={width - marginLeft - marginRight}
          height={height - marginTop - marginBottom}
          preserveAspectRatio="none"
          xlinkHref={ramp(color.interpolator()).toDataURL()}
        ></image>
      </svg>
    );
  } else if (color.invertExtent) {
    const thresholds = color.thresholds
      ? color.thresholds() // scaleQuantize
      : color.quantiles
      ? color.quantiles() // scaleQuantile
      : color.domain(); // scaleThreshold

    const thresholdFormat =
      tickFormat === undefined
        ? (d) => d
        : typeof tickFormat === "string"
        ? d3.format(tickFormat)
        : tickFormat;

    x = d3
      .scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    tickValues = d3.range(thresholds.length);
    tickFormat = (i) => thresholdFormat(thresholds[i], i);

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          overflow: "visible",
          display: "block",
        }}
      >
        <g ref={axisRef} transform={`translate(0,${height - marginBottom})`}>
          <text
            x={marginLeft}
            y={marginTop + marginBottom - height - 6}
            fill="currentColor"
            textAnchor="start"
            fontWeight="bold"
            className="title"
          >
            {title}
          </text>
        </g>
        <g>
          {color.range().map((color, i) => (
            <rect
              key={i}
              x={x(i - 1)}
              y={marginTop}
              width={x(i) - x(i - 1)}
              height={height - marginTop - marginBottom}
              fill={color}
            />
          ))}
        </g>
      </svg>
    );
  } else {
    x = d3
      .scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    tickAdjust = () => {};

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          overflow: "visible",
          display: "block",
        }}
      >
        <g ref={axisRef} transform={`translate(0,${height - marginBottom})`}>
          <text
            x={marginLeft}
            y={marginTop + marginBottom - height - 6}
            fill="currentColor"
            textAnchor="start"
            fontWeight="bold"
            className="title"
          >
            {title}
          </text>
        </g>
        <g>
          {color.domain().map((domainValue, index) => (
            <rect
              key={index}
              x={x(domainValue)}
              y={marginTop}
              width={Math.max(0, x.bandwidth() - 1)}
              height={height - marginTop - marginBottom}
              fill={color(domainValue)}
            />
          ))}
        </g>
      </svg>
    );
  }
};

const legend = ({ color, ...options }) => {
  return Legend(color, options);
};

export default legend;

export { Legend };
