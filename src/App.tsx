import './styles/basics/_styles.scss';
import BarChart from '@/components/BarChart';
import styled from 'styled-components';
const data = [205, 500, 350, 850, 304];
const mockXLabel = ['10', '20~29', '30~39', '40~49', '50~69', '65+'];

function App() {
	return (
		<div className="App">
			<Container>
				<BarChart
					data={data}
					xLabel={mockXLabel}
					grouped={false}
					showLegend={false}
					color="var(--color-blue-400)"
				/>
			</Container>
		</div>
	);
}
export default App;

const Container = styled.div`
	width: 500px;
	height: 300px;
`;
