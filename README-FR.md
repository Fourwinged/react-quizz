# React Quizz

**[English readme](https://github.com/Fourwinged/react-quizz/blob/master/README.md)**

Un petit quizz tout bête (mais inutilement complexe) basé sur [React](http://facebook.github.io/react/) et [Hapi](http://hapijs.com/), réalisé pour un hackathon. Utilise [une API publique](http://data.paysdelaloire.fr/donnees/detail/inventaire-des-ligneux-de-type-conifere-du-jardin-des-plantes-de-la-ville-de-nantes/) sur les conifères du Jardin des Plantes de Nantes, puis génère une petite série de questions.

### Fonctionnalités :
* syntaxe ES2015, avec [babel](https://babeljs.io/)
* hot reloading avec [react-transform-webpack-hmr](https://github.com/gaearon/react-transform-webpack-hmr)
* rendu côté serveur (vive le [javascript universel](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) !)
* gestion des erreur de composants avec [react-transform-catch-errors](https://github.com/gaearon/react-transform-catch-errors) et [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
* routage avec [react-router](https://github.com/rackt/react-router)
* implémentation de [Redux](https://github.com/rackt/redux)
* compilation de fichiers Sass et minification d'images
* linting avec [ESLint](http://eslint.org/)
* ~~tests avec Mocha, Chai et jsdom~~

Basé au départ sur **[react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)**.  
Ce fut un très bon exercice pour mieux appréhender un stack basé sur React et Webpack.


### Structure

##### Config
- *Routes* : liste de nos routes avec leurs URLs et configurations
- *SourceApis* : liste des APIs que nous appelons
- *webpack.assets* : configuration Webpack pour l'export des assets
- *webpack.development* : configuration Webpack pour le développement en local
- *webpack.production* : configuration Webpack pour la production

##### Server
- *database* : simple objet JS, servant de base de données
- *hot-server* : serveur express utilisé pour le hot module replacement de Webpack
- *render* : fonction gérant le rendu côté serveur
- *server* : serveur HapiJS

##### Src
- *images* : nos fichiers image
- *scripts* : nos fichiers javascript
    - *pages* : les pages de notre app
    - *shared* : les éléments partagés par nos différentes pages
        - *components* : composants React
        - *Actions* : créateurs d'actions redux
        - *Helpers* : diverses fonctions utilitaires
        - *Reducers* : reducers redux
- *styles* : nos fichiers .scss

##### Static
C'est ici que nos bundles JS / CSS et nos assets statiques (images, polices...) sont exportées.


### Installation
```
git clone https://github.com/Fourwinged/react-quizz
cd reactoniferes
npm install
```

### Développement
```
npm run assets
npm run server
npm run dev
open http://localhost:3000
```

### Production
```
npm start
open http://localhost:3000
```
(essayez avec le JS désactivé : les pages devraient être rendues par le serveur, et les liens gérés par le routeur devraient encore fonctionner)

### Linting
```
npm run lint
```

### Idées d'améliorations
- Mettre le quizz en ligne, sur un vrai serveur Node
- Rendre le projet plus flexible et ajouter d'autres APIs
- Intégrer une vraie base de données pour stocker les questions
- Sauvegarder les scores à la fin du quizz, et ajouter un classement
- Utiliser des POSTs pour pouvoir répondre aux questions avec le JS désactivé
- Mettre en place des transitions entre les pages (peut-être avec [TransitionGroup](https://facebook.github.io/react/docs/animation.html) ?)
- Ajouter des tests
- Assurer la compatibilité avec les vieux navigateurs (par ex. avec des shims)
- Utiliser le fichier log.txt pour informer sur les évènements du serveur

### License
MIT
