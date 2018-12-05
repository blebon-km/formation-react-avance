# TP Formulaire et middleware

## Objectifs

L'objectif de ce TP est de mettre en place un middleware permettant de centraliser les appels aux webservice et de mettre en place le formulaire d'ajout de commentaire et de création de post avec Redux Form.

## Préparatifs

1. Installer les paquets NPM suivant avec l'option `--save`:
   - `redux-form`

## Instructions

### 1. Création du Middleware

1. Créer un fichier `src/js/store/fetchMiddleware.js`
2. Créer et exporter un middleware qui pour toute action ayant la forme suivante:
   ```js
   {
        // Types d'action à dispatch en fonction des différentes phases
        actions: [ TYPE_ACTION_LOADING, TYPE_ACTION_COMPLETE, TYPE_ACTION_ERROR ]
        request: {
            url, // URL du webservice
            method, // Méthode HTTP (POST ou GET)
            data, // Données à envoyer au serveur (POST uniquement)
            isMultipart, // Indique s'il s'agit d'un upload de fichier
        }
   }
   ```
   effectue l'appel `fetch` correspondant au paramètres spécifiés ci-dessus.<br />
   Dans le cas des appels `POST` les données doivent être envoyées au format `json`.<br />
   Pour chaque phase de l'appel au webservice, le middleware devra dispatcher les actions suivantes:
    - Loading:
    ```js
    {
        type: TYPE_ACTION_LOADING
    }
    ```
    - Complete:
    ```js
    {
        type: TYPE_ACTION_COMPLETE,
        data // Données retournées par le WS
    }
    ```
    - Error:
    ```js
    {
        type: TYPE_ACTION_ERROR,
        error // Données retournées par le WS
    }
    ```
3. Dans le fichier `src/js/store/index.js` remplacer `redux-thunk` par le middleware créé précédemment
4. Adapter les action creators existants de manière à leur faire utiliser le middleware
5. Adapter les reducers au nouveau format d'action envoyées par le middleware

### 3. Formulaire de création de posts

1.  Modifier le fichier `src/js/reducer/index.js` de manière à ajouter le reducer de `redux-form`
2. Créer un fichier `src/js/containers/PostForm.js`
3. Créer et exporter un composant `PostForm` affichant un formulaire de création de Post avec les champs suivants:
    - `pictureFile`: Image à uploader (input file)
    - `filter`: Filtre à appliquer à l'image (select)
    - `description`: Description du post (textarea)
4. Pour le champ `pictureFile`, utiliser le composant suivant (code à inclure dans `PostForm`)
   ```js
   
    // Permet de gérer les file input avec redux form
    const handleChange = (handler) => ({ target: { files } }) =>
        handler(files.length ? files[0] : null );

    // Composant à utiliser pour le champs 'pictureFile'
    function FileInput({
        input: { onChange, onBlur, value: omitValue, ...inputProps },
        meta: omitMeta,
        ...props
    })
    {
        return (
            <input type="file"
                onChange={handleChange(onChange)} onBlur={handleChange(onBlur)}
                {...inputProps} {...props} />
        );
    }
   ```
5. Dans le fichier `src/js/actions/index.js` ajouter un action creator `addPost` prenant un objet de la forme suivante:
   ```js
   {
       pictureFile, // Fichier à uploader
       filter, // Filtre à appliquer
       description //
   }
   ```
   Il doit effectuer une requête `POST` en multipart vers l'URL `config.apiUrl + /posts` en envoyant les données du post
6. Dans le composant `PostForm`, dispatcher l'action `addPost` lors de la soumission du formulaire
7. Lorsque le post a bien été ajouté, déclencher une navigation vers la liste des posts.


## Pour aller plus loin

### 1. Formulaire de commentaires

1.  Modifier le composant `PostDetail` de manière à afficher un formulaire d'ajout de commentaire en dessous de la description (Ne pas oublier de connecter le composant à `redux-form`) avec les champs suivants:
    - `nickname`: Pseudo de l'auteur du commentaire
    - `content`: Contenu du commentaire
2.  Dans le fichier `actions` créer un nouvel action creator `addComment` prenant les paramètre suivants:
    - `postId`: ID du post sur lequel ajouter le commentaire
    - `nickname`: Pseudo de l'auteur
    - `content`: Contenu du commentaire
  Il génèrera une requête post vers l'URL `config.apiUrl + /comments` en envoyant les données du commentaires
3. Dans le composant `PostDetail`, dispatcher l'action `addComment` lors de la soumission du formulaire
4. Lorsque le commentaire à bien été soumis, faire appel à `fetchPost` afin de mettre à jour les données du post affiché par la `postDetail`
5. Afficher la liste des commentaires du post sous le formulaire (Voir proposition de DOM)
6. Dans la `PostList` et la `PostDetail` appliquer aux images une classe CSS correspondant à la propriété `filter` du post 

### 2. Bonnes pratiques

1. Veiller à bien définir le typage flow
2. Mettre à jour les tests unitaires et fonctionnels

## Propositions de DOM

**PostDetail (formulaire):**

```html
<form>
  <div class="form-group">
    <input
      name="nickname"
      type="text"
      class="form-control form-control-sm"
      placeholder="Votre pseudo"
    />
  </div>
  <div class="form-group">
    <textarea
      name="content"
      class="form-control form-control-sm"
      placeholder="Votre commentaire...">
    </textarea>
  </div>
  <div class="form-group">
    <button type="submit" class="btn btn-primary btn-sm">Ajouter</button>
  </div>
</form>
```

**PostDetail (liste des commentaires):**

```html
<ul class="comment-list">
  <li>
    <p>
        <strong><!-- Pseudonyme --></strong>
        <!-- Contenu du commentaire -->
    </p>
  </li>
  <!-- Autres commentaires ... -->
</ul>
```

**PostForm :**

```html
<section class="post-form">
  <h3>Ajouter une photo</h3>
  <form>
    <div class="form-group">
      <label>Photo</label>
      <input type="file" name="pictureFile" class="form-control" />
    </div>
    <div class="form-group">
      <label>Filtre</label>
      <select name="filter" class="form-control">
          <option value="">Sans filtre</option>
          <option value="1977">1977</option>
          <option value="crema">Crema</option>
          <option value="inkwell">Inkwell</option>
          <option value="xpro-ii">X-Pro II</option>
      </select>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea
        name="description"
        class="form-control"
        placeholder="Votre description...">
    </textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </div>
  </form>
</section>
```

**Menu (lien vers PostForm) :**

```html
<ul class="nav navbar-nav navbar-right">
  <li class="nav-items">
    <a class="nav-link" href="/posts/new">Ajouter une photo</a>
  </li>
</ul>
```