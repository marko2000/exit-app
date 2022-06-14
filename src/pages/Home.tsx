import {IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonSlide, IonSlides, IonTitle,} from "@ionic/react";
import React from "react";
import NavBar from "../components/navigation/NavBar";
import Footer from "../components/navigation/Footer";

const Home: React.FC = () => {
    const slideOpts = {
        initialSlide: 1,
        speed: 1200,
        loop: true,
        autoplay: {
            delay: 400,
        },
    };


    return (
        <IonPage>
            <IonHeader>
                <NavBar/>
            </IonHeader>

            <IonContent fullscreen className="homePage">
                <IonSlides pager={true} options={slideOpts}>
                    {[1, 2, 3, 4, 5, 6].map(i => {
                        return (<IonSlide key={i}>
                            <IonImg src={`/images/homePage/hp${i}.jpg`} alt={`slide-${i}`}/>
                        </IonSlide>)

                    })}
                </IonSlides>
                <IonTitle color="grey" className="HomePageTitle">
                    Exit App
                </IonTitle>
                <IonGrid className="HomePageText">
                    <IonRow>
                        {/*    here comes counter*/}
                    </IonRow>
                    <IonRow
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}
                    >
                        <IonImg
                            src={"https://www.exitfest.org/wp-content/uploads/2021/12/mob_1080x1650_EXIT-2k22-KV-Copy.jpg"}/>
                    </IonRow>

                </IonGrid>
                <Footer></Footer>
            </IonContent>
        </IonPage>
    );
};

export default Home;