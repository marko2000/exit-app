import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import {useAuthentication} from "./AuthenticationContext";
import Stage from "../model/Stage";

const apiUrl = "http://localhost:8080/api/stages";

type StagesContextType = {
    stages: Array<Stage>;
    selectedStage: Stage | null | undefined;
    addStage: (stage: Stage) => void;
    deleteStage: (stage: Stage) => void;
    updateStage: (stage: Stage, id: number) => void;
    getAllStages: () => void;
    selectStage: (stage: Stage) => void;
};

const StagesContext = createContext<StagesContextType>({
    stages: [],
    selectedStage: null,
    addStage: () => {
    },
    updateStage: () => {
    },
    deleteStage: () => {
    },
    getAllStages: () => {
    },
    selectStage: () => {
    },
});

export const useStages = () => {
    return useContext(StagesContext);
};

export const StagesProvider: React.FC = (props) => {
    const authentication = useAuthentication();

    const [stages, setStages] = useState<Array<Stage>>();
    const [selectedStage, setSelectedStage] = useState<Stage | null>();

    const selectStage = (stage: Stage) => {
        setSelectedStage(stage);
    };

    const getAllStages = () => {
        axios.get<Array<Stage>>(apiUrl)
            .then((response) => {
                console.log('Retrieved stages:')
                console.log(response.data)
                setStages(response.data);
            })
            .catch(error => {
                console.log(error);
                setStages([])
            });
    };

    const addStage = (stage: Stage) => {
        axios
            .post<Stage>(apiUrl, stage, {
                headers: {
                    Authorization:
                        authentication.role + " " + authentication.accessToken,
                },
            })
            .then((response) => {
                console.log("Stage saved; \n" + response.data);
                stages!.push(response.data);
                setStages(stages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateStage = (stage: Stage, id: number) => {
        axios
            .put<Stage>(`${apiUrl}/${id}`, stage, {
                headers: {
                    Authorization:
                        authentication.role + " " + authentication.accessToken,
                },
            })
            .then((response) => {
                console.log("Updated stage: " + response.data);
                let oldStage = stages?.find((stage) => stage.id === id);
                if (!oldStage) {
                    stages?.push(response.data);
                } else {
                    // updating fields manually
                }
                setStages(stages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteStage = (stage: Stage) => {
        axios
            .delete<Stage>(`${apiUrl}/${stage.id}`, {
                headers: {
                    Authorization:
                        authentication.role + " " + authentication.accessToken,
                },
            })
            .then((response) => {
                console.log(response.data);
                setStages(stages?.filter((stage) => stage.id !== response.data.id));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const context: StagesContextType = {
        stages: stages!,
        selectedStage: selectedStage,
        getAllStages: getAllStages,
        addStage: addStage,
        deleteStage: deleteStage,
        updateStage: updateStage,
        selectStage: selectStage,
    };

    return (
        <StagesContext.Provider value={context}>
            {props.children}
        </StagesContext.Provider>
    );
};
