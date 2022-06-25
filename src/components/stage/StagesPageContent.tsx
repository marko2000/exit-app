import React, {useEffect, useState} from "react";
import { IonImg, IonSearchbar } from "@ionic/react";
import { useStages } from "../../store/StagesContext";
import StageList from "./StageList";
import AddStageModal from "./admin/AddStageModal";
import { useAuthentication } from "../../store/AuthenticationContext";

const StagePageContent = () => {
    const stagesContext = useStages();
    const authentication = useAuthentication();

    const [searchCondition, setSearchCondition] = useState("");

    let displayedStages = searchCondition ? stagesContext.stages.filter(stage => stage.name.includes(searchCondition) || stage.sponsor.includes(searchCondition) || stage.location.includes(searchCondition)) : stagesContext.stages

    useEffect(() => {
        stagesContext.getAllStages();
    }, []);

    return (
        <>
            <IonImg src={"/images/stages.jpeg"} className="img" />
            {authentication.authenticatedUser && authentication.role === "admin" && <AddStageModal />}
            <IonSearchbar value={searchCondition} onIonChange={e => setSearchCondition(e.detail.value!.trim())} />
            <StageList stages={displayedStages} />
        </>
    )
}

export default StagePageContent;