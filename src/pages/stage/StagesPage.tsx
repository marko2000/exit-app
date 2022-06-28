import React from "react";
import {StagesProvider} from "../../store/StagesContext";
import StandardPageWrapper from "../StandardPageWrapper";
import StagesPageContent from "../../components/stage/StagesPageContent";

const StagesPage: React.FC = () => {
    return (
        <StagesProvider>
            <StandardPageWrapper>
                <StagesPageContent/>
            </StandardPageWrapper>
        </StagesProvider>
    );
}

export default StagesPage;
