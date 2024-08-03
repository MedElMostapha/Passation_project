// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true
}
let port: '8089';
let ip: 'localhost';

export const genEnp = 'http://' + ip + ':' + port + '/api/rest/';

//creer poour faire des test lors de l'authentification
export const host2 = 'http://' + ip + ':' + port;

