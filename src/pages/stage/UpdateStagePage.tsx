import React, {useEffect, useState} from "react";
import StandardPageWrapper from "../StandardPageWrapper";
import {useParams} from "react-router";
import {useAuthentication} from "../../store/AuthenticationContext";
import {IonTitle} from "@ionic/react";
import Stage from "../../model/Stage";
import {getStageByIdApi} from "../../api/stagesApi";
import UpdateStageCard from "../../components/stage/admin/UpdateStageCard";
import {StagesProvider} from "../../store/StagesContext";

const UpdateStagePage: React.FC = () => {

    const [stage, setStage] = useState<Stage | null>();
    const authentication = useAuthentication();
    const authorizationHeader = authentication.accessToken as string;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        getStageByIdApi(id as unknown as number, authorizationHeader)
            .then(stage => {
                setStage(stage)
            })
    }, [])

    if (stage)
        return (
            <StagesProvider>
                <StandardPageWrapper>
                    <UpdateStageCard stage={stage}/>
                </StandardPageWrapper>
            </StagesProvider>
        );

    return (
        <StandardPageWrapper>
            <IonTitle>Cannot update selected performer</IonTitle>
        </StandardPageWrapper>
    );
}

export default UpdateStagePage;