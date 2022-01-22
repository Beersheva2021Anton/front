import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography } from "@mui/material";
import { FC } from "react";
import IntervalType from "../models/interval-type";

type TableProps = {
  title: string,
  rawData: IntervalType[]
}

const StatTable: FC<TableProps> = props => {

  const { title, rawData } = props;

  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
    <Table size="small" sx={{ width: '80%', mb: 2, mr: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Min</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Max</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="right">Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rawData.map((interval, index) => (
          <TableRow key={index}>
            <TableCell>{interval.min}</TableCell>
            <TableCell>{interval.max}</TableCell>
            <TableCell align="right">{interval.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
}

export default StatTable;