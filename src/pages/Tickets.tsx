import React from "react";
import TicketsProvider from "../store/TicketsContext";
import StandardPageWrapper from "./StandardPageWrapper";
import TicketsPageContent from "../components/shop/TicketsPageContent";

const TicketsPage: React.FC = () => {
    return (
        <StandardPageWrapper>
            <TicketsProvider>
                <TicketsPageContent/>
            </TicketsProvider>
        </StandardPageWrapper>
    );
};

export default TicketsPage;
