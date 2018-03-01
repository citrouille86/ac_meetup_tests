## Les mocks

Notes:
Par Nico

->-

### Une définition

Simulation d'objet basée sur une interface sur laquelle on spécifie :

* les appels de méthodes <!-- .element: class="fragment" -->
* le nombre d'appel attendu <!-- .element: class="fragment" -->
* leurs arguments attendus <!-- .element: class="fragment" -->
* le résultat retourné en cas d'appel correspondant <!-- .element: class="fragment" -->

Notes:
Par Nico

->-

### Mocks aren't Stubs

Notes:
Par Séb
* Test de la méthode AddressDataGouvService.searchAddress -> AddressDataGouvServiceTest
* Les deux doublures les plus utilisées sont les stubs et les mocks. Ils sont souvent confondus, plus en raison de leurs utiilisations que de leurs implémentations. Un stub est écrit pour "boucher les trous" et éviter de bloquer le développement. Un mock, étant donné la nécessité de surveiller l'objet et d'en prendre le contrôle pour retourner une valeur sur un appel spécifique, l'implémentation est plus complexe. Classe anonyme, proxy et réflexivité sont les outils généralement utilisés par les frameworks de mocking. Ce n'est pas le sujet ici, mais lire le code source des frameworks demeure tout à fait instructif.