import { IonImg } from "@ionic/react";
import React, {useEffect} from "react";
import PerformerList from "./PerformerList";
import { usePerformers } from "../../store/PerformersContext";
import AddPerformerModal from "./admin/AddPerformerModal";
import { useAuthentication } from "../../store/AuthenticationContext";

const PerformersPageContent = () => {
    const performersContext = usePerformers();
    const authentication = useAuthentication();

    useEffect(() => {
        performersContext.getAllPerformers();
    }, []);

    return (
        <>
            <IonImg src={"/images/performers.jpeg"} />
            {authentication.authenticatedUser && authentication.role === "admin" && <AddPerformerModal />}
            <PerformerList performers={performersContext.performers} />
        </>
    )
}

export default PerformersPageContent;