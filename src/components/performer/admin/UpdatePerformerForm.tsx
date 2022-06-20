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
import React, {useEffect, useRef} from "react";
import Performer from "../../../model/Performer";
import { usePerformers } from "../../../store/PerformersContext";
import { useAuthentication } from "../../../store/AuthenticationContext";

const UpdatePerformerForm: React.FC<{ performer: Performer }> = ({performer}) => {

    const authentication = useAuthentication();

    const performersContext = usePerformers();

    useEffect(() => {
        console.log('Printing performer in UpdatePerformerModal: ' + performer.id)
    }, []);


    const nameRef = useRef<HTMLIonInputElement>(null);
    const surnameRef = useRef<HTMLIonInputElement>(null);
    const imageRef = useRef<HTMLIonInputElement>(null);
    const nickRef = useRef<HTMLIonInputElement>(null);
    const genreRef = useRef<HTMLIonInputElement>(null);

    function updatePerformer() {
        // todo: validation necessary
        let updatedPerformer: Performer = {
            id: performer.id,
            name: nameRef.current!.value ? nameRef.current!.value as string : performer.name,
            surname: surnameRef.current!.value ? surnameRef.current!.value as string : performer.surname,
            image: imageRef.current!.value ? imageRef.current!.value as string : performer.image,
            nick: nickRef.current!.value ? nickRef.current!.value as string : performer.nick,
            music_genre: genreRef.current!.value ? genreRef.current!.value as string : performer.music_genre,
            user_id: authentication.userId ||
                Math.floor(Math.random() * 10),
        };

        performersContext.updatePerformer(updatedPerformer, updatedPerformer.id)
    }

    return (
        <IonCard className="update-performer-card">
            <IonCardTitle className="update-performer-title">
                <IonToolbar color="grey">Update performer</IonToolbar>
            </IonCardTitle>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="add-performer-col">
                            <IonItem>
                                <IonLabel position="stacked">Performer name:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerName"
                                    name="name"
                                    ref={nameRef}
                                    // onIonChange={(e) => setName(e.detail.value!)}
                                    clearInput
                                    value={performer.name}
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Performer surname:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerSurname"
                                    name="surname"
                                    ref={surnameRef}
                                    // onIonChange={(e) => setLastname(e.detail.value!)}
                                    clearInput
                                    value={performer.surname}
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="stacked">Performer nickname:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerNickname"
                                    name="nickname"
                                    ref={nickRef}
                                    // onIonChange={(e) => setNick(e.detail.value!)}
                                    clearInput
                                    value={performer.nick}
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="stacked">Music genre:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addMusicGenre"
                                    name="genre"
                                    ref={genreRef}
                                    // onIonChange={(e) => setGenre(e.detail.value!)}
                                    clearInput
                                    value={performer.music_genre}
                                ></IonInput>
                            </IonItem>

                            <IonItem className="add-performer-img">
                                <IonLabel position="stacked">Image:</IonLabel>

                                <IonInput
                                    type="text"
                                    id="addPerformerImage"
                                    ref={imageRef}
                                    // onIonChange={(e) => setImage(e.detail.value!)}
                                    clearInput
                                    value={performer.image}
                                ></IonInput>
                            </IonItem>
                            <IonButton
                                expand="full"
                                type="submit"
                                onClick={updatePerformer}
                                color="grey"
                                className="add-performer-card"
                                id="updatePerformerButton"
                            >
                                Update performer
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default UpdatePerformerForm;
