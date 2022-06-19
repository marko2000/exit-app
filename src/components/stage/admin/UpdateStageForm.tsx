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
import Stage from "../../../model/Stage";
import {useStages} from "../../../store/StagesContext";
import {useAuthentication} from "../../../store/AuthenticationContext";

const UpdateStageForm: React.FC<{ stage: Stage }> = ({stage}) => {

    const stagesContext = useStages();
    const auth = useAuthentication();

    const nameRef = useRef<HTMLIonInputElement>(null);
    const locationRef = useRef<HTMLIonInputElement>(null);
    const capacityRef = useRef<HTMLIonInputElement>(null);
    const sponsorRef = useRef<HTMLIonInputElement>(null);
    const imageRef = useRef<HTMLIonInputElement>(null);

    const updateStage = () => {
        let newStageValue: Stage = {
            id: stage.id,
            name : nameRef.current!.value! as string,
            location: locationRef.current!.value! as string,
            capacity: capacityRef.current!.value! as number,
            sponsor: sponsorRef.current!.value! as string,
            image: imageRef.current!.value! as string,
            user_id: auth.userId as number
        }

        console.log(newStageValue)
        // delegating CRUD operations to context
        stagesContext.updateStage(newStageValue, stage.id)

    };
    return (
        <IonCard className="updatePerformerCard">
            <IonCardTitle className="updatePerformerTitle">
                <IonToolbar color="grey">Update stage</IonToolbar>
            </IonCardTitle>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="addPerformerCol">
                            <IonItem>
                                <IonLabel position="stacked">Stage name:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerName"
                                    name="name"
                                    ref={nameRef}
                                    // onIonChange={(e) => setName(e.detail.value!)}
                                    clearInput
                                    value={stage.name}
                                ></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Stage location:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerSurname"
                                    name="location"
                                    ref={locationRef}
                                    // onIonChange={(e) => setLocation(e.detail.value!)}
                                    clearInput={true}
                                    value={stage.location}
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="stacked">Stage capacity:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerNickname"
                                    name="capacity"
                                    ref={capacityRef}
                                    // onIonChange={(e) => setCapacity(parseInt(e.detail.value!, 5))}
                                    clearInput
                                    value={stage.capacity + ""}
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="stacked">Sponsor:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addMusicGenre"
                                    name="sponsor"
                                    ref={sponsorRef}
                                    // onIonChange={(e) => setSponsor(e.detail.value!)}
                                    clearInput
                                    value={stage.sponsor}
                                ></IonInput>
                            </IonItem>

                            <IonItem className="addPerformerImg">
                                <IonLabel position="stacked">Image:</IonLabel>
                                <IonInput
                                    type="text"
                                    id="addPerformerImage"
                                    ref={imageRef}
                                    // onIonChange={(e) => setImage(e.detail.value!)}
                                    clearInput
                                    value={stage.image}
                                ></IonInput>
                            </IonItem>
                            <IonButton
                                expand="full"
                                type="submit"
                                onClick={updateStage}
                                color="grey"
                                className="addPerformerCard"
                                id="updatePerformerButton"
                            >
                                Update stage
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default UpdateStageForm;
