# Les mocks

->-

# Définition

## Mocks aren't Stubs
On parle de doublure en référence à celles du cinéma. Une doublure d'objet prendra la place d'une instance complètement implémentée, uniquement pour passer un test. Il existe quatre types de doublures :

* Le Dummy (fantôme) : c'est un objet qui n'est pas utilisé et qui sert surtout à remplir une liste de paramètres.
* Le Fake : il s'agit d'un objet avec une implémentation fonctionnelle mais non-acceptable pour être utilisée en production.
   * Exemple : un générateur de mot de passe aléatoire qui se contenterait du hash du nom de l'utilisateur. C'est une faille de sécurité inacceptable mais l'implémentation peut suffir pour certains tests.
* Le Stub (bouchon) : ces objets sont créés spécialement pour les tests. Leurs méthodes ont des réponses prédéfinies écrites en dur, simplement pour rendre les tests exécutables. Les stubs peuvent également mémoriser de l'information pour y effectuer des tests d'état.
* Le Mock (objet fantaisie) : en utilisant un framework, il n'y a pas de code à développer pour utilser un mock. C'est une simulation d'objet basée sur une interface, sur laquelle on spécifie les appels de méthodes, leur nombre d'appel attendu, leurs arguments attendus et le résultat retourné en cas d'appel valide.

->-

Les deux doublures les plus utilisées sont les stubs et les mocks. Ils sont souvent confondus, plus en raison de leurs utiilisations que de leurs implémentations. Un stub est écrit pour "boucher les trous" et éviter de bloquer le développement. Un mock, étant donné la nécessité de surveiller l'objet et d'en prendre le contrôle pour retourner une valeur sur un appel spécifique, l'implémentation est plus complexe. Classe anonyme, proxy et réflexivité sont les outils généralement utilisés par les frameworks de mocking. Ce n'est pas le sujet ici, mais lire le code source des frameworks demeure tout à fait instructif.

->-

1. Live coding avec Mockito en exemple
