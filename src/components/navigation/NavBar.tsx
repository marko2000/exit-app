import React, { useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoTiktok,
  logoWhatsapp,
  logoYoutube,
} from "ionicons/icons";
import { AccountPopover } from "../account/AccountPopover";

const NavBar: React.FC = () => {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 760,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 760px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  return (
    <div>
      <IonToolbar color="gradient" className="toolbar-social">
        <IonRow slot="end">
          <a href="https://www.facebook.com/exit.festival" target="_blank" rel="noreferrer">
            <IonIcon icon={logoFacebook} className="social-icon"></IonIcon>
          </a>
          <a href="https://www.youtube.com/user/EXITFestivalTV" target="_blank" rel="noreferrer">
            {" "}
            <IonIcon icon={logoYoutube} className="social-icon"></IonIcon>
          </a>
          <a href="https://instagram.com/exitfestival" target="_blank" rel="noreferrer">
            {" "}
            <IonIcon icon={logoInstagram} className="social-icon"></IonIcon>
          </a>
          <a href="https://www.tiktok.com/@exit_festival" target="_blank" rel="noreferrer">
            {" "}
            <IonIcon icon={logoTiktok} className="social-icon"></IonIcon>
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
            {" "}
            <IonIcon icon={logoWhatsapp} className="social-icon"></IonIcon>
          </a>
        </IonRow>
      </IonToolbar>

      <IonToolbar color="red">
        <IonTitle size="large" slot="start" id="headerTitle">
          <IonRouterLink color={"light"} href={"/home"}>
            <b>EXIT</b>
          </IonRouterLink>
        </IonTitle>

        {mQuery && !mQuery.matches ? (
          <IonButtons slot="end">
            <IonMenuButton />
            <AccountPopover />
          </IonButtons>
        ) : (
          <>
            <IonButtons>
              <IonButton routerLink={"/stages"}>
                <b>Stages </b>
              </IonButton>
              <IonButton routerLink={"/performers"}>
                <b>Performers </b>
              </IonButton>
              <IonButton routerLink={"/events"}>
                <b>Events </b>
              </IonButton>
              <IonButton routerLink={"/tickets"} slot="end">
                <b>Tickets</b>
              </IonButton>

              <AccountPopover />
            </IonButtons>
          </>
        )}
      </IonToolbar>
    </div>
  );
};

export default NavBar;
