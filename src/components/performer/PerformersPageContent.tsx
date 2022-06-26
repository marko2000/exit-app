import React, {useEffect, useState} from "react";
import { IonImg, IonSearchbar } from "@ionic/react";
import PerformerList from "./PerformerList";
import { usePerformers } from "../../store/PerformersContext";
import AddPerformerModal from "./admin/AddPerformerModal";
import { useAuthentication } from "../../store/AuthenticationContext";
import Footer from "../navigation/Footer";

const PerformersPageContent = () => {
    const performersContext = usePerformers();
    const authentication = useAuthentication();

    const [searchCondition, setSearchCondition] = useState("");

    let displayedPerformers = searchCondition ? performersContext.performers.filter(performer => performer.name.includes(searchCondition) || performer.surname.includes(searchCondition) || performer.nick.includes(searchCondition) || performer.genre.includes(searchCondition)) : performersContext.performers

    useEffect(() => {
        performersContext.getAllPerformers();
    }, []);

    return (
        <>
            <IonImg src={"/images/performers.jpeg"} />
            {authentication.authenticatedUser && authentication.role === "ROLE_ADMIN" && <AddPerformerModal />}
            <IonSearchbar value={searchCondition} onIonChange={e => setSearchCondition(e.detail.value!.trim())} />
            <PerformerList performers={displayedPerformers} />
            <Footer />
        </>
    )
}

export default PerformersPageContent;