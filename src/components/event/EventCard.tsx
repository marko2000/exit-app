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
        <IonCard className="eventCard">
          <IonImg src={event.image} className="img" />
          <IonCardHeader className="picture"></IonCardHeader>
          <IonCardContent className="stageContent">
            <br />
            <IonLabel className="eventName" color="grey">
              {event.name}
            </IonLabel>
            <IonLabel className="eventStart" color="grey">
              <b>Starts:</b> {reverse(event.start)}
            </IonLabel>
  
            {authentication.authenticatedUser &&
              authentication.role === "ROLE_ADMIN" && (
                <EventCardAdminControls event={event} />
              )}
          </IonCardContent>
          <IonGrid id="eventFooter">
            <IonRow className="social" color="red">
              <IonCol>
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
                  <IonIcon icon={peopleOutline} className="iconMenu"></IonIcon>
                  <IonText className="eventtabs">Performers</IonText>
                </IonButton>
              </IonCol>
  
              <IonCol>
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
                  <IonIcon icon={locationOutline} className="iconMenu"></IonIcon>
                  <IonText className="eventtabs" id="eventCardbutton">
                    {event.stage.name}
                  </IonText>
                </IonButton>
              </IonCol>
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
          </IonGrid>
        </IonCard>
        </div>
      </>
    );
  }

export default EventCard;