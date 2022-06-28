import {IonButton, IonIcon, IonText,} from "@ionic/react";
import React from "react";
import {useHistory} from "react-router";
import {addCircle} from "ionicons/icons";

const AddStageButton: React.FC<{}> = () => {
    const history = useHistory();


    return (
        <IonButton
            onClick={() => history.push("/stages/add")}
            color="grey"
            expand={"block"}
        >
            <IonText>Add new stage</IonText>
            <IonIcon icon={addCircle} className="iconMenu" slot="end"></IonIcon>
        </IonButton>
    );
};

export default AddStageButton;