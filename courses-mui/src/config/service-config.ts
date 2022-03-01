import AuthServiceFire from "../services/auth-firebase";
import AuthService from "../services/auth-service";
import AuthServiceFake from "../services/auth-service-fake";
// import AuthServiceFake from "../services/auth-service-fake";
// import AuthServiceJwt from "../services/auth-service-jwt";
import College from "../services/college";
import CoursesService from "../services/courses-service";
import CoursesServiceRestJava from "../services/courses-service-rest-java";
// import CoursesServiceRest from "../services/courses-service-rest";
// import CoursesServiceFirestore from "../services/firestore-service";

const dataServerUrl = "http://localhost:8080/courses";
const webSocketUrl = "http://localhost:8080";
// const authServerUrl = "http://localhost:3500";
export const passwordLength = 8;
// const coursesColName = 'courses';
// const adminColName = 'administrators';

const dataService: CoursesService = new CoursesServiceRestJava(dataServerUrl, webSocketUrl);
export const college: College = new College(dataService);
export const authService: AuthService = new AuthServiceFake();