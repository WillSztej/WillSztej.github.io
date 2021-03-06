// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gmapkey: 'AIzaSyBtHmFxyxUCmlF64cjvaDie0xvR1HGTQ_Y',
  firebaseConfig: {
    apiKey: 'AIzaSyBtHmFxyxUCmlF64cjvaDie0xvR1HGTQ_Y',
    authDomain: 'web-hydrate.firebaseapp.com',
    databaseURL: 'https://web-hydrate.firebaseio.com',
    projectId: 'web-hydrate',
    storageBucket: 'web-hydrate.appspot.com',
    messagingSenderId: '734409488963',
    appId: '1:734409488963:web:a8ce3bc146d1fafc52f2f6',
    measurementId: 'G-W6R9BQWFLX'
  },
  mainMapStyle: [
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.school',
      elementType: 'geometry.fill',
      stylers: [
        {
          lightness: 30
        }
      ]
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
