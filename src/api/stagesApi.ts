import axios from "axios";
import Stage from "../model/Stage";

const apiUrl = "http://localhost:8080/api/stages"

export const getStageByIdApi = (id: number, requestConfig: any) => {
    return axios.get<Stage>(`${apiUrl}/${id}`, requestConfig)
        .then(response => {
            if (response.status !== 200)
                throw new Error("Could not fetch stage with id: " + id);
            return response.data
        }).catch(error => {
            throw error;
        })
}

export const getAllStagesApi = (requestConfig: any) => {
    return axios.get<Array<Stage>>(apiUrl, requestConfig)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};

export const addStageApi = (stage: Stage, requestConfig: any) => {
    return axios
        .post<Stage>(apiUrl, toPayload(stage), requestConfig)
        .then((response) => {
            if (response.status !== 200)
                throw new Error("Could not add new stage: " + response.data);
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export const updateStageApi = (stage: Stage, id: number, requestConfig: any) => {
    console.log('stage to be updated in api')
    console.log(stage)
    return axios
        .put<Stage>(`${apiUrl}/${id}`, toPayload(stage), requestConfig)
        .then((response) => {
            if (response.status !== 200)
                throw new Error("Could not update stage: " + stage.name);
            return response.data;
        })
        .catch(error => {
            throw error
        });
}

export const deleteStageApi = (stage: Stage, requestConfig: any) => {
    return axios
        .delete<Stage>(`${apiUrl}/${stage.id}`, requestConfig)
        .then((response) => {
            if (response.status !== 200)
                throw new Error("Could not delete stage: " + stage.name);
            return response.data;
        })
        .catch(error => {
            throw error;
        });
};

const toPayload = (s: Stage) => {
    return {
        id:0,
        name: s.name,
        location: s.location,
        capacity: s.capacity,
        sponsor: s.sponsor,
        image: s.image,
        user:{
            id: s.user_id
        }
    }
}

