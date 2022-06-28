import React from "react";
import {IonCol, IonGrid, IonImg, IonRow} from "@ionic/react";
import CartCard from "./CartCard";
import AvailableTicketsAccordion from "./AvailableTicketsAccordion";
import {useError} from "../../store/ErrorContext";
import ErrorNotification from "../error/ErrorNotification";

const TicketsPageContent: React.FC = () => {
    const {error} = useError()

    return (
        <>
            {error && <ErrorNotification/>}
            <IonImg src={"/images/tickets.jpeg"} className="imgTop"></IonImg>
            <IonGrid className="ticketsGrid">
                <IonRow>
                    <IonCol className="accordionGroup">
                        <AvailableTicketsAccordion/>
                    </IonCol>
                    <IonCol className="sideTickets">
                        <CartCard/>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
}

export default TicketsPageContent;