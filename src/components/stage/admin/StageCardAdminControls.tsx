import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
} from "@ionic/react";
import { closeCircleOutline, create, trash } from "ionicons/icons";
import Stage from "../../../model/Stage";
import { useStages } from "../../../store/StagesContext"
import UpdateStageForm from "./UpdateStageForm";

const PerformerCardAdminControls: React.FC<{
  stage: Stage;
}> = ({ stage }) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const stagesContext = useStages();

  return (
    <IonGrid>
        <IonCol>
          <IonButton
            onClick={() => stagesContext.deleteStage(stage)}
            expand={"block"}
            color={"danger"}
          >
            <IonIcon icon={trash} className="table-icon" size="medium" />
            Delete
          </IonButton>
        </IonCol>
      <IonRow>
        <IonModal
          onIonModalDidDismiss={() => setShowModalUpdate(false)}
          isOpen={showModalUpdate}
        >
          <IonButton
            color="white"
            size="large"
            className="button-close-modal"
            onClick={() => setShowModalUpdate(false)}
          >
            <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
          </IonButton>
          <UpdateStageForm stage={stage} />
        </IonModal>
        <IonCol>
          <IonButton onClick={() => setShowModalUpdate(true)} expand={"block"}>
            <IonIcon
              icon={create}
              className="table-icon"
              color="white"
              size="medium"
            />
            Update
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PerformerCardAdminControls;
