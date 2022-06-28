import React from "react";
import {IonCard, IonCardContent, IonIcon, IonImg, IonLabel, IonRow,} from "@ionic/react";
import Stage from "../../model/Stage";
import {cashOutline, locationOutline, peopleOutline} from "ionicons/icons";
import {useAuthentication} from "../../store/AuthenticationContext";
import StageCardAdminControls from "./admin/StageCardAdminControls";

const StageCard: React.FC<{
  stage: Stage;
}> = ({ stage }) => {
  const authentication = useAuthentication();
  return (
      <IonCard className="stage-card">
        <IonImg src={stage.image} className="img"></IonImg>
        <IonCardContent className="stage-content">
          <br />
          <IonLabel className="stage-name" color="grey">
            {stage.name}
          </IonLabel>

          {authentication.authenticatedUser &&
            authentication.role === "ROLE_ADMIN" && (
              <StageCardAdminControls stage={stage} />
            )}
        </IonCardContent>
        <IonRow className="social-stage" color="red">
          <IonIcon icon={peopleOutline} className="icon-stage">
            {" "}
          </IonIcon>
          <IonLabel className="stage-tabs">{stage.capacity}</IonLabel>
          <IonIcon icon={cashOutline} className="icon-stage"></IonIcon>
          <IonLabel className="stage-tabs" id="stagetabsSponsor">
            {stage.sponsor}
          </IonLabel>
          <IonIcon icon={locationOutline} className="icon-stage"></IonIcon>{" "}
          <IonLabel className="stage-tabs-location">{stage.location}</IonLabel>
        </IonRow>
      </IonCard>
  );
};

export default StageCard;
