import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonLabel, IonRow } from "@ionic/react";
import Stage from "../../model/Stage";
import { cashOutline, locationOutline, peopleOutline } from "ionicons/icons";
import { useAuthentication } from "../../store/AuthenticationContext";
import StageCardAdminControls from "./admin/StageCardAdminControls";

const StageCard: React.FC<{ stage: Stage }> = ({ stage }) => {
    const authentication = useAuthentication();

    return(
            <IonCard className="stage-card">
                <IonImg src={stage.image} className="img" /> 
                <IonCardContent className="stage-content">
                    <IonLabel className="stage-name" color="grey">
                        {stage.name}
                    </IonLabel>
                    {authentication.authenticatedUser && authentication.role === "admin" && (<StageCardAdminControls stage={stage} />)}
                </IonCardContent>
                <IonRow className="social-stage" color="red">
                    <div className="stage-info">
                    <IonIcon icon={peopleOutline} className="icon-stage">
                        {" "}
                    </IonIcon>
                    <IonLabel className="stage-tabs">
                        {stage.capacity}
                    </IonLabel>
                    </div>
                    <div className="stage-info">
                    <IonIcon icon={cashOutline} className="icon-stage" />
                    <IonLabel className="stage-tabs">
                        {stage.sponsor}
                    </IonLabel>
                    </div>
                    <div className="stage-info">
                    <IonIcon icon={locationOutline} className="icon-stage">
                        {" "}
                    </IonIcon>
                    <IonLabel className="stage-tabs">
                        {stage.location}
                    </IonLabel>
                    </div>
                </IonRow>
            </IonCard>
    )
}

export default StageCard;