import React, { useEffect, useRef, useState } from "react";
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardHeader,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonSelect,
    IonSelectOption,
  } from "@ionic/react";
  import { useAuthentication } from "../../../store/AuthenticationContext";
  import Stage from "../../../model/Stage";
  import Event from "../../../model/Event";
import { useStages } from "../../../store/StagesContext";
import { usePerformers } from "../../../store/PerformersContext";
import { useEvents } from "../../../store/EventsContext";
import { useHistory } from "react-router";

const AddEventCard: React.FC = () => {
    const [name, setName] = useState<string>();
    const [start, setStart] = useState<string>();
    const [image, setImage] = useState<string>();
    const [stage, setStage] = useState<Stage>();
    const performersRef = useRef<HTMLIonSelectElement>(null)

    const authentication = useAuthentication();
    const stagesContext = useStages();
    const eventsContext = useEvents();
    const performersContext = usePerformers();

    const history = useHistory();

    useEffect(() => {
        stagesContext.getAllStages();
        console.log(stagesContext.stages)

        performersContext.getAllPerformers();
        console.log(performersContext.performers)
    }, [])

    const addEvent = () => {
        let newEvent: Event = {
            id: 0,
            image: image!,
            name: name!,
            start: start!,
            stage: stage!,
            performers: performersRef.current!.value,
            user_id: authentication.userId || Math.floor(Math.random() * 10)
        }

        console.log('New event:')
        console.log(newEvent)
        eventsContext.addEvent(newEvent);

        history.goBack();
    }

    return (
        <IonCard>
          <IonCardHeader color={'grey'}>
            <IonCardTitle className="ion-text-center">
              Add event
            </IonCardTitle>
          </IonCardHeader>
    
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol className="add-performe-col">
                  <IonItem>
                    <IonLabel position="floating">Event name:</IonLabel>
                    <IonInput
                      type="text"
                      id="add-performer-name"
                      name="name"
                      onIonChange={(e) => setName(e.detail.value!)}
                      clearInput
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Event starts:</IonLabel>
                    <IonInput
                      type="text"
                      id="add-performer-surname"
                      name="start"
                      onIonChange={(e) => setStart(e.detail.value!)}
                      clearInput
                    ></IonInput>
                  </IonItem>
    
                  <IonItem>
                    <IonLabel position="floating">Select stage for event</IonLabel>
                    <IonSelect
                      name="stage"
                      onIonChange={(e) => setStage(e.detail.value!)}
                    >
                      {stagesContext.stages &&
                        stagesContext.stages.map((stage, index) => (
                          <IonSelectOption value={stage} key={index}>
                            {stage.name}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Select performer(s) for event</IonLabel>
                    <IonSelect
                        name="performers"
                        multiple
                        ref={performersRef}
                    >
                      {performersContext.performers &&
                          performersContext.performers.map((performer, index) => (
                              <IonSelectOption value={performer} key={index}>
                                {performer.name}
                              </IonSelectOption>
                          ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem className="add-performer-img">
                    <IonLabel position="floating">Event image:</IonLabel>
    
                    <IonInput
                      type="text"
                      id="add-performer-image"
                      onIonChange={(e) => setImage(e.detail.value!)}
                      clearInput
                    ></IonInput>
                  </IonItem>
                  <IonButton
                    expand="block"
                    type="submit"
                    onClick={addEvent}
                    color="grey"
                    className="ion-margin-top"
                  >
                    Add event
                  </IonButton>
                  <IonButton
                      expand="block"
                      type="submit"
                      onClick={() => history.goBack()}
                      color="grey"
                      className="add-performer-card"
                  >
                    Cancel
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      );
}

export default AddEventCard;