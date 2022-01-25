import { Box } from "@mui/material";
import { FC, useContext } from "react";
import CourseType from "../../models/course-type";
import AddCourseForm from "../add-course-form";
import CoursesContext from "../../store/context";

const AddCourse: FC = () => {
    const context = useContext(CoursesContext);                                                       

    function addCourseFn(course: CourseType): void {
        return context.add!(course);
    }

    return <Box marginX='1em'>
        <AddCourseForm addCourseFn={addCourseFn} />
    </Box>
}

export default AddCourse;