# TP Création d'un Instagram Like

## Objectifs

L'objectif de ce TP est de mettre en place les bases d'une application similaire à Instagram.

## Préparatifs
- Télécharger et installer PHP (7.1+) pour windows
- Modifier la variable d'environnement `PATH` de manière à rendre php accessibles en ligne de commande
- Récupérer le contenu du dossier 'demarrage' du TP et placer les fichiers dans un répertoire au choix
- Dans le dossier `site`, décompresser le dossier `vendor` 
- Dans le dossier `src` initialiser un projet NPM grâce à la commande `npm init`
- Installer les paquets suivants avec l'option `--save-dev`:
    - `@babel/cli`
    - `@babel/core`
    - `@babel/preset-env`
    - `@babel/preset-react`
    - `babel-loader`
    - `webpack`
    - `webpack-cli`
- Installer ensuite les paquets suivants avec l'option `--save`
    - `connected-react-router`
    - `react`
    - `react-dom`
    - `react-redux`
    - `react-router`
    - `react-router-dom`
    - `redux`
    - `redux-thunk`
- Créer un fichier `.babelrc` et configurer le projet pour utiliser les presets `@babel/env` et `@babel/react`
- Créer un fichier `webpack.config.js` et configurer le fichier d'entrée à `js/index.js` et le fichier de sortie à `../site/public/js/app.bundle.js`
- Configurer webpack de manière à compiler les fichier `.js` via babel
- Ajouter l'instruction suivante:
    ```
        externals: {
            'config': '__REACTAGRAM_CONFIG__'
        }
    ```
- Dans le dossier `src` créer un dossier `js` contenant l'arborescence suivante (Les fichiers JS seront laissés vides pour le moment):
    ```
     js/
        ├─ actions/
        │   └─ index.js
        ├─ components/
        │   └─ Menu.js
        ├─ containers/
        │   ├─ App.js
        │   ├─ PostDetail.js
        │   └─ PostList.js
        ├─ reducers/
        │   ├─ index.js
        │   ├─ post.js
        │   └─ posts.js
        ├─ store/
        │   └─ index.js
        └─ index.js
    ```
- Démarrer le serveur en vous rendant dans le dossier `site` et en lançant la commande `php bin/console server:run`. La console devrait alors indiquer l'URL permettant de se connecter à l'application

## Instructions

_Dans ce TP l'ensemble du code se fera dans le dossier `src` du projet et donc l'ensemble des chemins spécifiés dans les instructions suivantes sont relatifs à ce dossier_

### 1. Demarrage de l'application

1. Dans le fichier `containers/App.js`: Créer et exporter un composant React affichant une simple `div` contenant le message `Bienvenue sur Reactagram`
2. Dans le fichier `index.js`
    1. Importer le composant `App`
    2. Afficher ce dernier dans la balise `main#app-container`
3. Dans le fichier `components/Menu.js`
    1. Créer et exporter un composant React
    2. Lui faire afficher le menu de l'application (Voir proposition de DOM plus bas)
4. Dans le fichier `containers/App.js` importer et afficher le composant `Menu`

### 2. Mise en place de Redux

1. Dans le fichier `reducer/index.js`
    1. Exporter le résultat de l'appel à `combineReducers()` en ne lui fournissant pour le moment aucun reducer
2. Dans le fichier `store/index.js`
    1. Importer le reducer
    2. Créer et exporter `configureStore`
    3. Faire en sorte que cette fonction crée un store Redux en utilisant les `redux-devtools` et le middleware `redux-thunk`
3. Dans le fichier `index.js`
    1. Importer la fonction `configureStore` et l'utiliser pour créer le store Redux
    2. Utiliser le composant `<Provider>` pour entourer le composant `<App>` tout en veillant à lui fournir le store créé précédemment

### 3. Mise en place de React Router

1. Dans le fichier `index.js`
    1. Créer un historique de navigation grâce à la fonction `createBrowserHistory`
    2. Passer l'historique en premier paramètre de la fonction `configureStore`
    3. Importer et utiliser le composant `ConnectedRouter` de `connected-react-router` et le placer entre le composant `Provider` et le composant `App` tout en veillant à lui passer l'historique via la props `history`
3. Adapter le reducer (`reducer/index.js`) de manière à gérer le state de react-router** en faisant en sorte de ne plus retourner directement le résultat du `combineReducers` mais une fonction qui reçoit un **history** en paramètre et **retourne le résultat du combineReducers**. Ajouter également le sous-reducer **connectRouter** en l'associant à la propriété `router` du state et en lui passant l'history reçu en paramètre.
4. Modifier le store pour le rendre capable de gérer le state de react-router. En envoyant l'history, reçu en paramètre, au reducer. Ajouter également le `routerMiddleware` de `connected-react-router` dans les middlewares du store.
5. Dans le fichier `containers/PostList.js`
    1. Créer et exporter un composant React
    2. Lui faire afficher une simple `div` avec le texte `PostList`
6. Dans le fichier `containers/PostDetail.js`
    1. Créer et exporter un composant React
    2. Lui faire afficher une simple `div` avec le texte `PostDetail`
7. Dans le fichier `containers/App.js`
    1. Importer les composant `PostList` et `PostDetail`
    2. Utiliser les composants `<Switch>` et `<Route>` de react-router pour configurer le routing de l'application :
        - une **Route** d'URL **"/"** associée à `PostList`
        - une **Route** d'URL **"/posts/:id"** associée à `PostDetail`
    3. Exporter le composant `App` en le faisant passer par la fonction `withRouter`

