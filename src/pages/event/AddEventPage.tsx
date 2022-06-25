import React from "react";
import { EventsProvider } from "../../store/EventsContext";
import StandardPageWrapper from "../StandardPageWrapper";
import { PerformersProvider } from "../../store/PerformersContext";
import { StagesProvider } from "../../store/StagesContext";
import AddEventCard from "../../components/event/admin/AddEventCard";

const EventsPage: React.FC = () => {
    return (
        <EventsProvider>
            <PerformersProvider>
                <StagesProvider>
                    <StandardPageWrapper>
                        <AddEventCard />
                    </StandardPageWrapper>
                </StagesProvider>
            </PerformersProvider>
        </EventsProvider>
    )
}

export default EventsPage;