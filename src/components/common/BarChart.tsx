import type { AssetData } from "../../types/api";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useEffect, useRef, useState } from "react";
import type { BarGroupChartDataType } from "../../types/common";
import { isEmpty } from "../../utils/fn";
import { ACCOUNT_KEY, CHART_COLORS } from "../../utils/constants";

interface Props {
  data: AssetData | null;
  width?: number;
  height?: number;
  verticalMargin?: number;
}

const margin = { top: 20, right: 30, bottom: 40, left: 50 };

export const BarChart = ({
  data,
  width = 400,
  height = 400,
  verticalMargin = 120,
}: Props) => {
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<BarGroupChartDataType>();
  const [chartData, setChartData] = useState<BarGroupChartDataType[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && !isEmpty(data)) {
      setChartData(data.monthTotal);
    }
  }, [data]);

  const colorScale = scaleOrdinal<string, string>({
    domain: [...ACCOUNT_KEY],
    range: CHART_COLORS,
  });

  const x0Scale = scaleBand<string>({
    domain: chartData.map((d) => d.date),
    padding: 0.2,
  });

  const x1Scale = scaleBand<string>({
    domain: [...ACCOUNT_KEY],
    padding: 0.1,
  });

  const yScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...chartData.flatMap((d) => ACCOUNT_KEY.map((k) => d[k]))),
    ] as [number, number],
    nice: true,
  });

  x0Scale.range([margin.left, width - margin.right]);
  x1Scale.range([0, x0Scale.bandwidth()]);
  yScale.range([height - margin.bottom, margin.top]);

  return (
    <div className="relative">
      <svg width={width} height={height} ref={svgRef}>
        <Group top={verticalMargin / 2}>
          <BarGroup
            data={chartData}
            keys={[...ACCOUNT_KEY]}
            height={height - margin.top - margin.bottom}
            x0={(d) => d.date}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            color={(key) => colorScale(key)}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => {
                return (
                  <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                    {barGroup.bars.map((bar) => (
                      <>
                        <rect
                          key={`bar-group-bar-${barGroup.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          width={bar.width}
                          height={bar.height}
                          fill={bar.color}
                          onMouseMove={(event) => {
                            const coords = localPoint(event);

                            if (!coords) return;
                            showTooltip({
                              tooltipData: chartData[barGroup.index],
                              tooltipLeft: coords.x,
                              tooltipTop: coords.y,
                            });
                          }}
                          onMouseLeave={() => hideTooltip()}
                        />
                        <Text
                          //   y={bar.height}
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {chartData[barGroup.index].date}
                        </Text>
                      </>
                    ))}
                  </Group>
                );
              })
            }
          </BarGroup>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <div className=" text-black z-30">{`${tooltipData.date}`}</div>
          <div className=" text-black z-30">{`입출금: ${tooltipData.deposit}`}</div>
          <div className=" text-black z-30">{`증권: ${tooltipData.investment}`}</div>
          <div className=" text-black z-30">{`대출: ${tooltipData.loan}`}</div>
          <div className=" text-black z-30">{`저축: ${tooltipData.saving}`}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};
