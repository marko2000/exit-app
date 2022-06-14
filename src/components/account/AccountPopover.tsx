import React, {useState} from 'react';
import {IonButton, IonIcon, IonItem, IonList, IonListHeader, IonPopover} from '@ionic/react';
import {logOut, personAddOutline, personCircleOutline, personOutline} from "ionicons/icons";
import {useAuthentication} from "../../store/AuthenticationContext";

export const AccountPopover: React.FC = () => {
    const [showPopover, setShowPopover] = useState(false);
    const authentication = useAuthentication();

    if (authentication.authenticatedUser){
        return (
            <>
                <IonPopover
                    isOpen={showPopover}
                >
                    <IonList>
                        <IonListHeader>Account</IonListHeader>
                        <IonItem  routerLink={"/home"} onClick={() => {
                            setShowPopover(false)
                            authentication.logout()
                        }}>
                            <IonIcon icon={logOut}/>
                            Log-out
                        </IonItem>
                    </IonList>
                </IonPopover>
                <IonButton color={"light"} onClick={() => setShowPopover(true)}>
                    <IonIcon icon={personCircleOutline}/>
                </IonButton>
            </>
        )
    }

    return (
        <>
            <IonPopover
                isOpen={showPopover}
            >
                <IonList>
                    <IonListHeader>Account</IonListHeader>
                    <IonItem button routerLink={"/login"} onClick={() => setShowPopover(false)}>
                        <IonIcon icon={personOutline}/>
                        Sign in
                    </IonItem>
                    <IonItem  routerLink={"/registration"} onClick={() => setShowPopover(false)}>
                        <IonIcon icon={personAddOutline}/>
                        Sign up
                    </IonItem>
                </IonList>
            </IonPopover>
            <IonButton color={"light"} onClick={() => setShowPopover(true)}>
                <IonIcon icon={personCircleOutline}/>
            </IonButton>
        </>
    );
};