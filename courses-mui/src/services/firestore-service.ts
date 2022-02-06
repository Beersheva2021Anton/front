import CoursesService from "./courses-service";
import firebase, { collection, doc, getDoc, setDoc, getFirestore, deleteDoc, getDocs, DocumentData } from 'firebase/firestore';
import appFire from "../config/fire-config";
import { from, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { collectionData } from 'rxfire/firestore';
import CourseType from "../models/course-type";
import { authService } from "../config/service-config";
import ErrorType from "../models/common/error-types";

export default class CoursesServiceFirestore implements CoursesService {

    fireCol: firebase.CollectionReference;
    constructor(collectionName: string) {
        const db = getFirestore(appFire);
        this.fireCol = collection(db, collectionName);
    }

    async add(course: CourseType): Promise<CourseType> {
        try {
            await this.modifyAndWriteCourse(course);
            return course;
        } catch (err) {
            this.handleError(err);
        }
        throw new Error('Server error occured');
    }

    async remove(id: number): Promise<CourseType> {

        try {
            const course = await this.get(id);
            const docRef = doc(this.fireCol, id.toString());
            await deleteDoc(docRef);
            return course as CourseType;
        } catch (err) {
            this.handleError(err);
        }
        throw new Error('Server error occured');
    }

    async exists(id: number): Promise<boolean> {
        try {
            const docRef = doc(this.fireCol, id.toString());
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (err) {
            this.handleError(err);
        }
        throw new Error('Server error occured');
    }

    async get(id?: number): Promise<CourseType | CourseType[]> {
        try {
            if (id) {
                const docRef = doc(this.fireCol, id.toString());
                const docSnap = await getDoc(docRef);
                return this.convertDateField(docSnap);
            } else {
                const colSnap = await getDocs(this.fireCol);
                return colSnap.docs.map(doc => this.convertDateField(doc));
            }
        } catch (err) {
            this.handleError(err);
        }
        throw new Error('Server error occured');
    }

    async update(id: number, course: CourseType): Promise<CourseType> {
        try {
            const oldCourse = await this.get(id);
            await this.modifyAndWriteCourse(course);
            return oldCourse as CourseType;
        } catch (err) {
            this.handleError(err);
        }
        throw new Error('Server error occured');
    }

    publish(): Observable<any> {
        return (collectionData(this.fireCol) as Observable<CourseType[]>)
            .pipe(catchError(err => from(this.handleError(err))));
    }

    private async modifyAndWriteCourse(course: CourseType): Promise<void> {
        const courseModified: any = { ...course, startAt: course.startAt.toISOString() };
        await setDoc(doc(this.fireCol, course.id!.toString()), courseModified);
    }

    private convertDateField(docSnap: DocumentData): CourseType {
        let course = docSnap.data() as CourseType;
        course.startAt = new Date(course.startAt);
        return course;
    }

    private handleError(err: any): any {
        if (err.code) {
            authService.logout();
            return ErrorType.AUTH_ERROR;
        }
        return ErrorType.SERVER_UNAVAILABLE;
    }
}