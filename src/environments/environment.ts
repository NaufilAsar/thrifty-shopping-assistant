// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: 'AIzaSyDPI4R8IoUQQZjjElwLDW3llKiK1peh6OQ',
  authDomain: 'thrifty-1a99d.firebaseapp.com',
  projectId: 'thrifty-1a99d',
  storageBucket: 'thrifty-1a99d.appspot.com',
  messagingSenderId: '421983694464',
  appId: '1:421983694464:web:808060d5c95448f20dc065',
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
