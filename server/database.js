
/* Database
**
** A simple object, where the server can store data.
** Should be replaced with a real database later (ex. MongoDB)
*/

let Database = {
    titles: {
        Homepage: 'Over-engineered Quizz',
        Quizz: 'Ces arbres étaient mes amis'
    },
    data: {
        coniferes: {
            intitule: 'Associe chaque conifère à sa description !'
        },
        technos: {
            data: [
                'HapiJS',
                'React',
                'Redux',
                'Universal JS',
                'ES2015',
                'Babel',
                'Webpack',
                'Hot module reload',
                'Sass',
                'ESLint'
            ]
        }
    },

    add: function(key, items) {
        Database.data[key] = items;
    },

    reset: function(key) {
        Database.data[key] = {};
    }
}

export default Database;
