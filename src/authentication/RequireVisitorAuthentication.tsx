import React from "react";
import { useLocation, Redirect } from "react-router";
import { useAuthentication } from "../store/AuthenticationContext";

export const RequiredVisitorAuthentication: React.FC<{children: JSX.Element}> = ({children}) => {
    const auth = useAuthentication();
    const location = useLocation();

    if(!auth.authenticatedUser || auth.role !== 'visitor')
    return (
        <Redirect to={{
            pathname: "/login",
            state: { from: location }
        }} />
    );

    return children;
}