import React, { useEffect } from "react";
import { useEvents } from "../../store/EventsContext";
import { IonImg } from "@ionic/react";
import EventList from "./EventList";
import { useAuthentication } from "../../store/AuthenticationContext";
import AddEventButton from "./admin/AddEventButton";

const EventsPageContent = () => {
    const eventsContext = useEvents();
    const authentication = useAuthentication();

    useEffect(() => {
        eventsContext.getAllEvents();
    })

    return (
        <>
            <IonImg src={"/images/events.jpeg"} className="img"></IonImg>
            {authentication.authenticatedUser
                && authentication.role === 'admin'
                && <AddEventButton/>}
            <EventList events={eventsContext.events} />
        </>
    )
}

export default EventsPageContent;