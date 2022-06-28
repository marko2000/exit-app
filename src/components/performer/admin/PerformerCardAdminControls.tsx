import React, {useState} from "react";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonModal,
    IonRow,
  } from "@ionic/react";
  import { closeCircleOutline, create, trash } from "ionicons/icons";
  import Performer from "../../../model/Performer";
  import { usePerformers } from "../../../store/PerformersContext";
  import UpdatePerformerCard from "./UpdatePerformerCard";
  import { useHistory } from "react-router";
  import { useError } from "../../../store/ErrorContext";

  const PerformerCardAdminControls: React.FC<{
    performer: Performer;
  }> = ({ performer }) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
  
    const performersContext = usePerformers();
    const {addError} = useError();

    const history = useHistory();
  
    const deletePerformer = () => {
      performersContext.deletePerformer(performer)
        ?.catch(() => addError("Could not delete performer. \nPossible reasons: \n Performer is on existing event."));
    };

    return (
      <IonGrid>
          <IonCol>
            <IonButton
              onClick={deletePerformer}
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
              slot="end"
              onClick={() => setShowModalUpdate(false)}
            >
              <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
            </IonButton>
            <UpdatePerformerCard performer={performer} />
          </IonModal>
          <IonCol>
            <IonButton onClick={() => history.push(`performers/update/${performer.id}`)} expand={"block"}>
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
  