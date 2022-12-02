import React, { useEffect } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import Heading from '@/components/Basic/Typography/Heading';
import { BarChartProps } from '@/types';
const mockYLabel = '%';

/**
 *
 * @param {ChartData} data - default For De
 * @param {number} rowCount - number of rows , (default = 5)
 * @param { string | [...number]} yLabel - y-axis Label unit
 * @param {CSSObject} [labelStyle] - style objects apply to labels
 * @param {string} [fontSize] - size of font
 * @param {number} [rowCount] - (!important) if type of yLabel is string, must set value of this
 * @param {string} [yLabelUnit] - unit of y-label
 * @param {boolean} grouped - to use grouped bar chart, set it true
 * @param {string | [string,string]} - color - set color of bar chart,  while using grouped bar chart, must pass tuple data
 * @param {string | [string , string]} [legend] - if set, shows legend
 *
 */

const BarChart = ({
	data,
	yLabelUnit = mockYLabel,
	rowCount,
	grouped,
	color,
	legendTag,
	showLegend,
}: BarChartProps) => {
	return (
		<Container>
			<Chart
				data={data}
				yLabelUnit={yLabelUnit}
				rowCount={rowCount}
				grouped={grouped}
				color={color}
			/>
			{showLegend ? (
				<LegendContainer>
					<Legend>
						<ColorMark
							color={
								grouped && color instanceof Array
									? color[0]
									: color instanceof Array
									? undefined
									: color
							}
						/>
						<Heading variant="SBH7">
							{grouped && legendTag instanceof Array ? legendTag[0] : legendTag}
						</Heading>
					</Legend>
					{grouped ? (
						<Legend>
							<ColorMark color={color[1]} />
							<Heading variant="SBH7">{legendTag instanceof Array ? legendTag[1] : null}</Heading>
						</Legend>
					) : (
						<></>
					)}
				</LegendContainer>
			) : (
				<></>
			)}
		</Container>
	);
};

export default BarChart;

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const LegendContainer = styled.div`
	display: flex;
`;
const Legend = styled.div`
	display: flex;
	align-items: center;
	margin-right: 21px;
`;

const ColorMark = styled.div<{ color: string | undefined }>`
	padding: 4px 10px;
	border-radius: 20px;
	background-color: ${({ color }) => color};
	margin-right: 10px;
`;
