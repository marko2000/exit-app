import Performer from "../model/Performer";
import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import { useAuthentication } from "./AuthenticationContext";

const apiUrl = "http://localhost:8080/api/performers"

type PerformersContextType = {
    performers: Array<Performer>;
    selectedPerformer: Performer | null | undefined;
    addPerformer: (performer: Performer) => void;
    deletePerformer: (performer: Performer) => void;
    updatePerformer: (performer: Performer, id: number) => void;
    getAllPerformers: () => void;
    selectPerformer: (performer: Performer) => void;
}

const PerformersContext = createContext<PerformersContextType>({
    performers: [],
    selectedPerformer: null,
    addPerformer: () => {},
    updatePerformer: () => {},
    deletePerformer: () => {},
    getAllPerformers: () => {},
    selectPerformer: () => {}
})

export const usePerformers = () => {
    return useContext(PerformersContext)
}

export const PerformersProvider: React.FC = (props) => {
    const authentication = useAuthentication()

    const [performers, setPerformers] = useState<Array<Performer>>()
    const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>()

    const selectPerformer = (performer: Performer) => {
        setSelectedPerformer(performer)
    }

    const getAllPerformers = () => {
        axios.get<Array<Performer>>(apiUrl)
        .then((response) => {
            setPerformers(response.data)
        })
        .catch(error => {
            setPerformers([])
        })
        if(!performers) {
            setPerformers([])
        }
    }

    const addPerformer = (performer: Performer) => {
        console.log('addPerformer: ' + performer)
        axios
            .post<Performer>(apiUrl, performer, {
                headers: {
                    'Authorization': authentication.role + " " + authentication.accessToken
                }
            })
            .then((response) => {
                performers!.push(response.data)
                setPerformers(performers)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const updatePerformer = (performer: Performer, id: number) => {
        axios
            .put<Performer>(`${apiUrl}/${id}`, performer, {
                headers: {
                    'Authorization': authentication.role + " " + authentication.accessToken
                }
            })
            .then((response) => {
                console.log('Updated performer: ' + response.data);
                let oldPerformer = performers?.find(performer => performer.id === id)
                if (!oldPerformer) {
                    performers?.push(response.data)
                } else {
                    // updating fields manually
                    oldPerformer.name = response.data.name;
                    oldPerformer.nick = response.data.nick;
                    oldPerformer.surname = response.data.surname;
                    oldPerformer.genre = response.data.genre;
                    oldPerformer.image = response.data.image;
                }
                setPerformers(performers)
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const deletePerformer = (performer: Performer) => {
        axios
            .delete<Performer>(`${apiUrl}/${performer.id}`, {
                headers: {
                    'Authorization': authentication.role + " " + authentication.accessToken
                }
            })
            .then((response) => {
                console.log(response.data);
                setPerformers(performers?.filter(performer => performer.id !== response.data.id))
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const context: PerformersContextType = {
        performers: performers!,
        selectedPerformer: selectedPerformer,
        getAllPerformers: getAllPerformers,
        addPerformer: addPerformer,
        deletePerformer: deletePerformer,
        updatePerformer: updatePerformer,
        selectPerformer: selectPerformer
    }

    return <PerformersContext.Provider value={context}>
        {props.children}
    </PerformersContext.Provider>
}