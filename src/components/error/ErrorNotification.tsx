import React from "react";
import {IonAlert} from "@ionic/react";
import {useError} from "../../store/ErrorContext";

const ErrorNotification: React.FC = () => {
  const {error, removeError} = useError()
  return (
      <IonAlert
          isOpen={!!error}
          onDidDismiss={removeError}
          header={'Error'}
          message={error!}
          buttons={['OK']}
      />
  );
}

export default ErrorNotification