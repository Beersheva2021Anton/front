import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { FC, useState } from "react";
import IntervalType from "../../models/interval-type";
import { college } from "../../config/service-config";
import statData from "../../config/statistics-data.json";
import StatChart from "../stat-chart-form";
import StatTable from "../stat-table-form";

const StatisticsCost: FC = () => {

    let [interval, setInterv] = useState<number>();
    const [statisticsData, setStatisticsData] = useState<IntervalType[]>();

    function intervalHandler(event: any) {
        const value = event.target.value as number;
        setInterv(value);
        college.getStatisticsByCost(value).then(data => setStatisticsData(data));
    }

    return <Box marginX='1em'>
        <Box sx={{ mb: 1, mr: 1 }}>
            <Typography variant="h2">Cost Statistics</Typography>
        </Box>
        <Box sx={{ mb: 1, mr: 1 }}>
            <form>
                <FormControl sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                    <InputLabel id="cost-interval-label">Cost Interval</InputLabel>
                    <Select
                        labelId="cost-interval-label"
                        id="cost-interval-select"
                        value={interval}
                        label="Cost Interval"
                        onChange={intervalHandler}
                    >
                        {statData.costStatisticsIntervals.map((t, index) =>
                            <MenuItem key={index} value={t}>{t}</MenuItem>)}
                    </Select>
                </FormControl>
            </form>
        </Box>
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} order={{ md: 2 }}>
                <Paper elevation={3}>
                    {statisticsData &&
                        <StatChart title="Cost Chart" rawData={statisticsData as IntervalType[]} />}
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {statisticsData &&
                        <StatTable title="Cost Table" rawData={statisticsData as IntervalType[]} />}
                </Paper>
            </Grid>
        </Grid>
    </Box>
}

export default StatisticsCost;