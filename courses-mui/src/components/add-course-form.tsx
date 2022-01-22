import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { FC, useState } from "react";
import courseData from "../config/course-data.json";
import CourseType from "../models/course-type";

type AddCourseProps = {
    addCourseFn: (course: CourseType) => Promise<CourseType>;
}

const AddCourseForm: FC<AddCourseProps> = props => {

    let [courseType, setCourseType] = useState<string>('');
    let [courseName, setCourseName] = useState<string>('');
    let [lecturer, setLecturer] = useState<string>('');
    let [hours, setHours] = useState<number>();
    let [hoursErr, setHoursErr] = useState<string>('');
    let [cost, setCost] = useState<number>();
    let [costErr, setCostErr] = useState<string>('');
    let [timing, setTiming] = useState<string[]>([]);
    let [startAt, setStartAt] = useState<Date>();
    let [yearErr, setYearErr] = useState<string>('');

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // HANDLERS 

    function courseTypeHandler(event: SelectChangeEvent): void {
        courseType = event.target.value;
        setCourseType(courseType);
    }

    function courseNameHandler(event: SelectChangeEvent): void {
        courseName = event.target.value;
        setCourseName(courseName);
    }

    function lecturerHandler(event: SelectChangeEvent): void {
        lecturer = event.target.value;
        setLecturer(lecturer);
    }

    function hoursHandler(event: any): void {
        hours = +event.target.value;
        const validationRes = hoursValidationFn(hours);
        setHoursErr(validationRes);
        if (!validationRes) {
            setHours(hours);
        }
    }

    function costHandler(event: any): void {
        cost = +event.target.value;
        const validationRes = costValidationFn(cost);
        setCostErr(validationRes);
        if (!validationRes) {
            setCost(cost);
        }
    }

    function timingHandler(event: any): void {
        timing = event.target.value as string[];
        setTiming([...timing]);
    }

    function startDateHandler(event: any): void {
        startAt = new Date(event.target.value);
        const validationRes = startDateValidationFn(startAt);
        setYearErr(validationRes);
        if (!validationRes) {
            setStartAt(startAt);
        }
    }

    // VALIDATION

    function hoursValidationFn(hoursNum: number): string {
        let res = '';
        if (hoursNum < courseData.minHours || hoursNum > courseData.maxHours) {
            res = `Value should be more '${courseData.minHours}' and less '${courseData.maxHours}'`;
        }
        return res;
    }

    function costValidationFn(cost: number): string {
        let res = '';
        if (cost < courseData.minCost || cost > courseData.maxCost) {
            res = `Value should be more '${courseData.minCost}' and less '${courseData.maxCost}'`;
        }
        return res;
    }

    function startDateValidationFn(startDate: Date): string {
        let res = '';
        const year = startDate.getFullYear();
        if (year < courseData.minYear || year > courseData.maxYear) {
            res = `Year should be more '${courseData.minYear}' and less '${courseData.maxYear}'`;
        }
        return res;
    }

    // OTHERS

    function clearForm() {
        setCourseName('');
        setCourseType('');
        setLecturer('');
        setHours(undefined);
        setCost(undefined);
        setStartAt(new Date());
        setTiming([]);
    }

    function getCurrentDate(): string {
        return new Date(Date.now()).toISOString().split('T')[0];
    }

    function addCourse(): void {
        props.addCourseFn({
            name: courseName,
            lecturer: lecturer,
            hoursNum: hours as number,
            cost: cost as number,
            type: courseType,
            dayEvening: timing,
            startAt: startAt as Date
        })
    }

    return <form onSubmit={() => addCourse()} onReset={() => clearForm()}>
        <Typography variant="h2">Add New Course</Typography>
        <Box>
            <FormControl required sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                <InputLabel id="course-type-label">Course Type</InputLabel>
                <Select
                    labelId="course-type-label"
                    id="course-type-select"
                    value={courseType}
                    label="Course Type *"
                    onChange={courseTypeHandler}
                >
                    {courseData.types.map((t, index) =>
                        <MenuItem key={index} value={t}>{t}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl required sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                <InputLabel id="course-name-label">Course Name</InputLabel>
                <Select
                    labelId="course-name-label"
                    id="course-name-select"
                    value={courseName}
                    label="Course Name *"
                    onChange={courseNameHandler}
                >
                    {courseData.courseNames.map((t, index) =>
                        <MenuItem key={index} value={t}>{t}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>

        <Box>
            <FormControl required sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                <InputLabel id="lecturer-label">Lecturer</InputLabel>
                <Select
                    labelId="lecturer-label"
                    id="lecturer-select"
                    value={lecturer}
                    label="Lecturer *"
                    onChange={lecturerHandler}
                >
                    {courseData.lecturers.map((t, index) =>
                        <MenuItem key={index} value={t}>{t}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField sx={{ mb: 1, mr: 1, minWidth: 280 }} label='Hours Number'
                type='number' error={!!hoursErr} helperText={hoursErr}
                required autoComplete="off" onChange={hoursHandler} />
        </Box>

        <Box>
            <FormControl required sx={{ mb: 1, mr: 1, minWidth: 280 }}>
                <InputLabel id="timing-checkbox-label">Timing</InputLabel>
                <Select
                    labelId="timing-checkbox-label"
                    id="timing-checkbox"
                    multiple
                    value={timing}
                    onChange={timingHandler}
                    input={<OutlinedInput label="Timing" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {courseData.timing.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={timing.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField id="date" label="Start Date" type="date" required
                defaultValue={getCurrentDate()}
                sx={{ mb: 1, mr: 1, minWidth: 280 }} error={!!yearErr} helperText={yearErr}
                InputLabelProps={{
                    shrink: true,
                }} onChange={startDateHandler} />
        </Box>

        <Box>
            <TextField sx={{ mb: 1, mr: 1, minWidth: 280 }} label='Cost'
                type='number' error={!!costErr} helperText={costErr}
                required autoComplete="off" onChange={costHandler} />
        </Box>

        <Box>
            <Button sx={{ mb: 1, mr: 1, width: 135 }} type="submit" variant="contained"
                disabled={!!hoursErr || !!costErr || !!yearErr}>
                Submit
            </Button>
            <Button sx={{ mb: 1, mr: 1, width: 135 }} type="reset" variant="outlined">
                Reset
            </Button>
        </Box>
    </form>
}

export default AddCourseForm;