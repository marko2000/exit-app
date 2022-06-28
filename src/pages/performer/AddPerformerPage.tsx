import React from "react";
import StandardPageWrapper from "../StandardPageWrapper";
import {PerformersProvider} from "../../store/PerformersContext";
import AddPerformerCard from "../../components/performer/admin/AddPerformerCard";

const AddPerformerPage: React.FC = () => {
    return (
        <PerformersProvider>
            <StandardPageWrapper>
                <AddPerformerCard/>
            </StandardPageWrapper>
        </PerformersProvider>
    );
}

export default AddPerformerPage;