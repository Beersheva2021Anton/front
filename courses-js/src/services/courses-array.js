function getPromise(resolvedValue, timeout, rejectedError) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (rejectedError) {
                reject(rejectedError);
            } else {
                resolve(resolvedValue);
            }
        }, timeout);
    });
}

class CoursesArray {

    #courses;

    constructor() {
        this.#courses = [];
    }

    add(course) {
        if (this.#getIndex(course.id) >= 0) {
            return getPromise(undefined, 100, `Course '${course.id}' already exists`);
        }
        this.#courses.push(course);
        return getPromise(course, 100);
    }

    remove(id) {
        const index = this.#getIndex(id);
        if (index < 0) {
            return getPromise(undefined, 500, `Course '${course.id}' does not exist`);
        }
        return getPromise(this.#courses.splice(this.#getIndex(id), 1)[0], 1000);
    }

    get(id) {
        if (id != undefined) {
            const course = this.#courses.find(c => c.id == id);
            return course 
                ? getPromise(course, 100) 
                : getPromise(undefined, 100, `Course '${course.id}' does not exist`)
        } else {
            return getPromise([...this.#courses], 1000);
        }
    }

    update(id, newCourse) {
        const index = this.#getIndex(id);
        if (index < 0) {
            return getPromise(undefined, 500, `Course '${course.id}' does not exist`);
        }
        const oldValue = this.#courses[index];
        this.#courses[index] = newCourse;
        return getPromise(oldValue, 500);
    }

    exists(id) {
        return getPromise(this.#getIndex(id) != -1, 100);
    }

    #getIndex(id) {
        return this.#courses.findIndex(e => e.id == id);
    }
}

export default CoursesArray;