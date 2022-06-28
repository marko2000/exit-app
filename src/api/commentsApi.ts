import axios from "axios";
import Comment from "../model/Comment";

const apiUrl = "http://localhost:8080/api/comments"

export const getCommentsForEventApi = (eventId: number, requestConfig: any) => {
    return axios.get<Array<Comment>>(`${apiUrl}/event/${eventId}`, requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};

export const getAllCommentsApi = (requestConfig: any) => {
    return axios.get<Array<Comment>>(`${apiUrl}`, requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};

export const saveNewCommentApi = (comment: Comment, userId: number, requestConfig: any) => {
    console.log("saving nev comment: userId = " + userId)
    console.log(toPayload(comment, userId))
    return axios.post<Comment>(`${apiUrl}`, toPayload(comment, userId), requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export const deleteCommentApi = (comment: Comment, requestConfig: any) => {
    return axios
        .delete<Comment>(`${apiUrl}/${comment.id}`, requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        });
};

const toPayload = (comment: Comment, userId: number) => {
    return {
        rate: comment.rate,
        content: comment.content,
        eventId: comment.event.id,
        userId: userId
    }
}
