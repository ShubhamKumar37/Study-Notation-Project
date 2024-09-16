import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";


const {GET_ALL_CATEGORIES_API} = categories;
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