### 4. Création de la PostList

1. Dans le fichier `actions/index.js`
    1. Importer le module config de la manière suivante `import config from 'config'`
    2. Créer et exporter 3 constantes correspondant aux 3 types d'actions suivant: `FETCH_POSTS_LOADING`, `FETCH_POSTS_COMPLETE`, `FETCH_POSTS_ERROR`
    3. Créer et exporter un action creator `fetchPosts` faisant un un appel webservice via l'api `fetch` à l'url suivante `config.apiPath + '/posts'`
    4. Lui faire dispatcher l'action `FETCH_POSTS_LOADING` avant l'appel au webservice
    5. Lui faire dispatcher l'action `FETCH_POSTS_COMPLETE` en cas de succès en fournissant en plus les données retournées par le webservice (ex: `{type: FETCH_POSTS_COMPLETE, posts: data }`)
    6. Lui faire dispatcher l'action `FETCH_POSTS_ERROR` en cas d'erreur en fournissant en plus les données retournées par le webservice (ex: `{type: FETCH_POSTS_COMPLETE, error: data }`)
2. Dans le fichier `reducer/posts.js` créer un reducer permettant de gérer ces trois types d'action avec un state de la forme suivante:
    ```js
    {
        isLoading: true, // Si la liste est en train de charger ou non
        data: [ /* ... */ ], // Liste des posts
        error: null // Erreur eventuelle
    }
    ```
3. Dans le fichier `reducer/index.js` importer le reducer `posts.js` et l'ajouter dans le `combineReducers`
4. Dans le fichier `containers/PostList.js`
    1. Connecter le composant au store Redux
    2. Faire appel à l'action `fetchPosts` lors du `componentDidMount`
    3. Générer l'affichage des posts (Voir exemple de DOM plus bas)
    4. Pour chaque post, créer un lien vers la page détail grâce au composant `Link` de `react-router-dom`


### 5. Création de la PostDetail

1. Dans le fichier `actions/index.js`
    1. Importer le module config de la manière suivante `import config from 'config'`
    2. Créer et exporter 3 constantes correspondant aux 3 types d'actions suivant: `FETCH_POST_LOADING`, `FETCH_POST_COMPLETE`, `FETCH_POST_ERROR`
    3. Créer et exporter un action creator `fetchPost` prenant un paramètre `id` et  faisant un un appel webservice via l'api `fetch` à l'url suivante `config.apiPath + '/posts/' + id`
    4. Lui faire dispatcher l'action `FETCH_POST_LOADING` avant l'appel au webservice
    5. Lui faire dispatcher l'action `FETCH_POST_COMPLETE` en cas de succès en fournissant en plus les données retournées par le webservice (ex: `{type: FETCH_POST_COMPLETE, post: data }`)
    6. Lui faire dispatcher l'action `FETCH_POST_ERROR` en cas d'erreur en fournissant en plus les données retournées par le webservice (ex: `{type: FETCH_POST_COMPLETE, error: data }`)
2. Dans le fichier `reducer/post.js` créer un reducer permettant de gérer ces trois types d'action avec un state de la forme suivante:
    ```js
    {
        isLoading: true, // Si le post est en train de charger ou non
        data: { /* ... */ }, // Détail du post
        error: null // Erreur eventuelle
    }
    ```
3. Dans le fichier `reducer/index.js` importer le reducer `post.js` et l'ajouter dans le `combineReducers`
4. Dans le fichier `containers/PostDetail.js`
    1. Connecter le composant au store Redux
    2. Faire appel à l'action `fetchPosts` lors du `componentDidMount`
    3. Générer l'affichage des posts (Voir exemple de DOM plus bas)
    4. Pour chaque post, créer un lien vers la page détail grâce au composant `Link` de `react-router-dom`

## Pour aller plus loin

1. Lors du chargement de la liste des posts, ajouter la classe `is-loading` sur la `section` principale de la `PostList`
2. Lors du chargement du détail d'un post, , ajouter la classe `is-loading` sur la `section` principale de la `PostDetail`
3. Permettre de filtrer la liste des posts affichés par hashtag via un formulaire de recherche et grâce au **paramètre GET hashtag** du webservice `GET /posts`

## Proposition de DOM

**App :**
```html
<div>
    <!-- Menu -->
    <div class="container">
        <!-- Routing -->
    </div>
</div>
```

**Menu :**
```html
<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">Reactagram</a>
            </div>
        </div>
    </nav>
</header>
```

**PostList :**
```html
<section class="post-list ">
  <div class="search-form">
    <form class="form-inline">
      <input
        class="form-control mr-sm-2"
        name="search"
        type="text"
        placeholder="hashtag"
      /><button class="btn btn-secondary" type="submit">Rechercher</button>
    </form>
  </div>
  <ul>
    <li>
      <a href="[URL_DU_DETAIL]">
        <article
          style="background-image: url([URL_DE_L_IMAGE])"
        ></article>
      </a>
    </li>
  </ul>
</section>
```

**PostDetail**
```html
<section class="post-detail ">
  <div>
    <div class="picture-container">
      <img
        src="[URL_DE_L_IMAGE]"
        alt=""
      />
    </div>
    <div class="infos-container">
      <time><!-- Date du post --></time>
      <p class="description"><!-- Description du post --></p>
    </div>
  </div>
</section>
```
