import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonModal,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { addCircle, closeCircleOutline } from "ionicons/icons";
import AddStage from "./AddStage";

const AddStageModal: React.FC = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  return (
    <IonToolbar>
      <IonModal
          onDidDismiss={() => setShowModalAdd(false)}
          isOpen={showModalAdd}>
        <IonButton
          color="white"
          size="large"
          className="button-close-modal"
          onClick={() => {
            setShowModalAdd(false);
          }}
        >
          <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
        </IonButton>
        <AddStage />
      </IonModal>
      <IonButton
        onClick={() => setShowModalAdd(true)}
        color="grey"
        expand={"block"}
      >
        <IonText>Add new stage</IonText>
        <IonIcon icon={addCircle} className="icon-menu" slot="end"></IonIcon>
      </IonButton>
    </IonToolbar>
  );
};

export default AddStageModal;
