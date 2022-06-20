import { IonImg } from "@ionic/react";
import React, {useEffect} from "react";
import { useStages } from "../../store/StagesContext";
import StageList from "./StageList";
import AddStageModal from "./admin/AddStageModal";
import { useAuthentication } from "../../store/AuthenticationContext";

const StagePageContent = () => {
    const stagesContext = useStages();
    const authentication = useAuthentication();

    useEffect(() => {
        stagesContext.getAllStages();
    }, []);

    return (
        <>
            <IonImg src={"/images/stages.jpeg"} className="img" />
            {authentication.authenticatedUser && authentication.role === "admin" && <AddStageModal />}
            <StageList stages={stagesContext.stages} />
        </>
    )
}

export default StagePageContent;