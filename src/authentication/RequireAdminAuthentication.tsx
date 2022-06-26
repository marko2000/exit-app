import React from "react";
import { Redirect } from "react-router";
import { useAuthentication } from "../store/AuthenticationContext";

export const RequiredAdminAuthentication: React.FC<{children: JSX.Element}> = ({children}) => {
    const auth = useAuthentication();

    if(!auth.authenticatedUser || auth.role !== 'ROLE_ADMIN') return <Redirect to="/login" />

    return children;
}