import React, { useRef } from "react";
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
import { useAuthentication } from "../../../store/AuthenticationContext";
import { usePerformers } from "../../../store/PerformersContext";
import Performer from "../../../model/Performer";
import { useHistory } from "react-router";

const AddPerformerModal = () => {

    const nameRef = useRef<HTMLIonInputElement>(null);
    const surnameRef = useRef<HTMLIonInputElement>(null);
    const nickRef = useRef<HTMLIonInputElement>(null);
    const genreRef = useRef<HTMLIonInputElement>(null);
    const imageRef = useRef<HTMLIonInputElement>(null);


    const authentication = useAuthentication();
    const performersContext = usePerformers();

    const [present] = useIonAlert();
    const history = useHistory();

    function addPerformer() {
        let newPerformer: Performer = {
            id: 0,
            name: nameRef.current!.value! as string,
            surname: surnameRef.current!.value! as string,
            nick: nickRef.current!.value! as string,
            genre: genreRef.current!.value! as string,
            image: imageRef.current!.value! as string,
            user_id: authentication.userId!,
        };
        if (
            newPerformer.name === "" ||
            newPerformer.surname === "" ||
            newPerformer.nick === "" ||
            newPerformer.genre === "" ||
            newPerformer.image === ""
        ) {
            present(" You must fill all required information.", [{text: "Ok"}]);
            return;
        }
        performersContext.addPerformer(newPerformer)

        present(
            newPerformer.name + " " + newPerformer.surname + " added successfully",
            [{text: "Ok"}]
        );
        history.goBack();
    }

    return (
        <IonCard>
            <IonCardTitle className="addPerformerTitle">
                <IonToolbar color="grey">Add performer</IonToolbar>
            </IonCardTitle>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="addPerformerCol">
                            <IonItem>
                                <IonLabel position="floating">Performer name:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerName"
                                    name="name"
                                    ref={nameRef}
                                    clearInput
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Performer surname:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerSurname"
                                    name="surname"
                                    ref={surnameRef}
                                    clearInput
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">Performer nickname:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerNickname"
                                    name="nickname"
                                    ref={nickRef}
                                    clearInput
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">Music genre:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addMusicGenre"
                                    name="genre"
                                    ref={genreRef}
                                    clearInput
                                ></IonInput>
                            </IonItem>

                            <IonItem className="addPerformerImg">
                                <IonLabel position="floating">Image:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerImage"
                                    ref={imageRef}
                                    clearInput
                                ></IonInput>
                            </IonItem>
                            <IonButton
                                expand="full"
                                type="submit"
                                onClick={addPerformer}
                                color="grey"
                                className="addPerformerCard"
                            >
                                Add performer
                            </IonButton>
                            <IonButton
                                expand="full"
                                type="submit"
                                onClick={() => history.goBack()}
                                color="grey"
                                className="addPerformerCard"
                                id="updatePerformerButton"
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
  
  export default AddPerformerModal;
  