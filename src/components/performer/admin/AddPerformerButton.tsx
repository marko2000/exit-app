import {
    IonButton,
    IonIcon,
    IonText
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

const AddPerformer: React.FC<{}> = () => {
    const history = useHistory();

    return (
        <IonButton
        onClick={() => history.push("/performers/add")}
        color="grey"
        expand={"block"}
      >
        <IonText>Add new performer</IonText>
        <IonIcon icon={addCircle} className="iconMenu" slot="end"></IonIcon>
      </IonButton>
    );
};

export default AddPerformer;
