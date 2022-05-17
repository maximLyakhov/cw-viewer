Caption Works: Viewer & Captioner
===============

Start project on Fedora 35
================

1. ensure nodejs is of proper version, currently it is `v14.19.0` in stack distros. `dnf install nodejs`
2. ensure npm is installed of proper version, currently it is `v6.14.15` it stack distros, installed alongside `nodejs`
3. install [angular-cli](https://angular.io/cli) - `npm install -g @angular/cli`
4. install dependencies - `npm ci`
5. start application `npm start`
6. Application will be started on [ http://localhost:4200/](http://localhost:4200/).

Start project with nvm:
================

```
npm i
nvm use && ng serve
```
