import React from "react";
import { StagesProvider } from "../store/StagesContext";
import StandardPageWrapper from "./StandardPageWrapper";
import StagePageContent from "../components/stage/StagesPageContent";

const StagesPage: React.FC = () => {
    return (
        <StagesProvider>
            <StandardPageWrapper>
                <StagePageContent />
            </StandardPageWrapper>
        </StagesProvider>
    )
}

export default StagesPage;