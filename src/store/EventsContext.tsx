import React, { createContext, useContext, useState } from "react";
import { useAuthentication } from "./AuthenticationContext";
import Event from "../model/Event";
import { addEventApi, deleteEventApi, getAllEventsApi, getEventByIdApi, updateEventApi } from "../api/eventsApi";

type EventsContextType = {
    events: Array<Event>;
    addEvent: (event: Event) => void;
    deleteEvent: (event: Event) => void;
    updateEvent: (event: Event, id: number) => void;
    getAllEvents: () => void;
    getEventById: (id: number, authorizationHeader: string) => void;
}

const EventsContext = createContext<EventsContextType>({
    events: [],
    addEvent: () => {},
    updateEvent: () => {},
    deleteEvent: () => {},
    getAllEvents: () => {},
    getEventById: () => {}
})

export const useEvents = () => {
    return useContext(EventsContext)
}

export const EventsProvider: React.FC = (props) => {
    const authentication = useAuthentication();
    const authorizationHeader = authentication.role + " " + authentication.accessToken;

    const [events, setEvents] = useState<Array<Event>>();

    const getAllEvents = () => {
        getAllEventsApi().then(retrievedEvents => {
            if (!retrievedEvents) {
                console.log("Could not retrieve all events")
                setEvents([])
                return
            }
            console.log("retrieved events in context")
            console.log(retrievedEvents)
            setEvents(retrievedEvents)
        })
    }

    const addEvent = (event: Event) => {
        addEventApi(event, authorizationHeader).then(addedEvent => {
            if (!addedEvent) {
                console.log("Failed to add event: " + event.name)
                return
            }
            console.log(addedEvent)
            events!.push(addedEvent)
            setEvents(events)
        })
    }

    const updateEvent = (event: Event, id: number) => {
        updateEventApi(event, id, authorizationHeader).then(updatedEvent => {
            if (!updatedEvent) {
                console.log("Failed to update event: " + event.name)
                return
            }
            
            let oldEvent = events?.find(event => event.id === id)
            if(!oldEvent) {
                events?.push(updatedEvent)
            }
            setEvents(events)
        })
    }

    const deleteEvent = (event: Event) => {
        deleteEventApi(event, authorizationHeader).then(deletedEvent => {
            if(deletedEvent)
            setEvents(events?.filter(event => event.id !== deletedEvent.id))
        })
    }

    const context: EventsContextType = {
        events: events!,
        getAllEvents: getAllEvents,
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent,
        getEventById: getEventByIdApi
    }

    return <EventsContext.Provider value={context}>
        {props.children}
    </EventsContext.Provider>
}