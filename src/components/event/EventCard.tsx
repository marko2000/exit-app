import React, {useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonImg,
    IonLabel,
    IonModal,
    IonRow,
    IonText,
    useIonAlert,
  } from "@ionic/react";
import Event from "../../model/Event";
import {
    closeCircleOutline,
    locationOutline,
    peopleOutline,
  } from "ionicons/icons";
import StageCard from "../stage/StageCard";
import PerformersList from "../performer/PerformerList";
import { useAuthentication } from "../../store/AuthenticationContext";
import EventCardAdminControls from "./admin/EventCardAdminControls";

const EventCard: React.FC<{event: Event}> = ({event}) => {
    const stage = event.stage;
    const performers = event.performers;
    const [showModalStage, setShowModalStage] = useState(false);
    const [showModalPerformers, setShowModalPerformers] = useState(false);
    const [alert] = useIonAlert();

    const authentication = useAuthentication();

    return (
        <>
          <IonCard className="stageCard">
            <IonImg src={event.image} className="img"></IonImg>
            <IonCardHeader className="picture">
            </IonCardHeader>
            <IonCardContent className="stageContent">
              <br />
              <IonLabel className="eventName" color="grey">
                {event.name}
              </IonLabel>
              <IonLabel className="eventStart" color="grey">
                <b>Starts:</b> {event.start.substring(0, event.start.indexOf("T"))}
              </IonLabel>
    
              {authentication.authenticatedUser
              && authentication.role ==='admin'
              && <EventCardAdminControls event={event}/>}
    
            </IonCardContent>
            <IonRow className="social" color="red" id="eventFooter">
              <IonModal isOpen={showModalPerformers}>
                <IonButton
                  color="white"
                  size="large"
                  className="buttonCloseModal"
                  slot="end"
                  onClick={() => {
                    setShowModalPerformers(false);
                  }}
                >
                  <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
                </IonButton>
                <PerformersList performers={event.performers} />
              </IonModal>
              <IonButton
                onClick={() => {
                  if (performers[0] == null) {
                    setShowModalPerformers(false);
                    alert({
                      cssClass: "styles",
                      header: "Alert",
                      message: "No performers added",
                      buttons: [
                        "Cancel",
                        { text: "Ok", handler: (d) => console.log("ok pressed") },
                      ],
                      onDidDismiss: (e) => console.log("did dismiss"),
                    });
                  } else setShowModalPerformers(true);
                }}
                color="grey"
              >
                <IonIcon icon={peopleOutline} className="iconMenu"></IonIcon>
                <IonText className="eventtabs">Performers</IonText>
              </IonButton>
    
              <IonModal isOpen={showModalStage}>
                <IonButton
                  color="white"
                  size="large"
                  className="buttonCloseModal"
                  onClick={() => {
                    setShowModalStage(false);
                  }}
                >
                  <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
                </IonButton>
                <StageCard stage={stage} />
              </IonModal>
              <IonButton onClick={() => setShowModalStage(true)} color="grey">
                <IonIcon icon={locationOutline} className="iconMenu"></IonIcon>
                <IonText className="eventtabs">{stage.name}</IonText>
              </IonButton>
            </IonRow>
          </IonCard>
        </>
      );
}

export default EventCard;