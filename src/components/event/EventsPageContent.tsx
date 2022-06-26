import React, { useEffect, useState } from "react";
import { useEvents } from "../../store/EventsContext";
import { IonImg, IonSearchbar } from "@ionic/react";
import EventList from "./EventList";
import { useAuthentication } from "../../store/AuthenticationContext";
import AddEventButton from "./admin/AddEventButton";
import Footer from "../navigation/Footer";

const EventsPageContent = () => {
    const eventsContext = useEvents();
    const authentication = useAuthentication();

    const [searchCondition, setSearchCondition] = useState("");

    let displayEvents = searchCondition ? eventsContext.events.filter(events => events.name.includes(searchCondition) || events.stage.name.includes(searchCondition) || events.start.includes(searchCondition)) : eventsContext.events

    useEffect(() => {
        eventsContext.getAllEvents();
    }, [])

    return (
        <>
            <IonImg src={"/images/events.jpeg"} className="img"></IonImg>
            {authentication.authenticatedUser
                && authentication.role === 'ROLE_ADMIN'
                && <AddEventButton/>}
            <IonSearchbar value={searchCondition} onIonChange={e => setSearchCondition(e.detail.value!.trim())} />
            <EventList events={displayEvents} />
            <Footer />
        </>
    )
}

export default EventsPageContent;