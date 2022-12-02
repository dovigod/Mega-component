import React from 'react';
import { CSSObject } from 'styled-components';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	variant: string;
	as?: string;
	className?: string;
	color?: string;
	margin?: string;
}

export interface BarChartColumnProps {
	rows: number;
	grouped: boolean;
	barWidth?: string;
	percent: percentType;
	color: string | string[];
	dataMax: number;
}

export type percentType = number | number[];



export interface BarChartDataType{
	label : string | string[],
	value : number | number[]
}

export interface BarChartProps {
	data: BarChartDataType[];
	rowCount?: number;
	labelStyle?: CSSObject;
	fontSize?: string;
	yLabelUnit?: string;
	grouped: boolean;
	color: string | string[];
	legendTag?: string | string[];
	showLegend: boolean;
}

export interface ChartProps {
	data: BarChartDataType[];
	rowCount?: number;
	labelStyle?: CSSObject;
	fontSize?: string;
	grouped: boolean;
	color: string | string[];
	xLabelSpacing?: string;
	yLabelSpacing?: string;
	yLabelUnit?: string;
}
