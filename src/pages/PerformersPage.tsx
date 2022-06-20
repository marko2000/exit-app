import React from "react";
import { PerformersProvider } from "../store/PerformersContext";
import StandardPageWrapper from "./StandardPageWrapper";
import PerformersPageContent from "../components/performer/PerformersPageContent";

const PerformersPage: React.FC = () => {
    return (
        <PerformersProvider>
            <StandardPageWrapper>
                <PerformersPageContent/>
            </StandardPageWrapper>
        </PerformersProvider>
    );
};

export default PerformersPage;
