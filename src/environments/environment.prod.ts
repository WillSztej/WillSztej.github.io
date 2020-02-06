export const environment = {
  production: true,
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
