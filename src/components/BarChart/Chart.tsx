import React, { useEffect } from 'react';
import styled from 'styled-components';
import Column from './Column';
import { ChartProps , BarChartDataType } from '@/types';
import Heading from '@/components/Basic/Typography/Heading';

interface XLabelProps {
	xLabelSpacing?: string;
	left: number;
}
interface YLabelProps {
	yLabelSpacing?: string;
	top: number;
}
/**
 *
 * @param {BarChartDataType[]} data
 * @param {number} rowCount - number of rows , (default = 5)
 * @param {CSSObject} [labelStyle] - style objects apply to labels
 * @param {string} [fontSize] - size of font
 * @param {number} [rowCount] - (!important) if type of yLabel is string, must set value of this
 * @param {string} [yLabelUnit] - unit of y-label
 *
 */
const Chart = ({
	data,
	labelStyle,
	yLabelSpacing,
	xLabelSpacing,
	fontSize,
	rowCount = 5,
	grouped,
	yLabelUnit = '%',
	color,
}: ChartProps) => {
	const dataMax = getMaxData(data)
	const yLab = generateYlabelValue(dataMax , rowCount);

	return (
		<Container>
			{data.map((item, idx) => {
				if (grouped) {
					return (
						<Column
							key={'barchart-column' + idx + item}
							rows={rowCount}
							percent={item.value}
							grouped={grouped}
							color={color}
							dataMax={dataMax}
						/>
					);
				} else {
					return (
						<Column
							key={'barchart-column' + idx + item}
							rows={rowCount}
							percent={((item.value as number) / dataMax) * 100}
							grouped={grouped}
							color={color}
							dataMax={dataMax}
						/>
					);
				}
			})}

			{yLab?.map((item: number, idx: number) => {
				return (
				<Ylabel key={'barchart-y-axis ' + item} top={idx * (1 / rowCount) * 100} yLabelSpacing={yLabelSpacing}>
					<Heading variant="H9" style={{ ...labelStyle, fontSize: fontSize }}>
						{item}
						{yLabelUnit}
					</Heading>
				</Ylabel>
			)})}
			{
				data.map(({label}, idx) => {
						return (
							<Xlabel
								key={'barchart-x-axis ' + label + idx}
								left={idx * (1 / data.length) * 100 + (0.5 / data.length) * 100}
								xLabelSpacing={xLabelSpacing}
							>
								<Heading variant="H9" style={{ ...labelStyle, fontSize: fontSize }}>
									{label}
								</Heading>
							</Xlabel>
						);
				})
			}
		</Container>
	);
};

export default Chart;

const Container = styled.div`
	border: 1px solid var(--color-white-300);
	border-right: none;
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
	margin-bottom: 30px;
`;
const Ylabel = styled.span<YLabelProps>`
	position: absolute;
	right: ${({ yLabelSpacing }) => (yLabelSpacing ? `calc(100% + ${yLabelSpacing})` : `calc(100% + 1rem)`)};
	${({ top }) => ({ top: top < 100 ? `calc(${top}% - 6px)` : `calc(100% - 10px)` })};
`;
const Xlabel = styled.div<XLabelProps>`
	position: absolute;
	top: calc(100% + 6px);
	width: 30px;
	text-align: center;
	left: ${({ xLabelSpacing, left }) =>
		xLabelSpacing ? `calc(${left}% - ${xLabelSpacing})` : `calc(${left}% - 15px)`};
`;


const getMaxData = (data : BarChartDataType[]) => {
	let dataMax = 0;
	if (data[0].value instanceof Array) {
		const tmp = [];

		for (const d of data) {
			const t = d.value as Array<number>;
			tmp.push(...t);
		}
		dataMax = Math.ceil(Math.max(...tmp));
	} else {
		const valueList : number[] = [] 
		for(const d of data){
			valueList.push(d.value as number)
		}
		dataMax = Math.ceil(Math.max(...valueList));
	}
	return dataMax
}

const generateYlabelValue = (dataMax : number , rowCount : number) => {
	let yLab = null;
	let digit = 1
	let highestMaxDigit = null;
	while(dataMax % digit !== dataMax){
		digit *=10;
	}
	highestMaxDigit = digit / 10;
	while(highestMaxDigit !== digit){
		if(Math.floor(dataMax / highestMaxDigit) === 0){
			break;
		}
		highestMaxDigit = highestMaxDigit + (digit / 10)
	}
	dataMax = highestMaxDigit;		
		
	const amountPerBox = Number(highestMaxDigit / rowCount);
	yLab = [highestMaxDigit];



	for (let i = 0; i < rowCount - 1; i++) {
		yLab.push(yLab[yLab.length - 1] - amountPerBox);
	}
	yLab.push(0);
	return yLab;
}