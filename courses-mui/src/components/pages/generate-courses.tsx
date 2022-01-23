import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import CourseType from "../../models/course-type";
import courseData from "../../config/course-data.json";
import { getRandomDate, getRandomElement, getRandomInteger } from "../../utils/random";
import { college } from "../../config/service-config";
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-config";

const CourseGenerator: FC = () => {

    let [coursesNumber, setCoursesNumber] = useState<number>();
    let [valueErr, setValueErr] = useState<string>('');
    let [flNavigate, setFlNavigate] = useState<boolean>(false);

    function valueHandler(event: any): void {
        coursesNumber = +event.target.value;
        valueErr = '';
        if (coursesNumber < 1 || coursesNumber > 50) {
            valueErr = `Value should be more '1' and less '50'`;
        }
        setValueErr(valueErr);
        setCoursesNumber(coursesNumber);
    }

    async function generateButtonHandler(event: any): Promise<void> {
        event.preventDefault();
        for (let i = 0; i < coursesNumber!; i++) {
            const course = getRandomCourse();
            await college.addCourse(course);
        }
        setFlNavigate(true);
    }

    function getRandomCourse(): CourseType {
        let courseName = getRandomElement(courseData.courseNames);
        let lecturerName = getRandomElement(courseData.lecturers);
        let hours = getRandomInteger(courseData.minHours, courseData.maxHours);
        let cost = getRandomInteger(courseData.minCost, courseData.maxCost);
        let type = getRandomElement(courseData.types);
        let timingInd = getRandomInteger(0, courseData.timing.length);
        let timing = timingInd < courseData.timing.length ?
            [courseData.timing[timingInd]] : courseData.timing;
        let startDate = getRandomDate(courseData.minYear, courseData.maxYear);

        return {
            name: courseName, lecturer: lecturerName, hoursNum: hours, cost: cost,
            type: type, startAt: startDate, dayEvening: timing
        };
    }

    return <Box marginX='1em'>
        <Typography variant="h2">Generate Courses</Typography>
        <form onSubmit={generateButtonHandler}>
            <Box>
                <TextField sx={{ mb: 1, mr: 1, minWidth: 280 }} label='Courses Number'
                    type='number' error={!!valueErr} helperText={valueErr}
                    required autoComplete="off" onChange={valueHandler} />
                <Button sx={{ mb: 1, mr: 1, width: 135 }} variant="contained" 
                    disabled={!!valueErr} type="submit">
                    Generate
                </Button>
            </Box>
        </form>
        { flNavigate && <Navigate to={PATH_COURSES}></Navigate>}
    </Box>
}

export default CourseGenerator;