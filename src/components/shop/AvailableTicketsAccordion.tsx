import React, {useEffect} from "react";
import {
    IonAccordion, IonAccordionGroup, IonButton,
    IonCol,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonRow,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import TicketCard from "./TicketCard";
import {useTickets} from "../../store/TicketsContext";
import {useStages} from "../../store/StagesContext";
import Ticket from "../../model/Ticket";
import Stage from "../../model/Stage";
import {useAuthentication} from "../../store/AuthenticationContext";
import {useError} from "../../store/ErrorContext";

const AvailableTicketsAccordion: React.FC = () => {
    const ticketsContext = useTickets();
    const stagesContext = useStages();
    const auth = useAuthentication();
    const {addError} = useError()


    useEffect(() => {
        stagesContext.getAllStages();
        if (auth.userId)
            ticketsContext.getAllTicketsOfUser(auth.userId);
        else
            addError("User not authenticated, cannot buy ticket")
    }, []);

    function addToCart(ticket: Ticket) {
        ticketsContext.addToCart(ticket);
    }

    function setTicketStage(ticket: Ticket, stage: Stage) {
        ticket.stage = stage;
    }

    return (
        <IonAccordionGroup>
            <IonAccordion value="EntryTickets">
                <IonItem slot="header" color="grey">
                    <IonLabel>Entry tickets</IonLabel>
                </IonItem>

                <IonList slot="content">
                    {ticketsContext.availableTickets.map((ticket) => (
                        <IonItemGroup key={ticket.id}>
                            <TicketCard key={ticket.id} ticket={ticket} stages={stagesContext.stages}/>
                            <IonRow id="ticketStage">
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">
                                            Select stage for event
                                        </IonLabel>
                                        <IonSelect
                                            name="stage"
                                            onIonChange={(e) =>
                                                setTicketStage(ticket, e.detail.value!)
                                            }
                                        >
                                            {stagesContext.stages?.map((stage, index) => (
                                                    <IonSelectOption value={stage} key={index}>
                                                        {stage.name}
                                                    </IonSelectOption>
                                                ))}
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonButton
                                        color="red"
                                        size="default"
                                        id="addToCartBtn"
                                        onClick={() => addToCart(ticket)}
                                    >
                                        Add to cart
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonItemGroup>
                    ))}
                </IonList>
            </IonAccordion>
            <br/>
        </IonAccordionGroup>
    );
}

export default AvailableTicketsAccordion;