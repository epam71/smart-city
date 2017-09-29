// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC16yJhExYL0GRY54Si4mV0sBCl_0x4Q-4",
    authDomain: "smart-city-lviv17.firebaseapp.com",
    databaseURL: "https://smart-city-lviv17.firebaseio.com",
    projectId: "smart-city-lviv17",
    storageBucket: "smart-city-lviv17.appspot.com",
    messagingSenderId: "658462850719"
  }
};
