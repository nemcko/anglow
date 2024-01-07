# Anglow

## Development server
Development TypeScript server designed for fullstack development of applications based on JavaScript. Server consisting of two independent parts, Angular with  [signals](https://angular.io/guide/signals#angular-signals) frontend and NodeJS backend. Npm can start the frondend together or in the case of debugging with the need to restart the frondend and the backend server separately.

Angular transpiles TypeScript files using the Webpack module bundler into ES2022 modules. The backend is transpiled using TypeScript by the tsc compiler into ESNext modules for the NodeJS server. The server's data persistence was ensured by using a lightweight [Lowdb](https://github.com/typicode/lowdb) NoSQL database.

Command `npm run start` starts both frontend and backend servers. The server for the frontend runs at the url http://localhost:4200, the server for the backend listens at localhost:3000. Other commands are available in the scripts section of the package.json file


## Build

Run `npm run start` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Application directories
```
src //frondend
 ├─ app 
 │  ├─ core 
 │  │  ├─ guards
 │  │  ├─ interceptors
 │  │  ├─ models
 │  │  ├─ mocks
 │  │  ├─ services
 │  │  ├─ constants
 │  │  └- enums
 │  ├─ shared 
 │  │  ├─ components
 │  │  ├─ directive
 │  │  ├─ pipes
 │  │  └- service
 │  └- persons 
 │     ├─ components
 │     ├─ models
 │     ├─ mocks
 │     ├─ services
 │     ├─ directive
 │     ├─ pipes
 │     ├─ guards
 │     ├─ constants
 │     └- enums
 └- srv //backend
    ├─ controllers 
    ├─ db 
    ├─ routes 
    └- services 

```
