import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonModal,
  IonText,
  IonToolbar,
} from "@ionic/react";
import AddPerformer from "./AddPerformer";
import { addCircle, closeCircleOutline } from "ionicons/icons";

const AddPerformerModal: React.FC = () => {
    const [showModalAdd, setShowModalAdd] = useState(false);
  
    return (
      <IonToolbar color="light">
        <IonModal
            onDidDismiss={() => setShowModalAdd(false)}
            isOpen={showModalAdd}>
          <IonButton
            color="white"
            size="large"
            className="button-close-modal"
            slot="end"
            onClick={() => setShowModalAdd(false)}
          >
            <IonIcon icon={closeCircleOutline} color="grey" size={'large'}/>
          </IonButton>
          <AddPerformer />
        </IonModal>
        <IonButton
          onClick={() => setShowModalAdd(true)}
          color="grey"
          expand={"block"}
        >
          <IonText>Add new performer</IonText>
          <IonIcon icon={addCircle} className="icon-menu" slot="end"></IonIcon>
        </IonButton>
      </IonToolbar>
    );
  };
  
  export default AddPerformerModal;
  