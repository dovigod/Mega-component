import { createElement } from 'react';
import { HeadingProps } from '@/types';
const allowedTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'label'];

/**
 * @param {string} variant - The variant of the heading.
 * - EBH1
 * - EBH2
 * - BH1
 * - BH2
 * - BH3
 * - BH4
 * - BH5
 * - BH6
 * - BH7
 * - BH8
 * - SBH1
 * - SBH2
 * - SBH3
 * - SBH4
 * - SBH5
 * - H1
 * - H2
 * - H3
 * - H4
 * - H5
 * - H6
 * - H7
 * - H8
 * - H9
 * @param {string} [as] - The tag name of the heading. (optional)
 * @param {string} children - The content of the heading.
 * @param {string} [className] - The additional class name of the heading.
 * @param {string} color - color of heading
 * @additional The rest of the props are passed to the underlying component.
 */
const Heading = ({ variant, as, children, className = '', color, style, margin, ...rest }: HeadingProps) => {
	let tagName = as || variant?.slice(-2)?.toLowerCase();
	if (!allowedTagNames.includes(tagName)) {
		tagName = 'p';
	}
	return createElement(
		tagName,
		{
			className: `${variant.toLowerCase()} ${className ? className : ''}`,
			style: {
				...style,
				margin,
				color
			},
			...rest
		},
		<>{children}</>
	);
};

export default Heading;
