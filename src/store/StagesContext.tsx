import React, {createContext, useContext, useState} from "react";
import {useAuthentication} from "./AuthenticationContext";
import Stage from "../model/Stage";
import {addStageApi, deleteStageApi, getAllStagesApi, updateStageApi} from "../api/stagesApi";

type StagesContextType = {
    stages: Array<Stage>;
    selectedStage: Stage | null | undefined;
    addStage: (stage: Stage) => Promise<void> | null;
    deleteStage: (stage: Stage) => Promise<void> | null;
    updateStage: (stage: Stage, id: number) => Promise<void> | null;
    getAllStages: () => void;
    selectStage: (stage: Stage) => void;
};

const StagesContext = createContext<StagesContextType>({
    stages: [],
    selectedStage: null,
    addStage: () => null,
    updateStage: () => null,
    deleteStage: () => null,
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

    const requestConfig: any = {
        headers: {
            'Authorization': authentication.accessToken as string,
        }
    }

    const [stages, setStages] = useState<Array<Stage>>([]);
    const [selectedStage, setSelectedStage] = useState<Stage | null>();

    const selectStage = (stage: Stage) => {
        setSelectedStage(stage);
    };

    const getAllStages = () => {
       getAllStagesApi(requestConfig)
        .then(stages => {
            setStages(stages);
        })
        .catch(error => {
            setStages([]);
        })
    };

    const addStage = (stage: Stage): Promise<void> => {
        return addStageApi(stage, requestConfig)
            .then(stage => setStages([...stages?.concat(stage)]))
    };

    const updateStage = (stage: Stage, id: number): Promise<void> => {
        return updateStageApi(stage, id, requestConfig)
            .then(updatedStage => {
                setStages([...stages?.concat(updatedStage)])
            })
    };

    const deleteStage = (stage: Stage) => {
        return deleteStageApi(stage, requestConfig)
            .then(deletedStage => setStages(stages?.filter(stage => stage.id !== deletedStage.id)))
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
