import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
} from 'victory';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';

const CHARTS_STYLE = {
  data: {
    width: 15,
    fill: '#FF751D',
  },
};

const LABEL_STYLE = {
  fontFamily: 'Roboto',
  fontSize: 9,
  fill: '#52555F',
};

const CORNER_RADIUS = {
  topLeft: 5,
  topRight: 5,
};

const Charts = ({ data }) => {
  const mobile = isMobile(useMediaQuery);
  const [axisY, axisX] = Object.keys(...data);
  const height = mobile ? 400 : 300;
  const width = mobile ? 200 : 600;

  return (
    <VictoryChart
      domainPadding={10}
      height={height}
      width={width}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        horizontal={mobile}
        style={{
          tickLabels: LABEL_STYLE,
        }}
      />
      <VictoryBar
        data={data}
        x={axisX}
        y={axisY}
        style={CHARTS_STYLE}
        cornerRadius={CORNER_RADIUS}
        labelComponent={<VictoryLabel style={LABEL_STYLE} />}
      />
    </VictoryChart>
  );
};

export default Charts;
