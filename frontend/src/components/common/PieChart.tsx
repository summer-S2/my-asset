import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import type { History } from "../../types/api";
import { CHART_COLORS } from "../../utils/constants";
import { useEffect, useState } from "react";
import type { ChartDataType } from "../../types/common";
import { formatKoreanCurrency } from "../../utils/fn";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { useAssetChartData } from "../../hooks/useAssetChartData";

interface Props {
  data: History[];
  width?: number;
  height?: number;
}

export const PieChart = ({ data, width = 400, height = 400 }: Props) => {
  const { pieData } = useAssetChartData(data);
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<ChartDataType>();
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius - 60;
  const [total, setTotal] = useState(0);

  //   console.log(data);
  // console.log(pieData);

  useEffect(() => {
    setTotal(0);
    if (pieData.length > 0) {
      pieData.map((el) => {
        setTotal((prev) => prev + el.value);
      });
    }
  }, [pieData]);

  return (
    <div className="relative">
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-indigo-800">
        {total ? `총 자산: ${total.toLocaleString()}원` : ""}
      </div>
      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={pieData}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={innerRadius}
            padAngle={0.02} // ?
          >
            {(pie) =>
              pie.arcs.map((arc, i) => {
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const arcData = arc.data;

                return (
                  <g
                    key={`arc-${arcData.label}`}
                    onMouseMove={(event) => {
                      const coords = localPoint(event);
                      if (!coords) return;
                      showTooltip({
                        tooltipData: arcData,
                        tooltipLeft: coords.x,
                        tooltipTop: coords.y,
                      });
                    }}
                    onMouseLeave={() => hideTooltip()}
                  >
                    <path
                      d={pie.path(arc) ?? ""}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                    />
                    <>
                      <Text
                        x={centroidX}
                        y={centroidY - 10}
                        dy=".33em"
                        fontSize={12}
                        textAnchor="middle"
                        fill="white"
                      >
                        {`${arcData.label}`}
                      </Text>
                      <Text
                        x={centroidX}
                        y={centroidY + 10}
                        dy=".33em"
                        fontSize={12}
                        textAnchor="middle"
                        fill="white"
                      >
                        {`${((arcData.value / total) * 100).toFixed()}%`}
                      </Text>
                    </>
                  </g>
                );
              })
            }
          </Pie>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <div className=" text-black z-30">{`${formatKoreanCurrency(
            tooltipData.value
          )}`}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};
