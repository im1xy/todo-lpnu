import axios from "axios";
import { backendUrl } from "../../config/backend";
 
export function mongoCreateUser(userEmail) {
    axios.post(
        backendUrl + '/api/createUser', 
        {userEmail: userEmail}
    ).then(res => {
        console.log(res);
        return res.success;
    });
}