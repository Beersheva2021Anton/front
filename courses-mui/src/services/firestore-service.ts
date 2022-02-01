import CoursesService from "./courses-service";
import firebase, { collection, doc, getDoc, setDoc, getFirestore, deleteDoc, getDocs, DocumentData } from 'firebase/firestore';
import appFire from "../config/fire-config";
import { Observable } from "rxjs";
import { collectionData } from 'rxfire/firestore';
import CourseType from "../models/course-type";
import {catchError} from "rxjs/operators";
import { authService } from "../config/service-config";

export default class CoursesServiceFirestore implements CoursesService {

    fireCol: firebase.CollectionReference;
    constructor(collectionName: string) {
        const db = getFirestore(appFire);
        this.fireCol = collection(db, collectionName);
    }

    async add(course: CourseType): Promise<CourseType> {
        try {
            await this.modifyAndWriteCourse(course);
        } catch(err) {
            this.handleError(err);
        }        
        return course;
    }

    async remove(id: number): Promise<CourseType> {
        const course = await this.get(id);
        const docRef = doc(this.fireCol, id.toString());
        try {
            await deleteDoc(docRef);
        } catch(err) {
            this.handleError(err);
        }        
        return course as CourseType;
    }

    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.fireCol, id.toString());
        try {
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch(err) {
            this.handleError(err);
        }        
        throw new Error('Unexpected error');
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
        } catch(err) {
            this.handleError(err);
        }
        throw new Error('Unexpected error');
    }

    async update(id: number, course: CourseType): Promise<CourseType> {
        const oldCourse = await this.get(id);
        try {
            await this.modifyAndWriteCourse(course);
        } catch(err) {
            this.handleError(err);
        }
        return oldCourse as CourseType;
    }

    publish(): Observable<CourseType[]> {
        return (collectionData(this.fireCol) as Observable<CourseType[]>)
            .pipe(catchError(err => {
                this.handleError(err);
                throw new Error('Unexpected error');
            }));
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

    private handleError(err: any): void {
        if (err.code) {
            authService.logout();
            throw new Error('NOT_AUTHORIZED');
        }
        throw new Error('SERVER_UNAVAILABLE');
    }
}