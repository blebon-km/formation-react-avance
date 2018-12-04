# TP Modal et Context

## Objectifs

L'objectif de ce TP et d'apprendre à manipuler le context de manière à pouvoir partager des informations au travers des divers composants de l'application et également de mettre en place un système de modal grâce aux Portal.

## Instructions

### 1. Création du contexte de configuration

1. Créer un fichier `src/js/contexts/ConfigContext.js`
2. Créer et exporter un nouveau contexte React
3. Importer ce nouveau contexte dans le fichier `src/js/index.js`
4. Placer le `ConfigContext.Provider` entre le `Provider` de Redux et le `ConnectedRouter`
5. Lui attribuer comme `value` le module `config`
6. Dans tous les composants de l'application, remplacer l'utilisation du module `config` par l'utilisation du `ConfigContext`


### 2. Création de la modale

1. Créer un fichier `src/js/components/Modal.js`
2. Créer et exporter un composant `Modal` dont le contenu (`this.props.children`) sera affiché dans la balise `div#modal-container` (Voir proposition de DOM)
3. La modale acceptera une props `onClick` qui sera une fonction appelée lorsque l'utilisateur cliquera à l'extérieur de la modale

### 3. Utilisation de la modale

1. Dans le fichier `src/js/containers/App.js`, supprimer le composant `Switch` et retirer la props `exact` sur la `Route` affichant la `PostList`
2. Dans le composant `PostDetail`
    1. Importer le composant `Modal`
    2. Englober l'ensemble du contenu de la méthode `render()` dans le composant `Modal`
    3. Détecter le clic sur l'exterieur de la modale de manière à revenir sur la `PostList`

## Pour aller plus loin

1. Veillez à bien définir le typage flow
2. Mettre à jour les tests unitaires et fonctionnels


## Propositions de DOM

**Modal :**

```html
<div class="overlay">
  <div class="modal-wrapper">
    <!-- Contenu de la modale -->
  </div>
</div>
```