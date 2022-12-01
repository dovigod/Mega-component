import React, { useEffect } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import Heading from 'components/Basic/Typography/Heading';
const mockData = [46, 32, 8, 14, 28];
const mockXLabel = ['10', '20~29', '30~39', '40~49', '50~69', '65+'];
const mockYLabel = '%';

/**
 *
 * @param {ChartData} data - default For De
 * @param {number} rowCount - number of rows , (default = 5)
 * @param {[...string]} xLabel - x-axis Label
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
	data = mockData,
	xLabel = mockXLabel,
	yLabel = mockYLabel,
	rows = 5,
	grouped,
	color,
	legendTag,
	showLegend
}) => {
	return (
		<Container>
			<Chart data={data} xLabel={xLabel} yLabelUnit={yLabel} rowCount={5} grouped={grouped} color={color} />
			{showLegend ? (
				<LegendContainer>
					<Legend>
						<ColorMark color={grouped ? color[0] : color} />
						<Heading variant="SBH7">{grouped ? legendTag[0] : legendTag}</Heading>
					</Legend>
					{grouped ? (
						<Legend>
							<ColorMark color={color[1]} />
							<Heading variant="SBH7">{legendTag[1]}</Heading>
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

const ColorMark = styled.div`
	padding: 4px 10px;
	border-radius: 20px;
	background-color: ${({ color }) => color};
	margin-right: 10px;
`;
