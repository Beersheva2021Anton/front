import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from "react";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import IntervalType from '../models/interval-type';

type ChartProps = {
    title: string,
    rawData: IntervalType[]
}

type ChartData = {
    interval: number,
    count: number
}

const StatChart: FC<ChartProps> = props => {

    const theme = useTheme();
    const { title, rawData } = props;
    let data: ChartData[] = [];
    data.push({ interval: rawData[0].min, count: 0 });
    rawData.forEach(d => data.push({ interval: d.max, count: d.count }));

    return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <ResponsiveContainer width="80%" aspect={3}>
            <LineChart data={data}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}
            >
                <XAxis
                    dataKey='interval'
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                />
                <YAxis
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                >
                    <Label
                        angle={270}
                        position="left"
                        style={{
                            textAnchor: 'middle',
                            fill: theme.palette.text.primary,
                            ...theme.typography.body1,
                        }}
                    >
                        Courses
                    </Label>
                </YAxis>
                <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey='count'
                    stroke={theme.palette.primary.main}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </Box>
}

export default StatChart;