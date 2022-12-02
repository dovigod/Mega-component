import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BarChartColumnProps } from 'types';

interface PercentageProps {
	[index: number]: string;
	percent: number;
	width?: string;
	grouped: boolean;
}
interface RowProps {
	slice: number;
	first: boolean;
}
/**
 *
 * @param {number} rows - row count
 * @param {boolean} grouped - set true to use grouped bar-chart (default : false)
 * @param {number | number[]} percent - data ratio of current data from data set (!important, when using grouped bar chart, should give 2-length Array)
 * @param {string | [string , string]} color - color of bar, (!important, when using grouped bar chart, should give 2-length Array) (default : 'tomato')
 * @param {string} [barWidth] - set static value of bar width (bar width defaults as responsive)
 * @returns React.Component
 */
const Column = ({ rows, grouped = false, barWidth, percent = 0, color = 'tomato', dataMax }: BarChartColumnProps) => {
	const [percentage, setPercentage] = useState<number | [number, number]>(0);

	const iterator = new Array(rows).fill(Math.random());
	useEffect(() => {
		if (grouped) {
			if (!(percent instanceof Array) || !(color instanceof Array)) {
				console.log('wrong arg format');
				return;
			}
			setPercentage([(percent[0] / dataMax) * 100, (percent[1] / dataMax) * 100]);
		} else {
			if (percent instanceof Array || color instanceof Array) {
				console.log('wrong arg format');
				return;
			}
			setPercentage(percent);
		}
	}, []);

	return (
		<Container>
			{iterator.map((item, idx) => {
				return <Row key={'BarChartColumn-' + item + idx} slice={rows} first={idx === 0} />;
			})}
			<PercentGroup>
				<Percentage
					percent={
						!grouped && typeof percentage === 'number'
							? percentage
							: percentage instanceof Array
							? percentage[0]
							: 0
					}
					width={barWidth}
					grouped={grouped}
					color={!grouped ? (color as string) : color[0]}
				/>
				{grouped && percentage instanceof Array ? (
					<Percentage percent={percentage[0]} width={barWidth} grouped={grouped} color={color[1]} />
				) : null}
			</PercentGroup>
		</Container>
	);
};

export default Column;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-right: 1px solid var(--color-white-300);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Row = styled.div<RowProps>`
	width: 100%;
	height: calc(100% / ${({ slice }) => slice});
	border-top: 1px solid var(--color-white-300);
	${({ first }) =>
		first
			? {
					border: 'none'
			  }
			: null}
`;

const PercentGroup = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: flex-end;
`;
const Percentage = styled.div<PercentageProps>`
	transform-origin: bottom center;
	transition: transform 1s ease-in-out;
	${({ percent }) => ({ transform: `scaleY(${percent || 0}%)` })};
	${({ width, grouped }) => (grouped ? { width: width || '35%' } : { width: width || '50%' })};
	height: 100%;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	background-color: ${({ color }) => color || 'yellow'};
`;
