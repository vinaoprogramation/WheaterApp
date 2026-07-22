import 'dotenv/config';

export default {
  "expo": {
    "name": "WheatherAPP",
    "slug": "WheatherAPP",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      },
      "package": "com.liuhtad.WheatherAPP",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-image"
    ],
    "extra": {
      "eas": {
        "projectId": "7bfe4b8b-8a1c-4b23-b7e5-f6884393acde"
      }
    }
  }
}
