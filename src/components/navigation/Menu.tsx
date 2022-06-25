import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  flameOutline,
  globeOutline,
  homeOutline,
  personCircleOutline,
  playCircleOutline,
  ticketOutline,
} from "ionicons/icons";
import React from "react";

const Menu: React.FC = () => {
  return (
    <IonMenu side="end" contentId="main">
      <IonHeader>
        <IonToolbar color="red">
          <IonTitle>MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/home"} routerDirection="none">
              <IonIcon icon={homeOutline} className="icon-menu" slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/registration"} routerDirection="none">
              <IonIcon
                icon={personCircleOutline}
                className="icon-menu"
                slot="start"
              />
              <IonLabel>Registration</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/performers"} routerDirection="none">
              <IonIcon icon={globeOutline} className="icon-menu" slot="start" />
              <IonLabel>Performers</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/stages"} routerDirection="none">
              <IonIcon
                icon={playCircleOutline}
                className="icon-menu"
                slot="start"
              />
              <IonLabel>Stages</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/events"} routerDirection="none">
              <IonIcon icon={flameOutline} className="icon-menu" slot="start" />
              <IonLabel>Events</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/tickets"} routerDirection="none">
              <IonIcon icon={ticketOutline} className="icon-menu" slot="start" />
              <IonLabel>Tickets</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
