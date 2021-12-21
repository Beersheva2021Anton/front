import _ from "lodash";
import { getRandomInteger } from "../utilities/random";

export default class College {

    #coursesProvider;
    #courseData;

    constructor(coursesProvider, courseData) {
        this.#coursesProvider = coursesProvider;
        this.#courseData = courseData;
    }

    async addCourse(course) {
        course.hoursNum = +course.hoursNum;
        course.cost = +course.cost;
        course.startDate = new Date(course.startDate);
        let validationErrors = this.#validate(course);
        if (validationErrors) {
            throw validationErrors;
        }
        const id = await this.#getId();
        course.id = id;
        return await this.#coursesProvider.add(course);
    }

    async removeCourse(id) {
        return await this.#coursesProvider.remove(id);
    }

    #validate(course) {
        let errMsg = '';
        if (!this.#courseData.courseNames.includes(course.courseName)){
            errMsg += '"Course Name"; ';
        }
        if (!this.#courseData.lecturers.includes(course.lecturerName)){
            errMsg += '"Lecturer Name"; ';
        }
        if (course.hoursNum < this.#courseData.minHours || 
            course.hoursNum > this.#courseData.maxHours) {
            errMsg += '"Hours Number"; ';
        }
        if (course.cost < this.#courseData.minCost || course.cost > this.#courseData.maxCost) {
            errMsg += '"Cost"; ';
        }
        if (!this.#courseData.types.includes(course.type)) {
            errMsg += '"Type"; ';
        }
        if (course.dayEvening.length == 0 || 
            course.dayEvening.length > this.#courseData.timing.length) {
            errMsg += '"Timing"; ';
        }
        course.dayEvening.forEach(element => {
            if (!this.#courseData.timing.includes(element)){
                errMsg += '"Timing"; ';
            }
        });
        if (course.startDate.getFullYear() < this.#courseData.minYear || 
            course.startDate.getFullYear() > this.#courseData.maxYear) {
                errMsg += '"Start Date"; ';
            }
        return errMsg;
    }

    async #getId() {
        do {
            var randomId = getRandomInteger(this.#courseData.minId, this.#courseData.maxId);
        } while(await this.#coursesProvider.exists(randomId));
        return randomId;
    }

    async getAllCourses(){
        return await this.#coursesProvider.get();
    }

    async sort(key) {
        return _.sortBy(await this.getAllCourses(), key);
    }

    async getElementsByHours(value){
        let interval = value.interval;
        let arr = await this.#coursesProvider.get();
        let arrCnt =  _.countBy(arr, e => {   
           return Math.floor(e.hoursNum/interval)*interval;
        });
        return this.#getInterval(arrCnt, interval);
    }

    async getElementsByCost(value){
        let interval = value.interval;
        let arr = await this.#coursesProvider.get();
        let arrCnt =  _.countBy(arr, e => {   
           return Math.floor(e.cost/interval)*interval;
        });
        return this.#getInterval(arrCnt, interval)
    }

    #getInterval(array, interval){
        let res = [];
        for (let key in array) {
            let minInterval = key;
            let maxInterval = +key + +interval - 1;
            let amount = array[key];
            res.push({minInterval:minInterval, maxInterval:maxInterval, amount:amount});
          }
        return res;
    }
}