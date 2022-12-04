import styled from 'styled-components';
import {useEffect , useState} from 'react';
import {AdaptedPieChartData, PieChartProps} from '@/types'
import {degToRad} from '@/utils'
const moveToFront = (id : string) =>{
    const portion = document.querySelector(id)
    portion?.parentNode?.appendChild(portion);    
}
const caculateTextCoordinate = (accumulatedPercent : number , percent : number) => {
    let rotationDeg =  360 * (accumulatedPercent - (percent/2));
    if(rotationDeg <= 90){
        rotationDeg = 90 - rotationDeg
    }else if(rotationDeg <= 180 && rotationDeg > 90){
        rotationDeg = 360 - rotationDeg + 90;
    }else if(rotationDeg > 180 && rotationDeg <= 270){
        rotationDeg = 270 - rotationDeg + 180
    }else{
        rotationDeg = 360 - rotationDeg + 90
    }
    const rad = degToRad(rotationDeg);

    const x_offset = Math.cos(rad );
    const y_offset = Math.sin(rad );
    return {
        dx : x_offset,
        dy : -y_offset
    }
}

const PieChart = ({data , ...rest} : PieChartProps) => {
    const [values , setValues] = useState<Array<AdaptedPieChartData>>([]);
    const RADIUS = 50;
    const TEXT_X_OFFSET = -3;
    const TEXT_Y_OFFSET = 3;
    const adapt = () => {
        let sum = 0;
        const tmp : Array<AdaptedPieChartData> = [];
        data.forEach((d) => {
            sum += d.value;
        });
        data.forEach((d) => {
            const share = (d.value / sum);
            tmp.push({
                color : d.color,
                acc : tmp.length === 0 ? share  : tmp[tmp.length - 1].acc + share ,
                share,
            })
        });
        setValues(tmp);
    };
    useEffect(() => {
        if(data){
            adapt();
        }
    },[]);

    return <Svg viewBox='0 0 120 120' {...rest}>
        {
            values.map((d,idx) => {
                return <Group id={'pie-group' + idx} rotate={(d.acc - d.share)*360 } onMouseEnter={() => moveToFront('#pie-group' + idx)}>
                    <Circle  cx='60' cy='60' r={RADIUS / 2} fill='transparent' stroke={d.color} strokeWidth={RADIUS} percent={d.share}/>
            <Text fill='white' x='60' y='60' dx={TEXT_X_OFFSET+RADIUS/2*caculateTextCoordinate(d.acc,d.share).dx} dy={TEXT_Y_OFFSET+RADIUS/2*caculateTextCoordinate(d.acc,d.share).dy} rot={90 - ((d.acc-d.share)*360)}>{Math.ceil(d.share * 100)}%</Text>
                </Group>
            })
        }
    </Svg>
}
export default PieChart;

const Svg =styled.svg`
    width: 100%;
    height: 100%;
    background-color : tan;
    position :relative;
`;
const Circle = styled.circle<{percent : number}>`
    position : absolute;
    top : 50%;
    left : 50%;
    transition :all 0.5s ease;
    stroke-dasharray : calc(calc(2 * 3.14 * 25) * ${({percent}) => percent ? percent : 0} ) calc(calc(2 * 3.14 * 25) * ${({percent}) => percent ? 1-percent : 1}  );
    transform-origin : center center;
    box-shadow : 2px 3px 5px rgba(0,0,0,0.3);
`
const Text = styled.text<{rot : number}>`
    display:none;
    transform-origin : center center;
    transform : ${({rot}) => `rotate(${rot}deg)`};
    font-size : 0.5em;
    font-familly : 'Kumbh Sans';
    font-weight: bold;
    color : white;
`
const Group = styled.g<{rotate : number}>`
    transition :all 0.5s ease;
    transform-origin : center center;
    transform : ${({rotate}) => `rotate(${-90 + rotate}deg)`};
    z-index : 0;
    &:hover{
        transform : ${({rotate}) => `rotate(${-90 + rotate}deg)`} scale(1.2);
        ${Text}{
            display:block;
        }
    }
`;
