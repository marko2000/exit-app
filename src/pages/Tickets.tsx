import React from "react";
import {
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
  } from "@ionic/react";
  import NavBar from "../components/navigation/NavBar";
  import TicketCard from "../components/shop/TicketCard";
  import { cartOutline, removeCircleOutline } from "ionicons/icons";
  import Ticket from "../model/Ticket";

  const Tickets: React.FC = () => {
    const group1: Array<Ticket> = [
        {
            id: 1,
            title: "Regular 4-Day Ticket",
            img: "/images/tickets/4.jpg",
            price: 119
        },
        {
            id: 2,
            title: "4-Day Ticket (5 for 4)",
            img: "/images/tickets/4.png",
            price: 95,
        },
        {
            id: 3,
            title: "VIP GOLD 4-Day Ticket",
            img: "/images/tickets/4gold.png",
            price: 300,
        },
        {
            id: 4,
            title: "Regular 2-Day Ticket",
            img: "/images/tickets/1.png",
            price: 34,
        },
        {
            id: 5,
            title: "VIP GOLD Day 2 Ticket",
            img: "/images/tickets/1gold.png",
            price: 100,
        }
    ];
    const group2: Array<Ticket> = [
        {
          id: 6,
          title: "Pre-pitched tent for 1",
          img: "/images/tickets/tent.png",
          price: 55,
        },
        {
          id: 7,
          title: "Pre-pitched tent for 2",
          img: "/images/tickets/tent.png",
          price: 90,
        },
        {
          id: 8,
          title: "Pre-pitched tent for 3",
          img: "/images/tickets/tent.png",
          price: 120,
        },
        {
          id: 9,
          title: "Pre-pitched tent for 4",
          img: "/images/tickets/tent.png",
          price: 135,
        },
        {
          id: 10,
          title: "EXIT Camp",
          img: "/images/tickets/exitcamp.png",
          price: 30,
        },
      ];
      const group3: Array<Ticket> = [
        {
          id: 11,
          title: "Locker @ Camping",
          img: "/images/tickets/locker.png",
          price: 18,
        },
        {
          id: 12,
          title: "Locker @ Festival",
          img: "/images/tickets/lockerFestival.png",
          price: 18,
        },
      ];

      return (
        <IonPage>
            <IonHeader>
                <NavBar />
            </IonHeader>
        <IonContent fullscreen>
            <IonImg src={"/images/tickets.jpeg"} className="img-top"></IonImg>
            <IonGrid className="tickets-grid">
            <IonRow>
                <IonCol className="accordion-group">
                    <IonAccordionGroup>
                        <IonAccordion value="EntryTickets">
                  <IonItem slot="header" color="grey">
                    <IonLabel>Entry tickets</IonLabel>
                  </IonItem>

                  <IonList slot="content">
                    {group1.map((t) => (
                      <TicketCard key={t.id} ticket={t} />
                    ))}
                  </IonList>
                </IonAccordion>
                <br />
                <IonAccordion value="Accommodation">
                  <IonItem slot="header" color="grey">
                    <IonLabel>Accommodation</IonLabel>
                  </IonItem>

                  <IonList slot="content">
                    {group2.map((t) => (
                      <TicketCard key={t.id} ticket={t} />
                    ))}
                  </IonList>
                </IonAccordion>
                <br />
                <IonAccordion value="Add-onServices">
                  <IonItem slot="header" color="grey">
                    <IonLabel>Add-on services</IonLabel>
                  </IonItem>

                  <IonList slot="content">
                    {group3.map((t) => (
                      <TicketCard key={t.id} ticket={t} />
                    ))}
                  </IonList>
                </IonAccordion>
              </IonAccordionGroup>
            </IonCol>
            <IonCol className="side-tickets">
              <IonCard>
                <IonItem color="red">
                  <IonIcon icon={cartOutline} slot="start" />
                  <IonLabel>Added to cart</IonLabel>
                  <IonLabel slot="end">Total: 1000</IonLabel>
                </IonItem>

                <IonCardContent>
                  <IonList>
                    <IonItem>
                      Item1{" "}
                      <IonIcon
                        icon={removeCircleOutline}
                        slot="end"
                        color="red"
                      ></IonIcon>
                    </IonItem>
                    <IonItem>
                      Item2{" "}
                      <IonIcon
                        icon={removeCircleOutline}
                        slot="end"
                        color="red"
                      ></IonIcon>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    )
}

export default Tickets;