import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonToolbar,
  useIonAlert
} from "@ionic/react";
import React, {useState} from "react";
import {useAuthentication} from "../../../store/AuthenticationContext";
import {useHistory} from "react-router";
import {useStages} from "../../../store/StagesContext";
import Stage from "../../../model/Stage";
import {useError} from "../../../store/ErrorContext";

const AddStageCard = () => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [sponsor, setSponsor] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const authentication = useAuthentication();
  const history = useHistory();
  const [present] = useIonAlert();
  const stagesContext = useStages();
  const {addError} = useError()


  function addStage() {
      let newStage: Stage = {
          id: 0,
          name: name,
          location: location,
          capacity: capacity,
          sponsor: sponsor,
          image: image,
          user_id: authentication.userId!,
      };
      if (
          newStage.name === "" ||
          newStage.location === "" ||
          newStage.capacity === null ||
          newStage.capacity < 1 ||
          newStage.sponsor === "" ||
          newStage.image === ""
      ) {
          present(" You must fill all required information.", [{text: "Ok"}]);
          return;
      }

      stagesContext.addStage(newStage)?.catch(() => addError("Could not add new stage. Check all input data"));
      present(newStage.name + " added successfully", [{text: "Ok"}]);
      history.goBack();
  }

  return (
      <IonCard>
          <IonCardTitle className="add-performer-title">
              <IonToolbar color="grey">Add stage</IonToolbar>
          </IonCardTitle>

          <IonCardContent>
              <IonGrid>
                  <IonRow>
                      <IonCol className="add-performer-col">
                          <IonItem>
                              <IonLabel position="floating">Name:</IonLabel>
                              <IonInput
                                  type="text"
                                  id="addPerformerName"
                                  name="name"
                                  onIonChange={(e) => setName(e.detail.value!)}
                                  clearInput
                              ></IonInput>
                          </IonItem>
                          <IonItem>
                              <IonLabel position="floating">Location:</IonLabel>
                              <IonInput
                                  type="text"
                                  id="addPerformerSurname"
                                  name="location"
                                  onIonChange={(e) => setLocation(e.detail.value!)}
                                  clearInput
                              ></IonInput>
                          </IonItem>

                          <IonItem>
                              <IonLabel position="floating">Capacity:</IonLabel>
                              <IonInput
                                  type="text"
                                  id="addPerformerNickname"
                                  name="capacity"
                                  onIonChange={(e) => {
                                      if (e.detail.value === undefined) return;
                                      setCapacity(parseInt(e.detail.value!, 5));
                                  }}
                                  clearInput
                              ></IonInput>
                          </IonItem>

                          <IonItem>
                              <IonLabel position="floating">Sponsor:</IonLabel>
                              <IonInput
                                  type="text"
                                  id="addMusicGenre"
                                  name="sponsor"
                                  onIonChange={(e) => setSponsor(e.detail.value!)}
                                  clearInput
                              ></IonInput>
                          </IonItem>

                          <IonItem className="add-performer-img">
                              <IonLabel position="floating">Image:</IonLabel>

                              <IonInput
                                  type="text"
                                  id="addPerformerImage"
                                  onIonChange={(e) => setImage(e.detail.value!)}
                                  clearInput
                              ></IonInput>
                          </IonItem>
                          <IonButton
                              expand="full"
                              type="submit"
                              onClick={addStage}
                              color="grey"
                              className="add-performer-card"
                          >
                              Add stage
                          </IonButton>
                          <IonButton
                              expand="full"
                              type="submit"
                              onClick={() => history.goBack()}
                              color="grey"
                              className="add-performer-card"
                          >
                              Cancel adding
                          </IonButton>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonCardContent>
      </IonCard>
  );
}

export default AddStageCard