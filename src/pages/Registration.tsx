import {
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRouterLink,
} from "@ionic/react";
import React, {useState} from "react";
import NavBar from "../components/navigation/NavBar";
import User from "../model/User";
import {useAuthentication} from "../store/AuthenticationContext";
import {useHistory} from "react-router";
import {useError} from "../store/ErrorContext";

const DEFAULT_ROLE = "visitor"; //admini su upanpred registrovani, tako da neko ko se sam registruje može da bude samo sa ulogom visitor

const Registration: React.FC = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const authContext = useAuthentication();
    const history = useHistory();
    const {addError} = useError()

    function register() {
        const user: User = {
            name: firstname + " " + lastname,
            email: userEmail,
            username: userEmail,
            password: password,
            role: DEFAULT_ROLE
        }

        authContext.register(user)
            ?.then(() => history.push("/home"))
            .catch(error => addError("Registration failed: " + error))
    }

    return (
        <IonPage>
            <IonHeader>
                <NavBar/>
            </IonHeader>

            <IonContent fullscreen>
                <IonImg src={"/images/registration.jpeg"} className="imgTop"></IonImg>

                <IonList className="registrationForm" color="grey">
                    <IonItem className="registrationFormInput">
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput
                            value={firstname}
                            onIonChange={(e) => setFirstname(e.detail.value!)}
                            clearInput
                            color="success"
                        ></IonInput>
                    </IonItem>
                    <IonItem className="registrationFormInput">
                        <IonLabel position="floating">Lastname</IonLabel>
                        <IonInput
                            value={lastname}
                            onIonChange={(e) => setLastname(e.detail.value!)}
                            clearInput
                        ></IonInput>
                    </IonItem>
                    <IonItem className="registrationFormInput">
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                            value={userEmail}
                            onIonChange={(e) => setUserEmail(e.detail.value!)}
                            clearInput
                        ></IonInput>
                    </IonItem>
                    <IonItem className="registrationFormInput">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                        ></IonInput>
                    </IonItem>

                    <IonButton color="grey" id="registerBtn" onClick={register}>
                        Register!
                    </IonButton>
                    <IonRouterLink href={"/login"} id="registerLabel">
                        Already have an account?
                    </IonRouterLink>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Registration;
