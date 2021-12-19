import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css"
import { getRandomElement, getRandomInteger, getRandomDate } from "./utilities/random";
import courseData from "./config/courseData.json";
import statisticsData from "./config/statisticsData.json"
import College from "./services/college";
import { courseProvider } from "./config/servicesConfig";
import createCourse from "./models/Course";
import FormHandler from "./ui-ux/form-handler";
import TableHandler from "./ui-ux/table-handler";

const N_RANDOM_COURSES = 20;
const college = new College(courseProvider, courseData);
createRandomCourses(college, N_RANDOM_COURSES);
debugDisplayCollege(college);

function createRandomCourses(college, nCourses) {
    for (let i = 0; i < nCourses; i++){
        let courseName = getRandomElement(courseData.courseNames);
        let lecturerName = getRandomElement(courseData.lecturers);
        let hours = getRandomInteger(courseData.minHours, courseData.maxHours);
        let cost = getRandomInteger(courseData.minCost, courseData.maxCost);
        let type = getRandomElement(courseData.types);
        let timingInd = getRandomInteger(0, courseData.timing.length);
        let timing = timingInd < courseData.timing.length ? 
            [courseData.timing[timingInd]] : courseData.timing;
        let startDate = getRandomDate(courseData.minYear, courseData.maxYear);

        let course = createCourse(courseName, lecturerName, hours, cost, type, timing, startDate);
        college.addCourse(course);
    }
}

function debugDisplayCollege(college) {    
    college.getAllCourses().forEach(element => {
        console.log(JSON.stringify(element));
    });
}

const formCourse = new FormHandler('course-form', 'alert');
FormHandler.fillOptions('course-name', courseData.courseNames);
FormHandler.fillOptions('lecturer-name', courseData.lecturers);
formCourse.addHandler(college.addCourse.bind(college));

const coursesSort = function(key) {
    tableCourses.clear();
    college.sort(key).forEach(c => tableCourses.addRow(c, c.id));
}
const remFnName = 'remCourse';
const tableCourses = new TableHandler('courses-header', 'courses-body', 
    ['id', 'courseName', 'lecturerName', 'hoursNum', 'cost', 'startDate'], coursesSort, remFnName);
college.getAllCourses().forEach(c => tableCourses.addRow(c, c.id));
window[remFnName] = function(id) {
    if (confirm(`Are you sure you want to delete course '${id}'?`)) {
        tableCourses.removeRow(id);
        college.removeCourse(id);
    }
}

const getIntervalHours = function(interval) {
    tableIntervalHours.clear();
    let arr = college.getElementsByHours(interval);
    arr.forEach(c => tableIntervalHours.addRow(c, c.amount));   
}

const formHoursStatistics = new FormHandler("hours-stat-form", "alert");
FormHandler.fillOptions("select-hours", statisticsData.hoursStatisticsIntervals);
formHoursStatistics.addHandler(getIntervalHours);
const tableIntervalHours = new TableHandler("interval-hours-header", "interval-hours-body", ["minInterval", "maxInterval", "amount"]);


const getIntervalCost = function(interval) {
    tableIntervalcost.clear();
    let arr = college.getElementsByCost(interval);
    arr.forEach(c => tableIntervalcost.addRow(c, c.amount));   
}

const formCostStatistics = new FormHandler("cost-stat-form", "alert");
FormHandler.fillOptions("select-cost", statisticsData.costStatisticsIntervals);
formCostStatistics.addHandler(getIntervalCost);
const tableIntervalcost = new TableHandler("interval-cost-header", "interval-cost-body", ["minInterval", "maxInterval", "amount"]);