import { Box, Paper, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import CoursesContext from "../../store/context";
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import CourseType from "../../models/course-type";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { college } from "../../config/service-config";
import RemoveConfirmation from "../remove-confirmation";

const Courses: FC = () => {
    const context = useContext(CoursesContext);

    const [columns, setColumns] = useState(getColumns(context.userData));
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [removeID, setRemoveID] = useState<number>(0);
    const rows = useMemo(() => getRows(context.list), [context.list]);

    useEffect(() => {
        setColumns(getColumns(context.userData));
    }, [context.userData]);

    function getColumns(userData: UserData): any[] {

        let res = [
            { field: 'name', headerName: 'Course Name', flex: 100 },
            { field: 'lecturer', headerName: 'Lecturer', editable: userData.isAdmin, flex: 100 },
            {
                field: 'hoursNum', headerName: 'Duration (hours)', type: 'number', flex: 100,
                align: 'center', headerAlign: 'center'
            },
            { field: 'cost', headerName: 'Cost ($)', type: 'number', editable: userData.isAdmin },
            {
                field: 'startAt', headerName: 'Start Date', type: 'date', editable: userData.isAdmin,
                flex: 200, align: 'center', headerAlign: 'center'
            },
            {
                field: 'actions', type: 'actions', getActions: (params: GridRowParams) => [
                    <GridActionsCellItem icon={<DeleteOutlineIcon />} label='Remove'
                        onClick={() => showRemoveConfirmation(params.id as number)}
                        disabled={!userData.isAdmin} />
                ]
            }
        ]
        return res;
    }

    function getRows(courses: CourseType[]): GridRowsProp {
        return courses.map(course => course);
    }

    function showRemoveConfirmation(id: number): void {
        setRemoveID(id);
        setConfirmOpen(true);
    }

    function handleRemove(): void {
        setConfirmOpen(false);
        college.removeCourse(removeID);
    }

    function handleClose(): void {
        setConfirmOpen(false);
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Courses</Typography>
        <Paper sx={{ width: '80vw', height: '90vh' }}>
            <DataGrid rows={rows} columns={columns} />
        </Paper>
        <RemoveConfirmation isVisible={confirmOpen} itemId={removeID} onClose={handleClose} 
            onRemove={handleRemove} />
    </Box>
}

export default Courses;