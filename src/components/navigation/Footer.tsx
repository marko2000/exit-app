import React, { useEffect } from "react";
import {
  IonCol,
  IonIcon,
  IonImg,
  IonRouterLink,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoTiktok,
  logoTwitter,
  logoYoutube,
} from "ionicons/icons";

const Footer: React.FC = () => {
  // const [mQuery, setMQuery] = React.useState<any>({
  //   matches: window.innerWidth > 760,
  // });

  // useEffect(() => {
  //   let mediaQuery = window.matchMedia("(min-width: 760px)");
  //   mediaQuery.addListener(setMQuery);

  //   return () => mediaQuery.removeListener(setMQuery);
  // }, []);

  type Item = {
    src: string;
    link: string;
  };
  const sponsors1: Item[] = [
    {
      src: "https://www.exitfest.org/wp-content/uploads/2019/04/VRS_logo_2019.svg",
      link: "https://www.srbija.gov.rs/",
    },

    {
      src: "	https://www.exitfest.org/wp-content/uploads/2018/03/mts.svg",
      link: "https://mts.rs/",
    },
    {
      src: "	https://www.exitfest.org/wp-content/uploads/2019/01/Heineken-2019.svg",
      link: "https://www.instagram.com/heineken/",
    },
    {
      src: "		https://www.exitfest.org/wp-content/uploads/2020/02/VISA_logo_res-01.svg",
      link: "https://rs.visa.com/",
    },
  ];
  const sponsors2: Item[] = [
    {
      src: "https://www.exitfest.org/wp-content/uploads/2020/02/guarana-logo-2020-new-exit-01.svg",
      link: "https://www.guarana.rs/",
    },
    {
      src: "https://www.exitfest.org/wp-content/uploads/2020/03/idea-logo-2020-new-padding-01.svg",
      link: "https://www.idea.rs/",
    },

    {
      src: "https://www.exitfest.org/wp-content/uploads/2020/04/RTS_logo_inverted_new-01.svg",
      link: "https://www.rts.rs/",
    },
    {
      src: "	https://www.exitfest.org/wp-content/uploads/2020/11/logo-etep.svg",
      link: "https://esns-exchange.eu/",
    },
  ];
  const social: Item[] = [
    {
      src: logoFacebook,
      link: "https://www.facebook.com/exit.festival",
    },
    {
      src: logoTwitter,
      link: "https://twitter.com/exitfestival",
    },

    {
      src: logoYoutube,
      link: "https://www.youtube.com/user/EXITFestivalTV",
    },
    {
      src: logoInstagram,
      link: "https://instagram.com/exitfestival",
    },
    {
      src: logoTiktok,
      link: "https://www.tiktok.com/@exit_festival",
    },
  ];

  return (
    <div id="footer">
      <IonToolbar color="grey">
        <div className="content-footer">
          <IonText className="title-footer">Sponsors</IonText>
          <IonRow className="footer-row-logos">
            {sponsors1.map((image, i) => (
              <IonCol key={i} className="footer-img">
                <a href={image.link} target="_blank" rel="noreferrer">
                  <IonImg src={image.src} />
                </a>
              </IonCol>
            ))}
          </IonRow>
          <IonRow className="footer-row-logos">
            {sponsors2.map((image, i) => (
              <IonCol key={i} className="footer-img">
                <a href={image.link} target="_blank" rel="noreferrer">
                  <IonImg src={image.src} />
                </a>
              </IonCol>
            ))}
          </IonRow>
          <IonText className="title-footer">FOLLOW US</IonText>
          <IonRow className="footer-row-logos">
            {social.map((image, i) => (
              <IonCol key={i} className="footer-social">
                <a href={image.link} target="_blank" rel="noreferrer">
                  <IonIcon icon={image.src} className="social-icon-footer" />
                </a>
              </IonCol>
            ))}
          </IonRow>
          <IonText className="title-footer">LINKS</IonText>
          <IonRow className="footer-link-pages">
            <IonCol>
              <IonRouterLink color={"light"} href={"/home"} id="link">
                <b>HOME</b>
              </IonRouterLink>
            </IonCol>
            <IonCol>
              <IonRouterLink color={"light"} href={"/performers"} id="link">
                <b>PERFORMERS</b>
              </IonRouterLink>
            </IonCol>
            <IonCol>
              <IonRouterLink color={"light"} href={"/stages"} id="link">
                <b>STAGES</b>
              </IonRouterLink>
            </IonCol>
            <IonCol>
              <IonRouterLink color={"light"} href={"/events"} id="link">
                <b>EVENTS</b>
              </IonRouterLink>
            </IonCol>
            <IonCol>
              <IonRouterLink color={"light"} href={"/tickets"} id="link">
                <b>TICKETS</b>
              </IonRouterLink>
            </IonCol>
            <IonCol>
              <IonRouterLink color={"light"} href={"/registration"} id="link">
                <b>REGISTRATION</b>
              </IonRouterLink>
            </IonCol>
          </IonRow>
          <IonRow className="footer-logo">
              <IonImg
                class="footer-logo-img"
                src="https://www.exitfest.org/wp-content/uploads/2021/07/exit-logo-2022.svg"
              />
          </IonRow>
          <IonText className="copyright">
            ?? 2022 EXIT Team. All rights reserved. By visiting this website you
            accept the terms and conditions found in
            <a href="/home"> Terms of Use </a>
            as well as our <a href="/home">Policy Privacy</a>.
          </IonText>
        </div>
      </IonToolbar>
    </div>
  );
};

export default Footer;
