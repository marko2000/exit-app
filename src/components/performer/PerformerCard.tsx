import React from "react";
import {
    IonCard,
    IonCardHeader,
    IonCol,
    IonIcon,
    IonImg,
    IonLabel,
    IonRow,
  } from "@ionic/react";
  import Performer from "../../model/Performer";
  import { logoFacebook, logoInstagram, logoTwitter } from "ionicons/icons";
  import { useAuthentication } from "../../store/AuthenticationContext";
  import PerformerCardAdminControls from "./admin/PerformerCardAdminControls";

  const PerformerCard: React.FC<{
    performer: Performer;
  }> = ({ performer }) => {
    const authentication = useAuthentication();
  
    return (
      <IonCard className="performer-card">
        <IonImg src={performer.image} className="img" />
        <IonCardHeader>
          <IonLabel className="performer-nick" color="grey">
            {performer.nick}
          </IonLabel>
          <br />
          <IonLabel className="performer-name" slot="end">
            {performer.name} {performer.surname}
          </IonLabel>
          <br />
          <IonLabel>Genre: {performer.genre}</IonLabel>
          </IonCardHeader>
          {authentication.authenticatedUser &&
            authentication.role === "admin" && (
              <PerformerCardAdminControls performer={performer} />
            )}
        <IonRow className="social" color="red">
          <IonCol>
            <IonIcon icon={logoFacebook} className="social-icon"></IonIcon>
          </IonCol>
          <IonCol>
            <IonIcon icon={logoInstagram} className="social-icon"></IonIcon>
          </IonCol>
          <IonCol>
            <IonIcon icon={logoTwitter} className="social-icon"></IonIcon>
          </IonCol>
        </IonRow>
      </IonCard>
    );
  };
  
  export default PerformerCard;
  