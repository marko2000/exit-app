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
} from "@ionic/react";
import React, {useRef} from "react";
import Performer from "../../../model/Performer";
import { useAuthentication } from "../../../store/AuthenticationContext";
import { usePerformers } from "../../../store/PerformersContext";

const AddPerformer: React.FC<{}> = () => {
    const nameRef = useRef<HTMLIonInputElement>(null)
    const surnameRef = useRef<HTMLIonInputElement>(null)
    const nickRef = useRef<HTMLIonInputElement>(null)
    const genreRef = useRef<HTMLIonInputElement>(null)
    const imageRef = useRef<HTMLIonInputElement>(null)

    const authentication = useAuthentication();
    const performersContext = usePerformers();

    function addPerformer() {
        let newPerformer: Performer = {
            id: 0,
            name: nameRef.current!.value! as string,
            surname: surnameRef.current!.value! as string,
            nick: nickRef.current!.value! as string,
            genre: genreRef.current!.value! as string,
            image: imageRef.current!.value! as string,
            user_id: authentication.userId! as number
        }
        console.log(newPerformer)
        performersContext.addPerformer(newPerformer);
    }

    return (
        <IonCard>
            <IonCardTitle className="add-performer-title">
                <IonToolbar color="grey">Add performer</IonToolbar>
            </IonCardTitle>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="add-performer-col">
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

                            <IonItem className="add-performer-img">
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
                                className="add-performer-card"
                            >
                                Add performer
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default AddPerformer;
