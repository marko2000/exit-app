import React, {useEffect, useState} from "react";
import StandardPageWrapper from "../StandardPageWrapper";
import {useParams} from "react-router";
import {useAuthentication} from "../../store/AuthenticationContext";
import {IonTitle} from "@ionic/react";
import Performer from "../../model/Performer";
import {getPerformerByIdApi} from "../../api/performersApi";
import UpdatePerformerCard from "../../components/performer/admin/UpdatePerformerCard";
import {PerformersProvider} from "../../store/PerformersContext";

const UpdatePerformerPage: React.FC = () => {

    const [performer, setPerformer] = useState<Performer | null>();
    const authentication = useAuthentication();
    const authorizationHeader = authentication.accessToken as string;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        console.log("Performer id")
        console.log(id)
        getPerformerByIdApi(id as unknown as number, authorizationHeader)
            .then(performer => {
                setPerformer(performer)
            })
    }, [])

    if (performer)
        return (
            <PerformersProvider>
                <StandardPageWrapper>
                    <UpdatePerformerCard performer={performer!}/>
                </StandardPageWrapper>
            </PerformersProvider>
        );

    return (
        <StandardPageWrapper>
            <IonTitle>Cannot update selected performer</IonTitle>
        </StandardPageWrapper>
    );
}

export default UpdatePerformerPage;