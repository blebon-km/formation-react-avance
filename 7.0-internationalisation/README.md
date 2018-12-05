# TP Internationalisation

## Objectifs

L'objectif de ce TP est de mettre en place un système de traduction et de changement de langue sur l'application.

## Préparatifs

1. Installer les paquets NPM suivant avec l'option `--save`:
   - `react-intl`
2. Récupérer le dossier `messages` se trouvant dans `demarrage/src/js/` et le placer dans le dossier `src` du projet

## Instructions

### 1. Configuration de Redux

1. Dans le fichier `src/js/actions/index.js`
    1. Importer le module `message` de la manière suivante: `import messages from '../messages'`
    2. Créer un action creator `changeLocale` qui prend un paramètre `locale`
        1. Retourner une action de type `CHANGE_LOCALE` avec les données suivantes
        2. `locale`: Locale passée en paramètre de `changeLocale`
        3. `messages`: Messages correspondant à la locale `messages[locale]`
2. Créer un fichier `src/js/reducer/intl.js`
    1. Importer le module `messages/fr` de la manière suivante: `import frMessages from '../messages/fr'`
    2. Définir un state par défaut pour le reducer de la forme suivante:
    ```js
    {
        locale: 'fr',
        messages: frMessages
    }
    ```
    3. Créer un reducer qui lorsqu'il reçoit une action du type `CHANGE_LOCALE` retourne un nouveau state de la forme:
    ```js
    {
        locale: action.locale,
        messages: action.messages
    }
    ```
    4. Associer ce reducer à la propriété `intl` dans le `combineReducers` du fichier `src/js/reducer/index.js`

### 2. Connexion du composant App au store

1. Dans le fichier `src/js/containers/App.js`
    1. Connecter le composant au store de la manière suivante
    ```js
    App = connect(mapStateToProps)( App );
    export default withRouter( App );
    ```
    2. Injecter la propriété `intl` du state dans les props du composant grâce à la fonction `mapStateToProps`
    3. Englober l'ensemble du contenu du composant dans le composant `IntlProvider` de `react-intl` en lui envoyant la `locale` et les `messages` en props
    4. Créer une méthode `handleLocaleChange` qui reçoit un paramètre `locale` et effectue un dispatch de l'action `changeLocale` en lui passant la locale reçue en paramètre
    5. Envoyer les props suivante au composant `<Menu />`
        1. `locale`: Locale récupérée dans le state redux
        2. `messages`: Messages réupérés dans le state redux
        3. `onLocaleChange`: Méthode `handleLocaleChange` 
2. Dans le fichier `src/js/components/Menu.js`
    1. Ajouter un nouveau lien (en HTML et non via le composant `Link` de `react-router`) qui affiche `fr` si  la locale est `en` et inversement.
    2. Lors du clic sur le lien, appeler la fonction `props.onLocaleChange()` en lui passant la valeur `"fr"` si la locale est `"en"` et inversement.

### 3. Traduction de PostForm

1. Utiliser les composants `FormattedMessage` de `react-intl` afin de traduire le titre de la page et les libéllés des champs du formulaire

