import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import CoursesContext from "../../store/context";
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import CourseType from "../../models/course-type";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import { college } from "../../config/service-config";
import Confirmation from "../common/confirmation";
import DialogInfo from "../common/dialog-info";
import { useMediaQuery } from "react-responsive";
import mediaConfig from "../../config/media-config.json";

const Courses: FC = () => {
    const context = useContext(CoursesContext);

    const [columns, setColumns] = useState<any[]>(getColumns(context.userData));
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    const [courseInfo, setCourseInfo] = useState<CourseType>();
    const [currentID, setCurrentID] = useState<number>(0);
    const rows = useMemo(() => getRows(context.list), [context.list]);

    const mobilePortrait = useMediaQuery({ maxWidth: 600, orientation: 'portrait'}, undefined, 
        () => filterCurrentColumns());
    const mobileOrTablet = useMediaQuery({ maxWidth: 900 }, undefined, () => filterCurrentColumns());

    useEffect(() => {
        filterCurrentColumns();
    }, [context.userData]);

    function filterCurrentColumns() {
        let columnsMedia: any[] = [];
        if (mobilePortrait) {
            columnsMedia = getColumns(context.userData).filter(column => column.field === 'actions' || 
                mediaConfig.small.indexOf(column.field) >= 0);
        } else if (mobileOrTablet) {
            columnsMedia = getColumns(context.userData).filter(column => column.field === 'actions' || 
                mediaConfig.medium.indexOf(column.field) >= 0);
        } else {
            columnsMedia = getColumns(context.userData).filter(column => column.field === 'actions' || 
                mediaConfig.large.indexOf(column.field) >= 0);
        }
        setColumns(columnsMedia);
    }

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
            { field: 'name', headerName: 'Course Name', flex: 250 },
            { field: 'lecturer', headerName: 'Lecturer', editable: userData.isAdmin, flex: 100 },
            {
                field: 'hoursNum', headerName: 'Duration (hours)', type: 'number', flex: 100,
                align: 'center', headerAlign: 'center'
            },
            { field: 'cost', headerName: 'Cost ($)', type: 'number', editable: userData.isAdmin },
            {
                field: 'startAt', headerName: 'Start Date', type: 'date', editable: userData.isAdmin,
                flex: 150, align: 'center', headerAlign: 'center'
            },
            {
                field: 'actions', type: 'actions', flex: 50, getActions: (params: GridRowParams) => 
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
        <Confirmation isVisible={confirmOpen} title="Course Remove" 
            message={`Are you sure you want to remove course with ID '${currentID}'?`} 
            onClose={handleRemove} />
        <DialogInfo isVisible={infoOpen} onClose={handleInfo} data={courseInfo!}
            properties={["id", "name", "type", "lecturer", "hoursNum", "cost", "dayEvening", "startAt"]} />
    </Box>
}

export default Courses;