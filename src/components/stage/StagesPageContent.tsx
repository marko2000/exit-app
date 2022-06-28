import {IonImg} from "@ionic/react";
import React, {useEffect} from "react";
import {useStages} from "../../store/StagesContext";
import StageList from "./StageList";
import AddStageButton from "./admin/AddStageButton";
import {useAuthentication} from "../../store/AuthenticationContext";
import ErrorNotification from "../error/ErrorNotification";
import {useError} from "../../store/ErrorContext";

const StagesPageContent = () => {
    const stagesContext = useStages();
    const authentication = useAuthentication();
    const {error} = useError()

    useEffect(() => {
        stagesContext.getAllStages();
    }, []);

    return (
        <>
            {error && <ErrorNotification/>}
            <IonImg src={"/images/stages.jpeg"} className="img"/>
            {authentication.authenticatedUser &&
                authentication.role === "ROLE_ADMIN" && <AddStageButton/>}
            <StageList stages={stagesContext.stages}/>
        </>
    );
};

export default StagesPageContent;
