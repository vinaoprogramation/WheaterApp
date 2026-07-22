import React from "react";

import OpenMeteoApi from "./OpenMeteoApi";
import LocationIqApi from "./LocationIqApi";
import notification from "./Permissions/Notifications";
import location from "./Permissions/Location";
import QuotesAndTranslation from "./QuotesAndTranslation";

export default function Export(){
  return{
    OpenMeteo: OpenMeteoApi,
    LocationIqApi: LocationIqApi,
    Locations: location,
    Notification: notification,
    QuotesAndTranslation: QuotesAndTranslation
  }
};