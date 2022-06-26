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
import Footer from "../components/navigation/Footer";

const loginUrl = "http://localhost:8080/auth/login";

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

      <IonContent>
        <IonImg src={"/images/login.jpeg"} className="img-top"></IonImg>

        {/* <IonGrid>
          <IonRow className="login-form">
            <IonCol text-center color="grey"> */}
              <IonList className="auth-form">
                <IonItem className="auth-form-input">
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    clearInput
                  ></IonInput>
                </IonItem>
                <IonItem className="auth-form-input">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonButton color="grey" id="loginBtn" className="auth-button-section" onClick={login}>
                  Login!
                </IonButton>
              </IonList>
            {/* </IonCol>
          </IonRow>
        </IonGrid> */}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Login;
