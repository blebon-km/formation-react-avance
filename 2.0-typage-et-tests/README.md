# TP Typage et tests

## Objectifs

L'oobjectif de ce TP est de maximiser la robustesse de l'application en mettant en place un certain nombre de bonnes pratique comme le typage statique et les tests automatisés.

## Préparatifs

- Installer les paquets NPM suivant avec l'option --save-dev
    - `babel-core@^7.0.0-bridge.0`
    - `@babel/preset-flow`
    - `casperjs`
    - `jest`
    - `react-test-renderer`
    - `regenerator-runtime`
- Dans le dossier `src` créer un dossier `flow-typed` et y créer un fichier `config.js.flow` avec le contenu suivant:
    ```js
    declare module 'config' {
        declare module.exports: {
            baseUrl: string,
            basePath: string,
            apiUrl: string,
            picturesUrl: string
        };
    }
    ```
- Créer un dossier `tests` dans le dossier `src/js`

## Instructions

### 1. Utilisation du typage static


1. Dans le fichier `package.json` créer une commande `test` qui éxécute la commande `jest` 
2. Initialiser un projet flow en lançant la commande `./node_modules/.bin/flow init`
3. Dans le dossier `src/js` créer un dossier `flow`
4. Dans ce dossier créer un fichier `types.js` et exporter deux types (voir: https://flow.org/en/docs/types/modules/)
    1. `Comment` qui devra être la forme suivante:
    ```js
    {
        id, // Nombre
        picture, // Chaine de caractère
        description, // Chaine de caractère, optionnelle
        createdAt, // Chaine de caractère
        comments, // Tableau de 'Comment' optionnelle
    }
    ```
    1. `Post` qui devra être la forme suivante:
    ```js
    {
        id, // Nombre
        picture, // Chaine de caractère
        description, // Chaine de caractère, optionnelle
        createdAt, // Chaine de caractère
        comments, // Tableau de 'Comment' optionnelle
    }
    ```
5. Utiliser le typage flow pour définir le type des props de tous les composant de l'application
6. Utiliser le typage flow dans les reducers
7. Utiliser le typage flow dans les action creators


### 2. Tests unitaires des composants

_Certains composants utilisant le composant `Link` de `react-router`, il sera parfois nécessaire de les entourer du composant `MemoryRouter` pour être en mesure de les tester_

1. Dans le dossier `tests`, créer les dossiers `components` et `containers`
2. Dans le dossier `tests/components` créer un fichier `Menu.test.js` et y rédiger le test du `Menu` à l'aide des snapshots
3. Dans le dossier `tests/containers` créer les fichier `PostList.test.js` et `PostDetail.js` et y rédiger respectivement les tests de la `PostList` et de la `PostDetail` grâce aux snapshots
4. Veiller à bien tester les différents cas de figure (loading, complete, error)

### 3. Tests unitaires des reducers

1. Créer un dossier `tests/reducers` et y créer les fichiers `posts.test.js` et `post.test.js` et y rédiger respectivement les test du reducer `posts` et du reducer `post`
2. Veiller à bien tester les différents cas de figures (les 3 types d'actions gérées par le reducer, une action non prise en charge, et l'action `@@INIT` de redux)

## Pour aller plus loin

### 1. Tests unitaires des action creators

_Le test des action creators nécessite de **mocker** la fonction `dispatch` ainsi que l'API `fetch`. pour ce faire, consulter les documentations suivantes: [Mock functions](https://jestjs.io/docs/en/mock-functions) et [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)_

1. Tester les actions creators de manière à vérifier si les différents types d'action sont bien dispatchées en fonction des réponses retournées par `fetch`

### 2. Test fonctionnel de la liste des posts

1. Afin de rendre l'application compatible avec `PhantomJS`, installer les paquets NPM suivants:
    - `promise-polyfill`
    - `whatwg-fetch`
2. Dans le fichier `src/js/index.js` importer les éléments suivants:
   ```js
    // Polyfills pour PhantomJS
    import "core-js/es6/map";
    import "core-js/es6/set";
    import "whatwg-fetch";
    import "promise-polyfill/src/polyfill";
   ```
3. Créer le test fonctionnel de la liste des posts dans le fichier `src/js/functional-tests/post-list.js`
4. Tester dans un premier temps que le nombres de posts affiché sur la page est correct puis tester la soumission du formulaire de recherche et retester que le nombre de posts est correct
5. Créer une commande `functional-test` associé à la commande `casperjs test ./js/functional-tests` dans le `package.json`
6. Lancer le test grâce à la commande `npm run functional-tests`