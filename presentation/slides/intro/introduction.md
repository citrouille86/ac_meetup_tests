# Introduction

->-

## Catégories de Tests

Différentes catégories existent...

<div>
... entre autres :
* Tests unitaires <!-- .element: class="fragment highlight-green" -->
* Tests d'intégration <!-- .element: class="fragment highlight-green" -->
* Tests fonctionnels
* Tests de performance
* Tests de vulnérabilité
* Tests de robustesse
* Tests d'installation ou déploiement...
</div> <!-- .element: class="fragment" -->

->-

## Test Unitaire

* Test une méthode d'une classe en isolation <!-- .element: class="fragment" -->
* Doit fonctionner sur un poste déconnecté du réseau <!-- .element: class="fragment" -->

->-

## Test d'intégration

* Test un ensemble de méthodes <!-- .element: class="fragment" -->
* Exemples <!-- .element: class="fragment" -->
  * Plusieurs méthodes imbriquées
  * Web Services REST ou SOAP
  * Services métiers s'appuyant sur un accès BDD

->-

## Les tests et le développement

* Les tests font partie du travail du développeur <!-- .element: class="fragment" -->
* Souvent une variable d'ajustement <!-- .element: class="fragment" -->
* Quand faire les tests ? <!-- .element: class="fragment" -->
 * Tests après le développement
 * Test Driven Development (TDD)

Notes:
Retour d'expérience sur le TDD

->-

## Coût de maintenance

![CoutBug](slides/img/applied-software-measurement.png)

->-

## Pyramide de tests

![Pyramide tests](slides/img/mike_cohn_pyramid.png) <!-- .element: style="font-size: 10px; margin: 0px;" -->
