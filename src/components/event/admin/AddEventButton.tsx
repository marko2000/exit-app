import React from "react";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useHistory } from "react-router";

const AddEventButton = () => {
    const history = useHistory();

    return (
        <IonButton onClick={() => history.push("/events/add")} color="grey" expand={'block'}>
            <IonText>Add new event</IonText>
            <IonIcon icon={addCircle} className="icon-menu" slot="end" />
        </IonButton>
    )
}

export default AddEventButton;