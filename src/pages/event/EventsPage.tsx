import React from "react";
import { EventsProvider } from "../../store/EventsContext";
import StandardPageWrapper from "../StandardPageWrapper";
import EventsPageContent from "../../components/event/EventsPageContent";
import { PerformersProvider } from "../../store/PerformersContext";
import { StagesProvider } from "../../store/StagesContext";

const EventsPage: React.FC = () => {
    return (
        <EventsProvider>
            <PerformersProvider>
                <StagesProvider>
                    <StandardPageWrapper>
                        <EventsPageContent />
                    </StandardPageWrapper>
                </StagesProvider>
            </PerformersProvider>
        </EventsProvider>
    )
}

export default EventsPage;