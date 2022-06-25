import React, { useState } from "react";
import {IonButton, IonCol, IonGrid, IonIcon, IonModal, IonRow} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import { useEvents } from "../../../store/EventsContext";
import Event from "../../../model/Event";
import UpdateEventCard from "./UpdateEventCard";

const EventCardAdminControls: React.FC<{event: Event}> = ({event}) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [canBeDismissed, setCanBeDismissed] = useState(false)

    const eventsContext = useEvents();

    const deleteEvent = () => {
        eventsContext.deleteEvent(event);
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonButton
                        onClick={deleteEvent}
                        expand={"block"} color={'danger'}>
                        <IonIcon
                            icon={trash}
                            className="table-icon"
                            size="medium"
                        />
                        Delete
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonModal
                    onIonModalDidDismiss={() => setShowModalUpdate(false)}
                    isOpen={showModalUpdate}
                    canDismiss={canBeDismissed}
                >
                    <UpdateEventCard event={event}/>
                    <IonButton
                        color="grey"
                        size="default"
                        onClick={() => {
                            setShowModalUpdate(false);
                            setCanBeDismissed(true)
                        }}
                    >
                        Close
                    </IonButton>
                </IonModal>
                <IonCol>
                    <IonButton
                        onClick={() => {
                            setShowModalUpdate(true)
                            setCanBeDismissed(false)
                        }}
                        expand={"block"}>
                        <IonIcon
                            icon={create}
                            className="table-icon"
                            color="white"
                            size="medium"
                        />
                        Update
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default EventCardAdminControls;