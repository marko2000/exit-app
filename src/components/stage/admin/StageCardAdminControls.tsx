import React from "react";
import {IonButton, IonCol, IonGrid, IonIcon, IonRow,} from "@ionic/react";
import {create, trash} from "ionicons/icons";
import Stage from "../../../model/Stage";
import {useStages} from "../../../store/StagesContext";
import {useHistory} from "react-router-dom";
import {useError} from "../../../store/ErrorContext";

const PerformerCardAdminControls: React.FC<{
  stage: Stage;
}> = ({ stage }) => {

  const stagesContext = useStages();
  const history = useHistory();
  const {addError} = useError()


  return (
    <IonGrid>
      <IonCol>
        <IonButton
          onClick={() => {
            stagesContext.deleteStage(stage)?.catch(() => addError("Could not delete stage. There is a reference to this stage by Event or Ticket."));
          }}
          expand={"block"}
          color={"danger"}
          id="adminControlsBtn"
        >
          <IonIcon icon={trash} className="table-icon" size="medium" />
          Delete
        </IonButton>
      </IonCol>
      <IonRow>
        <IonCol>
          <IonButton
            id="adminControlsBtn"
            onClick={() => history.push(`/stages/update/${stage.id}`)}
            expand={"block"}
          >
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
