import axios from "axios";
import Performer from "../model/Performer";
import Event from "../model/Event";

const apiUrl = "http://localhost:8080/api/performers";

export const getPerformerByIdApi = (id: number, requestConfig: any) => {
    return axios.get<Performer>(`${apiUrl}/${id}`, requestConfig).then(response => {
        if(response.status !== 200)
            throw new Error("Could not fetch performer with id: " + id);
        return response.data;
    }).catch(error => {
        throw error;
    });
}

export const getAllPerformersApi = (requestConfig: any) => {
    return axios.get<Array<Performer>>(apiUrl, requestConfig)
        .then(response => {
            console.log(response.data)
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export const getAllPerformersByEventApi = (event: Event, requestConfig: any) => {
    return axios.get<Array<Performer>>(`${apiUrl}/event/${event.id}`, requestConfig)
        .then((response) => {
            if(response.status !== 200)
                throw new Error("Could not fetch performers of event: " + event.name);
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export const addPerformerApi = (performer: Performer, requestConfig: any) => {
    const {name, surname, nick, genre, image, user_id} = performer;
    const payload: any = {
        name, surname, nick, genre: genre, image, user: {
            id: user_id
        }
    }

    return axios
        .post<Performer>(apiUrl, payload, requestConfig)
        .then(response => {
            if(response.status !== 200) {
                throw new Error("Could not add new performer: " + response.data);
            }

            return response.data;
        })
}

export const updatePerformerApi = (performer: Performer, id: number, requestConfig: any) => {
    const {name, surname, nick, genre, image, user_id} = performer;
    const payload: any = {
        name, surname, nick, genre: genre, image, user: {
            id: user_id
        }
    }

    return axios
        .put<Performer>(`${apiUrl}/${id}`, payload, requestConfig)
        .then(response => {
            if(response.status !== 200)
                throw new Error("Could not update performer " + performer.name + ": " + response.data);
            return response.data;
        })
        .catch(error => {
            throw error
        })
}

export const deletePerformerApi = (performer: Performer, requestConfig: any) => {
    return axios
        .delete<Performer>(`${apiUrl}/${performer.id}`, requestConfig)
        .then(response => {
            if(response.status !== 200)
                throw new Error("Could not delete performer " + performer.name + ": " + response.data);
            return response.data;
        })
        .catch(error => {
            throw error
        })
}