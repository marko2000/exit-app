import React from "react";
import StandardPageWrapper from "../StandardPageWrapper";
import {StagesProvider} from "../../store/StagesContext";
import AddStageCard from "../../components/stage/admin/AddStageCard";

const AddStagePage: React.FC = () => {
    return (
        <StagesProvider>
            <StandardPageWrapper>
                <AddStageCard/>
            </StandardPageWrapper>
        </StagesProvider>
    );
}

export default AddStagePage;