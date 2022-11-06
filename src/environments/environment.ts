// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: 'AIzaSyBhMqZuaWJOh5ftKD_-9V0Tqr8M8XoB_R4',
  authDomain: 'thrifty-shopping-assistant.firebaseapp.com',
  projectId: 'thrifty-shopping-assistant',
  storageBucket: 'thrifty-shopping-assistant.appspot.com',
  messagingSenderId: '884016081747',
  appId: '1:884016081747:web:ecf4840da822105c854fa6',
};

export const environment = {
  production: false,
  firebase: firebaseConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
