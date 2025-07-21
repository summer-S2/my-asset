import type { History } from "../../types/api";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import type { BarGroupChartDataType } from "../../types/common";
import { CHART_COLORS, ACCOUNT_TYPE_MAP } from "../../utils/constants";
import { useAssetChartData } from "../../hooks/utils/useAssetChartData";

import { Fragment } from "react/jsx-runtime";
import { formatKoreanCurrency } from "../../utils/fn";

const accountTypeKeys = Object.keys(ACCOUNT_TYPE_MAP).map(Number);

interface Props {
  data: History[] | null;
  width?: number;
  height?: number;
}

const margin = { top: 0, right: 0, bottom: 10, left: 0 };

export const BarChart = ({ data, width = 400, height = 400 }: Props) => {
  const { chartData } = useAssetChartData({
    historyData: data,
    accountData: null,
  });
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<BarGroupChartDataType>();

  const colorScale = scaleOrdinal<number, string>({
    domain: [...accountTypeKeys],
    range: CHART_COLORS,
  });

  const x0Scale = scaleBand<string>({
    domain: chartData.map((d) => d.date),
    padding: 0.2,
  });

  const x1Scale = scaleBand<number>({
    domain: [...accountTypeKeys],
    padding: 0.1,
  });

  const yScale = scaleLinear<number>({
    domain: [
      0,
      Math.max(...chartData.flatMap((d) => accountTypeKeys.map((k) => d[k]))),
    ] as [number, number],
    nice: true,
  });

  x0Scale.range([margin.left, width - margin.right]);
  x1Scale.range([0, x0Scale.bandwidth()]);
  yScale.range([height - margin.bottom, margin.top]);

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group>
          <BarGroup
            data={chartData}
            keys={[...accountTypeKeys]}
            height={height - margin.top - margin.bottom}
            x0={(d) => d.date}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            color={(key) => colorScale(key)}
          >
            {(barGroups) =>
              barGroups.map((barGroup, index) => {
                return (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.bars[index]}-${index}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <Fragment
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.key}`}
                      >
                        <rect
                          x={bar.x}
                          y={bar.y}
                          width={bar.width}
                          height={bar.height < 0 ? 0 : bar.height}
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
                      </Fragment>
                    ))}
                    <Text
                      y={height}
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {chartData[barGroup.index].date}
                    </Text>
                  </Group>
                );
              })
            }
          </BarGroup>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          <div className={`z-30`}>{`${tooltipData.date}`}</div>
          {accountTypeKeys.map((el) => (
            <div
              key={el}
              style={{
                color: colorScale(el),
              }}
            >
              {`${ACCOUNT_TYPE_MAP[el]}: ${formatKoreanCurrency(
                tooltipData[el]
              )}`}
            </div>
          ))}
        </TooltipWithBounds>
      )}
    </div>
  );
};
