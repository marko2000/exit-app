import React from "react";
import {IonContent, IonHeader, IonPage} from "@ionic/react";
import NavBar from "../components/navigation/NavBar";

const StandardPageWrapper : React.FC = (props) => {
  return (
      <IonPage>
          <IonHeader>
              <NavBar/>
          </IonHeader>
          <IonContent>
              {props.children}
          </IonContent>
      </IonPage>
  );
}

export default StandardPageWrapper;