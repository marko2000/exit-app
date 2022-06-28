import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, {useState} from "react";
import NavBar from "../components/navigation/NavBar";
import {useAuthentication,} from "../store/AuthenticationContext";
import {useHistory, useLocation} from "react-router-dom";
import {useError} from "../store/ErrorContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const context = useAuthentication();
  const history = useHistory();
  const location = useLocation();
  const {addError} = useError()

  function login() {
    if (!location.state) location.state = { from: { pathname: "/" } };

    context.login(username!, password!)
        ?.then(() => history.goBack())
        .catch(error => addError("Login failed: " + error))
  }

  return (
    <IonPage>
      <IonHeader>
        <NavBar />
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={"/images/login.jpeg"} className="imgTop"></IonImg>

        <IonGrid>
          <IonRow className="loginForm">
            <IonCol text-center color="grey">
              <IonList>
                <IonItem className="registrationFormInput">
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
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

                <IonButton color="grey" id="loginBtn" onClick={login}>
                  Login!
                </IonButton>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
