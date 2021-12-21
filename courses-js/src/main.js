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
import Spinner from "./ui-ux/spinner";

const N_RANDOM_COURSES = 20;
const remFnName = 'remCourse';

// Creating required objects
const college = new College(courseProvider, courseData);
const formCourse = new FormHandler('course-form', 'alert');
const tableCourses = new TableHandler('courses-header', 'courses-body', 
    ['id', 'courseName', 'lecturerName', 'hoursNum', 'cost', 'startDate'], coursesSort, remFnName);
const formHoursStatistics = new FormHandler("hours-stat-form", "alert");
const formCostStatistics = new FormHandler("cost-stat-form", "alert");
const tableIntervalHours = new TableHandler("interval-hours-header", "interval-hours-body", 
    ["minInterval", "maxInterval", "amount"]);
const tableIntervalcost = new TableHandler("interval-cost-header", "interval-cost-body", 
    ["minInterval", "maxInterval", "amount"]);
const spinner = new Spinner('spinner');

// Functions
async function waitWithSpinner(awaitFunc) {
    spinner.show();
    try {
        return await awaitFunc();
    } finally {
        spinner.hide();
    }       
}
async function createRandomCourses(college, nCourses) {
    const coursesArr = await college.getAllCourses();
    if (coursesArr.length == 0) {
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
            await college.addCourse(course);
            tableCourses.addRow(course, course.id);
        }
    }
}
async function debugDisplayCollege(college) {
    let coursesArr = await college.getAllCourses();
    coursesArr.forEach(element => {
        console.log(JSON.stringify(element));
    });
}
async function coursesSort(key) {
    tableCourses.clear();
    let sortedArr = await waitWithSpinner(college.sort.bind(college, key));
    sortedArr.forEach(c => tableCourses.addRow(c, c.id));
}
window[remFnName] = async function(id) {
    if (confirm(`Are you sure you want to delete course '${id}'?`)) {
        try {
            await waitWithSpinner(college.removeCourse.bind(college, id));
            tableCourses.removeRow(id);
        } catch (err) {
            // TODO alert functionality
        }
    }
}
async function getIntervalHours(interval) {
    tableIntervalHours.clear();
    let arr = await waitWithSpinner(college.getElementsByHours.bind(college, interval));
    arr.forEach(c => tableIntervalHours.addRow(c, c.amount));   
}
async function getIntervalCost(interval) {
    tableIntervalcost.clear();
    let arr = await waitWithSpinner(college.getElementsByCost.bind(college, interval));
    arr.forEach(c => tableIntervalcost.addRow(c, c.amount));   
}

// Actions
createRandomCourses(college, N_RANDOM_COURSES);
// debugDisplayCollege(college);

FormHandler.fillOptions('course-name', courseData.courseNames);
FormHandler.fillOptions('lecturer-name', courseData.lecturers);
formCourse.addHandler(async course => {
    await waitWithSpinner(college.addCourse.bind(college, course));
    tableCourses.addRow(course, course.id);
});

FormHandler.fillOptions("select-hours", statisticsData.hoursStatisticsIntervals);
formHoursStatistics.addHandler(async interval => getIntervalHours(interval));

FormHandler.fillOptions("select-cost", statisticsData.costStatisticsIntervals);
formCostStatistics.addHandler(async interval => getIntervalCost(interval));
