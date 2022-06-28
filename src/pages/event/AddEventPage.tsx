import React from "react";
import AddEventCard from "../../components/event/admin/AddEventCard";
import {EventsProvider} from "../../store/EventsContext";
import StandardPageWrapper from "../StandardPageWrapper";

const AddEventPage: React.FC = () => {
    return (
        <EventsProvider>
            <StandardPageWrapper>
                <AddEventCard/>
            </StandardPageWrapper>
        </EventsProvider>
    );
}

export default AddEventPage;