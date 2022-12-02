import './styles/basics/_styles.scss';
import BarChart from '@/components/BarChart';
import styled from 'styled-components';
const data = [205, 500, 350, 850, 304,721];
const mockXLabel = ['10', '20~29', '30~39', '40~49', '50~69', '65+'];

const data2 = [[205,306], [500,300], [350,123], [850,100], [10,304],[721,600]];
// const color = "var(--color-blue-400)"
const color = ["var(--color-blue-400)","var(--color-red-500)"]


const d = [{
	label : '10',
	value : [205,306]
},{
	label : '20~29',
	value : [500,300]
},{
	label : '30~39',
	value : [350,123]
},{
	label : '40~49',
	value : [850,100]
},{
	label : '50~59',
	value : [10,304]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
},{
	label : '65+',
	value : [721,600]
}]
function App() {
	return (
		<div className="App">
			<Container>
				<BarChart
					data={d}
					grouped={true}
					showLegend={false}
					color={color}
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
