import React from "react";
import { IonList } from "@ionic/react";
import Event from "../../model/Event";
import EventCard from "./EventCard";

const EventList: React.FC<{events: Array<Event>}> = ({events}) => {
    return (
        <IonList>
            {events?.map(event => (
                <EventCard event={event} key={event.id} />
            ))}
        </IonList>
    );
}

export default EventList;