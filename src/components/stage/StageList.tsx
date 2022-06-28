import React, {useEffect} from "react";
import {IonList} from "@ionic/react";
import StageCard from "./StageCard";
import {useStages} from "../../store/StagesContext";
import Stage from "../../model/Stage";

const StageList: React.FC<{
    stages: Stage[]
}> = ({stages}) => {
    const stageContext = useStages();

    useEffect(() => {
        if (!stageContext.stages || stageContext.stages.length < 1)
            stageContext.getAllStages();
    }, [])

    return (
        <IonList>
            {stages?.map(stage => <StageCard key={stage.id} stage={stage}/>)}
        </IonList>
    );
}
export default StageList;