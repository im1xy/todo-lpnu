import axios from "axios";
import { backendUrl } from "../../config/backend";

export function mongoCreateList(userEmail, newList) {
    axios.post(`${backendUrl}/api/createList`, 
        {
            userEmail: userEmail,
            list: newList
        }
    );
}

export async function mongoReadLists(userEmail) {
    return (await axios.get(`${backendUrl}/api/readLists?userEmail=${userEmail}`)).data;
}

export function mongoUpdateList(userEmail, oldListId, newList) {
    axios.put(`${backendUrl}/api/updateList`,
        {
            userEmail: userEmail,
            oldListId: oldListId,
            newList: newList
        }
    );
}

export function mongoDeleteList(userEmail, listId) {
    axios.delete(`${backendUrl}/api/deleteList?userEmail=${userEmail}&listId=${listId}`);
}