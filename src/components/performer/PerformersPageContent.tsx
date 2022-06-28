import React, {useEffect, useState} from "react";
import { IonImg, IonSearchbar } from "@ionic/react";
import PerformerList from "./PerformerList";
import { usePerformers } from "../../store/PerformersContext";
import AddPerformerButton from "./admin/AddPerformerButton";
import { useAuthentication } from "../../store/AuthenticationContext";
import Footer from "../navigation/Footer";
import { useError } from "../../store/ErrorContext";
import ErrorNotification from "../error/ErrorNotification";

const PerformersPageContent = () => {
    const performersContext = usePerformers();
    const authentication = useAuthentication();
    const {error} = useError();

    const [searchCondition, setSearchCondition] = useState("");

    let displayedPerformers = searchCondition ? performersContext.performers.filter(performer => performer.name.includes(searchCondition) || performer.surname.includes(searchCondition) || performer.nick.includes(searchCondition) || performer.genre.includes(searchCondition)) : performersContext.performers

    useEffect(() => {
        performersContext.getAllPerformers();
    }, []);

    return (
        <>
            {error && <ErrorNotification />}
            <IonImg src={"/images/performers.jpeg"} />
            {authentication.authenticatedUser && authentication.role === "ROLE_ADMIN" && <AddPerformerButton />}
            <IonSearchbar value={searchCondition} onIonChange={e => setSearchCondition(e.detail.value!.trim())} />
            <PerformerList performers={displayedPerformers} />
            <Footer />
        </>
    )
}

export default PerformersPageContent;