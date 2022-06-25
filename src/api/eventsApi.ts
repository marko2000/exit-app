import axios from "axios";
import Event from "../model/Event";

const apiUrl = "http://localhost:8080/api/events";

export const getEventByIdApi = (id: number, authorizationHeader: string) => {
    axios.get<Event>(`${apiUrl}/${id}`, {
        headers: {
            'Authorization': authorizationHeader
        }
    }).then(response => {
        if (response.status !== 200)
            throw new Error("Could not fetch event with id: " + id);
        return response.data;
    }).catch(error => console.log(error))
}

export const getAllEventsApi = () => {
    console.log("Getting all events api")
    return axios.get<Array<Event>>(apiUrl)
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.log(error)
            return [];
        })
}

export const addEventApi = (event: Event, authorizationHeader: string) => {
    console.log('addEvent: ' + event)
    return axios
        .post<Event>(apiUrl, toPostEventPayload(event), {
            headers: {
                'Authorization': authorizationHeader
            }
        })
        .then(response => {
            if(response.status !== 200)
                throw new Error("Could not add new event: " + response.data);
            return response.data;
        })
        .catch(e => {
            console.log(e)
        })
}

export const updateEventApi = (event: Event, id: number, authorizationHeader: string) => {
    return axios
        .put<Event>(`${apiUrl}/${id}`, toPostEventPayload(event), {
            headers: {
                'Authorization': authorizationHeader
            }
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e)
        })
}

export const deleteEventApi = (event: Event, authorizationHeader: string) => {
    return axios
        .delete<Event>(`${apiUrl}/${event.id}`, {
            headers: {
                'Authorization': authorizationHeader
            }
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e)
        })
}

type PostEventPayload = {
    id: number,
    image: string,
    start: string,
    name: string,
    stage_id: number,
    user_id: number
}

const toPostEventPayload = (event: Event) => {
    let postEventPayload: PostEventPayload = {
        id: event.id,
        image: event.image,
        start: event.start,
        name: event.name,
        stage_id: event.stage.id,
        user_id: event.user_id
    }
    
    return postEventPayload;
}