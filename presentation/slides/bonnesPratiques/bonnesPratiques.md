## Bonnes pratiques

->-

### Objectifs des tests

* Couvrir un maximum des lignes de code de l'application
 * Ne pas tout tester mais ce qui est important
 * Si on utilise des branchements conditionnels, il faut plusieurs tests
* Les tests doivent être rapides, automatisés et indépendants

->-

### Tests rapides

* Si c'est trop long, on commit sans lancer les tests
* Le feedback rapide est important

->-

### Tests automatisés

* Pas d'intervention manuelle pour un test
 * Ajout d'un fichier dans un répertoire
 * Insertion de données en base

->-

 ### Tests indépendants

 * Ne pas dépendendre du tests avant
 * Ne pas être influencé par le test avant

->-

### Organisation des tests

* Il est possible de regrouper les tests dans une "Test Suite" qui permet de les lancer tous en même temps

```Java
@RunWith(Suite.class)
@Suite.SuiteClasses({
  TestClass1.class,
  TestClass2.class
})
public class TestSuite{
  //nothing to put here
}
```

->-

### TDD : Test Driven Development

* Ecrire un test qui échoue
* N'écrire que le code de production pour faire passer le test
* Faire le refactoring nécessaire
* Recommencer

->-

### TDD Avantages

* Code plus simple à lire
* Code plus simple à debugger
* Meilleur design (TDD pousse a découpler les objets)
* Baisse des coûts de maintenance

->-

### TDD inconvénients

* La même personne écrit le test et le code
* La maintenance des tests peut prendre du temps
* Donne parfois un faux sentiment de sécurité

->-

### BDD : Behavior Driven Development

* Basé sur le TDD
* Fourniture d'outils communs aux developpeurs et fonctionnels
* Ecriture des tests en langages naturels en décrivant le comportement attendu

->-

### BDD : Exemple

```
Feature : Basic Arithmetic

  Background : A Calculator
    Given a calculator I just turned on

  Scenario: Addition
    When I add 4 and 5
    Then the result is 9

  Scenario: Another Addition
    When I add 4 and 7
    Then the result is 11
```

->-

### BDD tools

* Cucumber en Java ou Ruby

->-

### Tests aux limites

* Si un méthode accepte une somme d'argent, on teste avec 100 par exemple
* Pour les valeurs limites :
  * une valeur négative
  * zéro
  * Un très grande valeur

->-

### Nommage des méthodes

* Ne pas avoir peur d'un nom de méthode long, il doit décrire le test pour simplifier la lecture du rapport

```Java
public class UserServiceTest{
  //fixture, properties
  @Test
  public void shouldReturnUserWhenCredentialAreRight(){
    User result = userService.findUser(righLogin, rightPassword);
    assertThat(result)isEqualTo(expectedUser);
  }
  @Test(expected=UnknownUserException.class)
  public void shouldThrowUnknownUserExceptionWhenCredentialAreWrong(){
    userService.findUser(wrongLogin, wrongPassword);
  }
}
```

->-

### Couverture des tests

* Mesure principale pour savoir si les tests permettent bien de vérifier la qualité d'un code
* Nécessite un outillage
* N'est qu'un indicateur

->-

### Couverture des tests

* On mesure
  * Les classes testées
  * Les méthodes testées
  * les lignes testées

->-

### Tests des embranchements

* Plusieurs chemins possible dans une méthode (if...then...else, switch...)
* Plusieurs tests par méthode, si nécessaire
* Tester les cas "rares" permet de trouver des bugs que les testeurs humains ne voient pas -> Tests des cas limites
* N'oubliez pas les blocs de gestion d'erreur (try...catch...finally)

->-

### Outils de couverture de tests

* L'outil va instrumenter le code lors du tests puis générer un rapport
* Plusieurs outils : JaCoCo, Cobertura, Emma, Atlassian Clover

->-

### Feinter l'outils

* Tester les getter/setter
* Appeler les méthodes mais ne pas faire d'assertions ou `assertTrue(true)`
