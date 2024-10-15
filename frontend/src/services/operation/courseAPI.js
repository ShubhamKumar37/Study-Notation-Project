import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { categories, courses } from "../apis";


const {GET_ALL_CATEGORIES_API} = categories;
const {CREATE_COURSE} = courses;

export function getCourseCategories() 
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));
        
        try
        {
            const response = await apiConnector("GET", GET_ALL_CATEGORIES_API);

            console.log("This is the reponse for getting all category = ", response);
        }
        catch(Error)
        {
            console.log("Error occur while fetching the course categories =>", Error);
        }
        dispatch(setLoading(false));
    }
}


export function createCourse(data)
{
    return async (dispatch) =>
    {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", CREATE_COURSE, {data});

            console.log("This is the response for creating a course => ", response);
            console.log(response.data);
            return response;
        }
        catch(Error)
        {
            console.log("Error while creating a course => ", Error);
        }
        dispatch(setLoading(false));
    }
}