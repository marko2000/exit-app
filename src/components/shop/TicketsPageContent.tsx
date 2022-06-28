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
            <IonImg src={"/images/tickets.jpeg"} className="img-top"></IonImg>
            <IonGrid className="tickets-grid">
                <IonRow>
                    <IonCol className="accordion-group">
                        <AvailableTicketsAccordion/>
                    </IonCol>
                    <IonCol className="side-tickets">
                        <CartCard/>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
}

export default TicketsPageContent;