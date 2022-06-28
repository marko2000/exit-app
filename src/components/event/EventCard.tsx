import React, {useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
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
    chatboxEllipsesOutline,
    locationOutline,
    peopleOutline,
  } from "ionicons/icons";
import StageCard from "../stage/StageCard";
import PerformersList from "../performer/PerformerList";
import { useAuthentication } from "../../store/AuthenticationContext";
import EventCardAdminControls from "./admin/EventCardAdminControls";
import CommentSection from "./CommentSection";

const EventCard: React.FC<{event: Event}> = ({event}) => {
    const [showModalStage, setShowModalStage] = useState(false);
    const [showModalPerformers, setShowModalPerformers] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const [alert] = useIonAlert();

    const authentication = useAuthentication();

    const reverse = (value: String) => {
      return value.split("-").reverse().join(".")
    }

    return (
      <>
      <div className="scrollable">
        <IonCard className="stage-card">
          <IonImg src={event.image} className="img" />
          <IonCardHeader className="picture">
            <IonLabel className="eventName" color="grey">
              {event.name}
            </IonLabel>
          </IonCardHeader>
          <IonCardContent className="stage-content">
            <IonLabel className="event-start" color="grey">
              Starts: {reverse(event.start)}
            </IonLabel>
  
            {authentication.authenticatedUser &&
              authentication.role === "ROLE_ADMIN" && (
                <EventCardAdminControls event={event} />
              )}
          </IonCardContent>

          <IonRow className="event-buttons" color="red" id="eventFooter">
              <div>
                <IonModal isOpen={showModalPerformers}>
                  <div className="scrollable">
                    <PerformersList performers={event.performers} />
                  </div>
                  <IonButton
                    color="grey"
                    //className="buttonCloseModal"
                    onClick={() => {
                      setShowModalPerformers(false);
                    }}
                  >
                    Close
                  </IonButton>
                </IonModal>
                <IonButton
                  onClick={() => {
                    if (!event.performers || event.performers.length === 0) {
                      alert({
                        cssClass: "styles",
                        header: "Alert",
                        message: "No performers added for this event",
                        buttons: ["Ok"],
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
                <IonModal isOpen={showModalStage} className="scrollable">
                  <StageCard stage={event.stage} />
                  <IonButton
                    color="grey"
                    //className="buttonCloseModal"
                    slot="end"
                    onClick={() => {
                      setShowModalStage(false);
                    }}
                  >
                    Close
                  </IonButton>
                </IonModal>
                <IonButton onClick={() => setShowModalStage(true)} color="grey">
                  <IonIcon icon={locationOutline} className="event-icon"></IonIcon>
                  <IonText className="event-tabs" id="eventCardbutton">
                    {event.stage.name}
                  </IonText>
                </IonButton>
              </div>
              <IonCol className="commentsBox">
                <IonModal isOpen={showModalComments} className="scrollable">
                  <CommentSection event={event} />
                  <IonButton
                    color="grey"
                    // className="buttonCloseModal"
                    onClick={() => {
                      setShowModalComments(false);
                    }}
                  >
                    Close
                  </IonButton>
                </IonModal>
                <IonButton
                  onClick={() => {
                    setShowModalComments(true);
                  }}
                  color="grey"
                  expand={"block"}
                >
                  <IonIcon
                    icon={chatboxEllipsesOutline}
                    className="iconMenu"
                  ></IonIcon>
                  <IonText className="eventtabs"> Comments</IonText>
                </IonButton>
              </IonCol>
            </IonRow>
        </IonCard>
        </div>
      </>
    );
  }

export default EventCard;