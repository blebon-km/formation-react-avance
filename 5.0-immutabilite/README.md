# TP Immutabilité & performances

## Objectifs

L'objectif de ce TP est d'intégrer la librairie Immutable.JS dans le projet.

## Préparatifs

1. Installer les paquets NPM suivant avec l'option `--save`:
   - `immutable`

## Instructions

### 1. Modifier les reducers pour intégrer Immutable.JS
1. Créer le default state du reducer `post` en utilisant la classe `Map`
2. Modifier la fonction reducer en utilisant les méthodes `Map::set()`, `Map::merge()` et la fonction `fromJS()`.
3. Adapter la méthode render() de la vue `PostDetail` de manière à prendre en compte le passage du state à un objet `Map` en utilisant notamment la méthode `Map::get()`.

## Pour aller plus loin
### 1. Mettre à jour les informations de typage sur le reducer `post` et sur la vue `PostDetail`
1. Dans le reducer `post`, remplacer le type State par `Map<string,any>` (il n'est pas possible avec un Map de spécifier une "shape", on se contente donc d'un "any")
2. Dans la méthode `render()` du `PostDetail`, déclarer une const pour chaque `Map::get()` qui est fait. Cela permettra de contourner typer correctement les valeurs retournées par les `.get()` et donc de limpiter les erreurs lors du lancement de la commande `npm run check`
### 2. Ajouter Immutable dans la page liste
1. Modifier le reducer `posts` en utilisant la fonction `Record` de Immutable.JS. `Record` a la particularité de définir plus finement que le Map le typage du state.
2. Modifier la méthode `render()` de la classe `PostList` pour utiliser le nouveau state.
3. Modifier les informations de typage du reducer `post` et de la vue `PostList`