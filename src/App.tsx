import {Redirect, Route} from "react-router-dom";
import {IonApp, IonRouterOutlet, setupIonicReact} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import { AuthenticationProvider } from "./store/AuthenticationContext";
import { RequiredVisitorAuthentication } from "./authentication/RequireVisitorAuthentication";
import Home from "./pages/Home";
import Menu from "./components/navigation/Menu";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import StagesPage from "./pages/StagesPage";
import AddStage from "./components/stage/admin/AddStage";
import PerformersPage from "./pages/PerformersPage";
import UpdatePerformerForm from "./components/performer/admin/UpdatePerformerForm";
import EventsPage from "./pages/event/EventsPage";
import AddEventPage from "./pages/event/AddEventPage";
import Tickets from "./pages/Tickets";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/styles.css";
import React from "react";
import ErrorProvider from "./store/ErrorContext";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <AuthenticationProvider>
            <ErrorProvider>
                <IonReactRouter>
                    <Menu></Menu>
                    <IonRouterOutlet id="main">
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/stages" component={StagesPage} />
                        <Route exact path="/performers" component={PerformersPage} />
                        <Route exact path="/events" component={EventsPage} />
                        <Route exact path="/registration" component={Registration}/>
                        <Route exact path="/login" component={Login}/>
                        <RequiredVisitorAuthentication>
                            <>
                                <Route exact path="/tickets" component={Tickets} />
                            </>
                        </RequiredVisitorAuthentication>
                        <Route exact path="/stages/add" component={AddStage}/>
                        <Route exact path="/events/add" component={AddEventPage}/>
                        <Route exact path="/performers/update/:id" component={UpdatePerformerForm}/>
                        <Route exact path="/events/update/:id" component={UpdatePerformerForm}/>
                    </IonRouterOutlet>
                </IonReactRouter>
            </ErrorProvider>
        </AuthenticationProvider>
    </IonApp>

);

export default App;
