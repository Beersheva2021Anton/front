import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import CoursesContext from "../../store/context";
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridCellValue, GridPreProcessEditCellProps, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import CourseType from "../../models/course-type";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import Confirmation from "../common/confirmation";
import DialogInfo from "../common/dialog-info";
import { useMediaQuery } from "react-responsive";
import courseData from "../../config/course-data.json";
import mediaConfig from "../../config/media-config.json";

const Courses: FC = () => {
    const context = useContext(CoursesContext);
    const [columns, setColumns] = useState<any[]>(getColumns(context.userData));
    const rows = useMemo(() => getRows(context.list), [context.list]);
    const [confirmRemove, setConfirmRemove] = useState<boolean>(false);
    const [confirmUpdate, setConfirmUpdate] = useState<boolean>(false);
    let confirmMessage = useRef<string>('');
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    let courseInfo = useRef<CourseType>();
    let currentId = useRef<number>();
    

    const mobilePortrait = useMediaQuery({ maxWidth: 600, orientation: 'portrait' }, undefined,
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
            <GridActionsCellItem icon={<InfoIcon />} label='Details'
                onClick={() => showDetails(itemId)} />
        ]
        if (isAdmin) {
            res.push(<GridActionsCellItem icon={<DeleteOutlineIcon />} label='Remove'
                onClick={() => showRemoveConfirmation(itemId)} showInMenu />)
        }
        return res;
    }

    function getColumns(userData: UserData): any[] {

        let res = [
            { field: 'name', headerName: 'Course Name', flex: 250 },
            {
                field: 'lecturer', headerName: 'Lecturer', editable: userData.isAdmin, flex: 100,
                type: 'singleSelect', valueOptions: courseData.lecturers
            },
            {
                field: 'hoursNum', headerName: 'Duration (hours)', type: 'number', flex: 100,
                align: 'center', headerAlign: 'center'
            },
            {
                field: 'cost', headerName: 'Cost ($)', type: 'number', editable: userData.isAdmin,
                preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                    const isValid = validateCost(params.props.value as number);
                    return { ...params.props, error: !isValid };
                }
            },
            {
                field: 'startAt', headerName: 'Start Date', type: 'date', editable: userData.isAdmin,
                flex: 150, align: 'center', headerAlign: 'center',
                preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                    const isValid = validateDate(params.props.value);
                    return { ...params.props, error: !isValid };
                }
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

    function validateCost(cost: number): boolean {
        return cost >= courseData.minCost && cost <= courseData.maxCost;
    }

    function validateDate(dateInput: GridCellValue): boolean {
        let res = false;
        try {
            const date = new Date(dateInput as string);
            const year = date.getFullYear();
            res = year >= courseData.minYear && year <= courseData.maxYear;
        } catch (err) {
            //
        }
        return res;
    }

    async function onEdit(params: GridCellEditCommitParams): Promise<void> {
        let course = await context.get!(params.id as number) as any;
        const oldValue = course[params.field];        
        if (isChanged(oldValue, params)) {
            course[params.field] = params.value;
            courseInfo.current = course;
            showUpdateConfirmation(params, oldValue);
        }
    }

    function isChanged(oldValue: any, params: GridCellEditCommitParams): boolean {
        let isChanged: boolean = false;
        if (params.field === 'startAt') {
            const dateOld = new Date(oldValue);
            const dateNew = new Date(params.value as string);
            isChanged = dateOld.getTime() !== dateNew.getTime();
        } else {
            isChanged = oldValue !== params.value;
        }
        return isChanged;
    }

    function showDetails(id: number): void {
        context.get!(id)
            .then(course => courseInfo.current = course)
            .then(() => setInfoOpen(true));
    }

    function showRemoveConfirmation(id: number): void {
        currentId.current = id;
        setConfirmRemove(true);
    }

    function showUpdateConfirmation(params: GridCellEditCommitParams, oldValue: any): void {
        currentId.current = params.id as number;
        confirmMessage.current = 
            `Change ${params.field} '${oldValue}' to '${params.value}' for course with ID '${params.id}'?`;
        setConfirmUpdate(true);
    }

    function handleRemove(status: boolean): void {
        if (status) {
            context.remove!(currentId.current!);
        }
        setConfirmRemove(false);
    }

    function handleUpdate(status: boolean): void {
        if (status) {
            context.update!(currentId.current!, courseInfo.current!);
        }
        setConfirmUpdate(false);
    }

    return <Box marginX='1em' sx={{
        '& .MuiDataGrid-cell--editing': {
            bgcolor: 'rgb(255,215,115, 0.19)',
            color: '#1a3e72',
            '& .MuiInputBase-root': {
                height: '100%',
            },
        },
        '& .Mui-error': {
            bgcolor: '#F39B9B',
            color: '#FFFFFF'
        }
    }}>
        <Typography variant="h2">Courses</Typography>
        <Paper sx={{ width: '80vw', height: '80vh' }}>
            <DataGrid rows={rows} columns={columns} onCellEditCommit={onEdit} />
        </Paper>
        <Confirmation isVisible={confirmRemove} title="Course Remove"
            message={`Are you sure you want to remove course with ID '${currentId.current!}'?`}
            onClose={handleRemove} />
        <Confirmation isVisible={confirmUpdate} title="Course Update"
            message={confirmMessage.current}
            onClose={handleUpdate} />
        <DialogInfo isVisible={infoOpen} onClose={() => setInfoOpen(false)} data={courseInfo.current!}
            properties={["id", "name", "type", "lecturer", "hoursNum", "cost", "dayEvening", "startAt"]} />
    </Box>
}

export default Courses;