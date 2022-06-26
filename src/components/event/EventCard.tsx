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
    console.log(event)

    const reverse = (value: String) => {
      return value.split("-").reverse().join(".")
    }

    return (
        <>
          <IonCard className="stage-card">
            <IonImg src={event.image} className="img" />
            <IonCardHeader>
              <IonLabel className="event-name" color="grey">
                {event.name}
              </IonLabel>
            </IonCardHeader>
            <IonCardContent className="stage-content">
              <IonLabel className="event-start" color="grey">
                Starts: {reverse(event.start)}
              </IonLabel>
    
              {authentication.authenticatedUser
              && authentication.role ==='admin'
              && <EventCardAdminControls event={event}/>}
    
            </IonCardContent>
            <IonRow className="event-buttons" color="red" id="eventFooter">
              <div>
              <IonModal isOpen={showModalPerformers}>
                <IonButton
                  color="white"
                  size="large"
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
                <IonIcon icon={peopleOutline} className="event-icon" />
                <IonText className="event-tabs">Performers</IonText>
              </IonButton>
              </div>
              <div>
              <IonModal isOpen={showModalStage}>
                <IonButton
                  color="white"
                  size="large"
                  className="button-close-modal"
                  onClick={() => {
                    setShowModalStage(false);
                  }}
                >
                  <IonIcon icon={closeCircleOutline} slot="end" color="grey" />
                </IonButton>
                <StageCard stage={stage} />
              </IonModal>
              <IonButton onClick={() => setShowModalStage(true)} color="grey">
                <IonIcon icon={locationOutline} className="event-icon"></IonIcon>
                <IonText className="event-tabs">{stage.name}</IonText>
              </IonButton>
              </div>
            </IonRow>
          </IonCard>
        </>
      );
}

export default EventCard;