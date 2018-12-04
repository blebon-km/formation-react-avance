# TP Animations et transitions

## Objectifs

Mettre en place d'animations d'apparition de posts dans la liste des posts et d'animation d'apparition/disparition de la modale.

## Préparatifs

1. Installer les paquets NPM suivant avec l'option `--save`:
   - `react-transition-group`

## Instructions

### 1. Animation de l'apparition des posts

1. Dans le composant `PostList`
    1. Remplacer le `ul` par le composant `TransitionGroup` en lui fournissant `ul` comme valeur pour la prop `component`
    2. Entourer le `li` avec le composant `CSSTransition` et le paramétrer avec les props suivantes:
        - `key`: `post.id`
        - `classNames`: `"post-appear"`
        - `timeout`: `500`
2. Tenter d'ajouter un nouveau post via le formulaire de création et constater l'animation d'apparition de ce dernier


### 2. Animation de la modale

1. Dans le composant `Modal`
    1. Entourer le contenu de la modale avec le composant `CSSTransition` en le configurant avec les props suivantes:
        - `in`: `props.display` (Cette prop sera passée plus tard au composant)
        - `classNames`: `"modal-appear"`
        - `unmountOnExit`
        - `timeout`: `500`
2. Dans les composants `PostForm` et `PostDetail`, transmettre la props `display` transmise par le parent au composant `Modal`
3. Dans le composant `App`
    1. Supprimer le composant `Switch`
    2. Pour les routes menant à `PostForm` et à `PostDetail` utiliser la props `children` plutôt que `component` (voir: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md#children-func)
    3. Envoyer au deux composant une props `display` à mettre à `true` si la prop `match` reçue en paramètre est définie
    ```js
        // Exemple
        <Route exact path="/posts/new" children={({ match }) => (
            <PostForm display={!!match} />
        )} />
    ```
    4. Dans le cas de la `PostDetail`
        1. Modifier le `path` de la route de la manière suivante: `/posts/:id(\\d+)`
        2. Lui transmette la variable `match` en props
4. Afficher et masquer le composant `PostDetail` ou `PostForm` de manière à constater les animations d'apparition et de disparition
