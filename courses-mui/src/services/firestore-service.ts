import CoursesService from "./courses-service";
import firebase, { collection, doc, getDoc, setDoc, getFirestore, deleteDoc, getDocs, DocumentData } from 'firebase/firestore';
import appFire from "../config/fire-config";
import { Observable } from "rxjs";
import { collectionData } from 'rxfire/firestore';
import CourseType from "../models/course-type";

export default class CoursesServiceFirestore implements CoursesService {

    fireCol: firebase.CollectionReference;
    constructor(collectionName: string) {
        const db = getFirestore(appFire);
        this.fireCol = collection(db, collectionName);
    }

    async add(course: CourseType): Promise<CourseType> {
        await this.modifyAndWriteCourse(course);
        return course;
    }

    async remove(id: number): Promise<CourseType> {
        const course = await this.get(id);
        const docRef = doc(this.fireCol, id.toString());
        await deleteDoc(docRef);
        return course as CourseType;
    }

    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.fireCol, id.toString());
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    async get(id?: number): Promise<CourseType | CourseType[]> {
        if (id) {
            const docRef = doc(this.fireCol, id.toString());
            const docSnap = await getDoc(docRef);
            return this.convertDateField(docSnap);
        } else {
            const colSnap = await getDocs(this.fireCol);
            return colSnap.docs.map(doc => this.convertDateField(doc));
        }
    }

    async update(id: number, course: CourseType): Promise<CourseType> {
        const oldCourse = await this.get(id);
        await this.modifyAndWriteCourse(course);
        return oldCourse as CourseType;
    }

    publish(): Observable<CourseType[]> {
        return collectionData(this.fireCol) as Observable<CourseType[]>;
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
}