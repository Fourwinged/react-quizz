# React Quizz

**[Readme en français](https://github.com/Fourwinged/react-quizz/blob/master/README-FR.md)**

A small and simple (but completely over-engineered) [React](http://facebook.github.io/react/) and [Hapi](http://hapijs.com/) powered quizz, made for a local hackathon. Consumes [a public API](http://data.paysdelaloire.fr/donnees/detail/inventaire-des-ligneux-de-type-conifere-du-jardin-des-plantes-de-la-ville-de-nantes/) about conifers in a public park in Nantes, France, then creates a small series of questions.

### Features :
* ES2015 syntax using [babel](https://babeljs.io/)
* hot reloading with [react-transform-webpack-hmr](https://github.com/gaearon/react-transform-webpack-hmr)
* server-side rendering (hurray to [universal javascript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) !)
* component error handling with [react-transform-catch-errors](https://github.com/gaearon/react-transform-catch-errors) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
* routing using [react-router](https://github.com/rackt/react-router)
* [Redux](https://github.com/rackt/redux) implementation
* Sass compilation and image minification
* linting with [ESLint](http://eslint.org/)
* ~~testing with Mocha, Chai and jsdom~~

Initially based on **[react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)**.  
It was a great exercise for a better understanding of Webpack- and React-centered technical stack.


### Structure

##### Config
- *Routes* : list of our routes URLs and configuration
- *SourceApis* : list of the APIs we call
- *webpack.assets* : Webpack configuration for assets export
- *webpack.development* : Webpack configuration for local dev
- *webpack.production* : Webpack configuration for production

##### Server
- *database* : simple JS object acting as our database
- *hot-server* : express server used for webpack hot module replacement
- *render* : function handling the server-side rendering
- *server* : HapiJS server

##### Src
- *images* : our image files
- *scripts* : our javascript files
    - *pages* : the pages of our app
    - *shared* : the elements shared by our different pages
        - *components* : React components
        - *Actions* : redux action creators
        - *Helpers* : various utility functions
        - *Reducers* : redux reducers
- *styles* : our .scss files

##### Static
This is where our JS / CSS bundles and our statics assets (images, fonts...) are exported and served from.


### Install
```
git clone https://github.com/Fourwinged/react-quizz
cd reactoniferes
npm install
```

### Development
```
npm run assets
npm run server
npm run dev
open http://localhost:3000
```

### Production (kinda)
```
npm start
open http://localhost:3000
```
(try with JS disabled : pages should render and router links should still work)

### Linting
```
npm run lint
```

### Enhancement ideas
- Put it online on a real Node server
- Make it more flexible and connect other public APIs
- Add a real database to store questions / list items
- Save scores at the end of the quizz, and add a scoreboard
- Make the quizz itself work with JS disabled using form POSTs
- Setup page transitions (maybe using [TransitionGroup](https://facebook.github.io/react/docs/animation.html) ?)
- Add working tests
- Ensure compatibility with old browsers (ex. shims)
- Use the log.txt file to inform about server events

### License
MIT
