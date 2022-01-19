import { Box } from "@mui/material";
import { FC } from "react";
import CourseType from "../../models/course-type";
import AddCourseForm from "../add-course-form";
import { college } from "../../config/service-config";

const AddCourse: FC = () => {                                                         

    function addCourseFn(course: CourseType): Promise<CourseType> {
        return college.addCourse(course);
    }

    return <Box marginX='1em'>
        <AddCourseForm addCourseFn={addCourseFn} />
    </Box>
}

export default AddCourse;