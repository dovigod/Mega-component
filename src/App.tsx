import './styles/basics/_styles.scss';
import styled from 'styled-components';
import PieChart from '@/components/PieChart'
import {PieChartMockData} from '@/mockData'

function App() {
	return (
		<div className="App">
			<Container>
				<PieChart data={PieChartMockData}/>
			</Container>

			<svg width='200' height='200'viewBox='0 0 100 100'>
				<circle cx='50' cy='50' r='25' 
				fill='transparent' stroke='red' strokeWidth='50' strokeDasharray='100 1000' transform='rotate(-90)'></circle>
			</svg>
		</div>
	);
}
export default App;

const Container = styled.div`
	width: 500px;
	height: 500px;
`;
