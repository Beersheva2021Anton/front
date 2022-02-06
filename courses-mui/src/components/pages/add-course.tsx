import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import CourseType from "../../models/course-type";
import { addCourseAction } from "../../redux/actions";
import AddCourseForm from "../add-course-form";

const AddCourse: FC = () => {
    
    const dispatch = useDispatch();

    function addCourseFn(course: CourseType): void {
        dispatch(addCourseAction(course));
    }

    return <Box marginX='1em'>
        <AddCourseForm addCourseFn={addCourseFn} />
    </Box>
}

export default AddCourse;