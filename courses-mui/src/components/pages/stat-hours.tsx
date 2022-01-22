import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useState } from "react";
import IntervalType from "../../models/interval-type";
import { college } from "../../config/service-config";
import statData from "../../config/statistics-data.json";
import StatChart from "../stat-chart-form";
import StatTable from "../stat-table-form";

const StatisticsHours: FC = () => {

    let [interval, setInterv] = useState<number>();
    const [statisticsData, setStatisticsData] = useState<IntervalType[]>();

    function intervalHandler(event: any) {
        const value = event.target.value as number;
        setInterv(value);
        college.getStatisticsByHours(value).then(data => setStatisticsData(data));
    }

    return <Box marginX='1em'>
        <Box sx={{ mb: 1, mr: 1 }}>
            <Typography variant="h2">Hours Statistics</Typography>
        </Box>
        <Box sx={{ mb: 1, mr: 1 }}>
            <form>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                    <InputLabel id="hour-interval-label">Hours Interval</InputLabel>
                    <Select
                        labelId="hours-interval-label"
                        id="hours-interval-select"
                        value={interval}
                        label="Hours Interval"
                        onChange={intervalHandler}
                    >
                        {statData.hoursStatisticsIntervals.map((t, index) =>
                            <MenuItem key={index} value={t}>{t}</MenuItem>)}
                    </Select>
                </FormControl>
            </form>
        </Box>
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} order={{ md: 2 }}>
                {statisticsData &&
                    <StatChart title="Hours Chart" rawData={statisticsData as IntervalType[]} />}
            </Grid>
            <Grid item xs={12} md={6}>
                {statisticsData &&
                    <StatTable title="Hours Table" rawData={statisticsData as IntervalType[]} />}
            </Grid>
        </Grid>
    </Box>
}

export default StatisticsHours;