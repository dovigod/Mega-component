import React, { useEffect } from 'react';
import styled from 'styled-components';
import Column from './Column';
import { ChartProps } from '@/types';
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
 * @param {ChartData} data - default For De
 * @param {number} rowCount - number of rows , (default = 5)
 * @param {[...string]} xLabel - x-axis Label
 * @param { string | [...number]} yLabel - y-axis Label unit
 * @param {CSSObject} [labelStyle] - style objects apply to labels
 * @param {string} [fontSize] - size of font
 * @param {number} [rowCount] - (!important) if type of yLabel is string, must set value of this
 * @param {string} [yLabelUnit] - unit of y-label
 *
 */
const Chart = ({
	data,
	xLabel,
	yLabel,
	labelStyle,
	yLabelSpacing,
	xLabelSpacing,
	fontSize,
	rowCount = 5,
	grouped,
	yLabelUnit = '%',
	color
}: ChartProps) => {
	let dataMax = 0;
	if (data[0] instanceof Array) {
		const tmp = [];

		for (const d of data) {
			const t = d as Array<number>;
			tmp.push(...t);
		}
		dataMax = Math.ceil(Math.max(...tmp));
	} else {
		const t = data as Array<number>;
		dataMax = Math.ceil(Math.max(...t));
	}
	const amountPerBox = dataMax / rowCount;

	let yLab: any = yLabel;
	if (yLab instanceof Array) {
		yLab.sort((a, b) => 0 - (a > b ? 1 : -1));
	}

	if (typeof yLab === 'undefined') {
		yLab = [dataMax];

		for (let i = 0; i < data.length - 1; i++) {
			yLab.push(Math.ceil(yLab[yLab.length - 1] - amountPerBox));
		}
		yLab.push(0);
	}

	// logics ..ing for classificating datas..
	//

	return (
		<Container>
			{data.map((item, idx) => {
				if (grouped) {
					return (
						<Column
							key={'barchart-column' + idx}
							rows={rowCount}
							percent={item}
							grouped={grouped}
							color={color}
							dataMax={dataMax}
						/>
					);
				} else {
					return (
						<Column
							key={'barchart-column' + idx}
							rows={rowCount}
							percent={((item as number) / dataMax) * 100}
							grouped={grouped}
							color={color}
							dataMax={dataMax}
						/>
					);
				}
			})}

			{yLab?.map((item: string, idx: number) => (
				<Ylabel key={'barchart-y-axis ' + item} top={idx * (1 / rowCount) * 100} yLabelSpacing={yLabelSpacing}>
					<Heading variant="H9" style={{ ...labelStyle, fontSize: fontSize }}>
						{item}
						{yLabelUnit}
					</Heading>
				</Ylabel>
			))}
			{xLabel
				? xLabel.map((item, idx) => {
						console.log(item);
						return (
							<Xlabel
								key={'barchart-x-axis ' + item}
								left={idx * (1 / xLabel.length) * 100 + (0.5 / xLabel.length) * 100}
								xLabelSpacing={xLabelSpacing}
							>
								<Heading variant="H9" style={{ ...labelStyle, fontSize: fontSize }}>
									{item}
								</Heading>
							</Xlabel>
						);
				  })
				: null}
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
