import React from "react";
import {IonButton, IonCol, IonGrid, IonIcon, IonRow} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import { useEvents } from "../../../store/EventsContext";
import Event from "../../../model/Event";
import { useHistory } from "react-router";
import { useError } from "../../../store/ErrorContext";

const EventCardAdminControls: React.FC<{event: Event}> = ({event}) => {
    const history = useHistory();
    const {addError} = useError();

    const eventsContext = useEvents();

    const deleteEvent = () => {
        eventsContext.deleteEvent(event)!
            .catch(() => {
                addError("Could not delete event. There are comments on this event.")
            });
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
                <IonCol>
                    <IonButton
                        onClick={() => {
                            history.push(`/events/update/${event.id}`)
                        }}
                        expand={"block"}
                        id="adminControlBtn"
                        >
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