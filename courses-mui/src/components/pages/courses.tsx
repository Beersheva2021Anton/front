import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import CoursesContext from "../../store/context";
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import CourseType from "../../models/course-type";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import { college } from "../../config/service-config";
import ActionConfirmation from "../common/action-confirmation";
import CourseInfo from "../course-info";

const Courses: FC = () => {
    const context = useContext(CoursesContext);

    const [columns, setColumns] = useState(getColumns(context.userData));
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    const [courseInfo, setCourseInfo] = useState<CourseType>();
    const [currentID, setCurrentID] = useState<number>(0);
    const rows = useMemo(() => getRows(context.list), [context.list]);

    useEffect(() => {
        setColumns(getColumns(context.userData));
    }, [context.userData]);

    function getRelevantActions(isAdmin: boolean, itemId: number): ReactElement[] {
        let res: ReactElement[] = [
            <GridActionsCellItem icon={<InfoIcon/>} label='Details' 
                onClick={() => showDetails(itemId)} />
        ]
        if (isAdmin) {
            res.push(<GridActionsCellItem icon={<DeleteOutlineIcon />} label='Remove'
            onClick={() => showRemoveConfirmation(itemId)} />)
        }
        return res;
    }

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
                field: 'actions', type: 'actions', getActions: (params: GridRowParams) => 
                    getRelevantActions(userData.isAdmin, params.id as number)
            }
        ]
        return res;
    }

    function getRows(courses: CourseType[]): GridRowsProp {
        return courses.map(course => course);
    }

    async function showDetails(id: number): Promise<void> {
        setCurrentID(id);        
        await college.getCourse(id).then(course => setCourseInfo(course));
        setInfoOpen(true);
    }

    function showRemoveConfirmation(id: number): void {
        setCurrentID(id);
        setConfirmOpen(true);
    }

    function handleRemove(status: boolean): void {
        if (status) {
            college.removeCourse(currentID);
        }
        setConfirmOpen(false);
    }

    function handleInfo(): void {
        setInfoOpen(false);
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Courses</Typography>
        <Paper sx={{ width: '80vw', height: '80vh' }}>
            <DataGrid rows={rows} columns={columns} />
        </Paper>
        <ActionConfirmation isVisible={confirmOpen} title="Course Remove" 
            message={`Are you sure you want to remove course with ID '${currentID}'?`} 
            onClose={handleRemove} />
        <CourseInfo isVisible={infoOpen} onClose={handleInfo} data={courseInfo!} />
    </Box>
}

export default Courses;