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

### Un exemple de mock ...

Notes:
Par Séb
* Test de la méthode AddressDataGouvService.searchAddress -> AddressDataGouvServiceTest

->-

### Mocks aren't Stubs

Notes:
Par Séb

* Souvent confondus
* Stub : peut être utilisé pour "boucher les trous" : explication doublure
* Mock : plus complexe : permet d'obtenir un comportement plus fin