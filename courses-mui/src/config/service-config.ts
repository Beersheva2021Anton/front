import AuthService from "../services/auth-service";
import AuthServiceJwt from "../services/auth-service-jwt";
import College from "../services/college";
import CoursesService from "../services/courses-service";
import CoursesServiceRest from "../services/courses-service-rest";

const dataServerUrl = "http://localhost:3500/courses";
const authServerUrl = "http://localhost:3500";
export const passwordLength = 8;

const dataService: CoursesService = new CoursesServiceRest(dataServerUrl);
export const college: College = new College(dataService);
export const authService: AuthService = new AuthServiceJwt(authServerUrl);