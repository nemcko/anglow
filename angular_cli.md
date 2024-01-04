Base Commands - installation of Frontend
```
ng new anglow 
npm i -s @ngrx/signals @ngrx/component-store
npm i -s @angular/material @angular/flex-layout angular-material-extensions //@angular/cdk 
npm i -s @swimlane/ngx-datatable --save

ng g module                 core
ng g interceptor            core/interceptors/auth
ng g service                core/service/auth
ng g guard                  core/guards/auth
ng g interface --type model core/models/datapage
ng g service                core/service/page-state --flat --skip-tests

ng g module shared
ng g component -p app -m shared --export true  shared/components/header
ng g component -p app -m shared --export true  shared/components/footer
ng g interface --type store shared/components/footer/footer
ng g component -p app -m shared --export true  shared/components/snack-bar

npm install @ngrx/signals
npm install immer --save

ng g component -p app -m orders --export true  orders/components/calendar
ng g component -p app -m orders orders/components/calendar-day  --skip-tests

ng g module                                    persons
ng g component -p app -m orders --export true  persons/components/list
ng g component -p app -m orders --export true  persons/components/detail
ng g component -p app -m orders --export true  persons/components/delete-dialog
ng g interface --type model                    persons/persons
ng g interface --type store                    persons/persons
ng g service                                   persons/persons --flat --skip-tests 
```
Base Commands - installation of Backend
```
npm install --save express-async-handler
npm install --save express-validator @types/express-validator
npm install --save lowdb
npm install --save @types/lowdb
npm i rimraf -D
npm i --save joi-typescript-validator
npm install cors
npm install --save-dev @types/cors
```