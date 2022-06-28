import axios from "axios";
import Ticket from "../model/Ticket";

const apiUrl = "http://localhost:8080/api/tickets"

export const getTicketsForUserApi = (userId: number, requestConfig: any) => {
    return axios.get<Array<Ticket>>(`${apiUrl}/user/${userId}`, requestConfig).then(response => {
        if (response.status !== 200)
            throw new Error("Could not fetch tickets of user with id: " + userId);
        return response.data
    }).catch(error => {
        throw error;
    })
}

export const getAllTicketsApi = (requestConfig: any) => {
    return axios.get<Array<Ticket>>(apiUrl, requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};

export const saveTicketsApi = (tickets: Ticket[], requestConfig: any, userId: number) => {
    return axios
        .post<Ticket[]>(apiUrl, toPayload(tickets, userId), requestConfig)
        .then((response) => {
            if (response.status !== 200)
                throw new Error("Could not add new tickets: " + response.data);
            return response.data;
        })
        .catch((e) => {
            throw e;
        });
}

const toPayload = (tickets: Ticket[], userId: number)  => {
    let ticketsArrayPayload: Array<any> = []
    tickets.forEach(t => {
        let converted = {
            title: t.title,
            image: t.image,
            price: t.price,
            description: t.description,
            purchaseDate: t.purchaseDate,
            discount: t.discount,
            stageId: t.stage ? t.stage.id : 1, // bad practice, but will do for now
            ownerId: userId
        }
        ticketsArrayPayload.push(converted);
    })
    return ticketsArrayPayload
}



