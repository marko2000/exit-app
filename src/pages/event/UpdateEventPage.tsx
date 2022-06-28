import React, {useEffect, useState} from "react";
import {EventsProvider} from "../../store/EventsContext";
import StandardPageWrapper from "../StandardPageWrapper";
import UpdateEventCard from "../../components/event/admin/UpdateEventCard";
import {useParams} from "react-router";
import {getEventByIdApi} from "../../api/eventsApi";
import {useAuthentication} from "../../store/AuthenticationContext";
import Event from "../../model/Event";
import {IonTitle} from "@ionic/react";

const UpdateEventPage: React.FC = () => {

    const [event, setEvent] = useState<Event | null>();
    const authentication = useAuthentication();
    const authorizationHeader = authentication.accessToken as string;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        getEventByIdApi(id as unknown as number, authorizationHeader)
            .then(event => {
                setEvent(event)
            })
    }, [])

    if (event)
        return (
            <EventsProvider>
                <StandardPageWrapper>
                    <UpdateEventCard event={event!}/>
                </StandardPageWrapper>
            </EventsProvider>
        );

    return (
        <StandardPageWrapper>
            <IonTitle>Event for update not available</IonTitle>
        </StandardPageWrapper>
    );
}

export default UpdateEventPage;