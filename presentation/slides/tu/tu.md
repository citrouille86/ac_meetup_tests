# Les Tests unitaires

->-

## Test unitaire

* Test uniquement <!-- .element: class="fragment" -->
  * des méthodes isolées  <!-- .element: class="fragment" -->
  * des méthodes de classe feuille <!-- .element: class="fragment" -->
* Doit être lisible <!-- .element: class="fragment" -->
* Doit être facilement compréhensible <!-- .element: class="fragment" -->
* Doit vérifier un seul cas fonctionnel <!-- .element: class="fragment" -->
* Ne doit pas gérer les exceptions <!-- .element: class="fragment" -->

Notes:
1. Tester des méthodes simple ou utilitaire ou feuille
2. Livecoding en mode TDD sur AddressUtilsTest (snippets)

->-

## Construction d'un test unitaire

->-

### Lisibilité

#### Anti-pattern

<!-- .element: class="fragment" -->

```java
@Test
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    WidgetQuery widgetQuery = new WidgetQuery();
    assertEquals(2, widgetQuery.count());
}
```

<!-- .element: class="fragment" -->

#### Given / When / Then

<!-- .element: class="fragment" -->

```java
@Test
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
	// Given
    insertDefaultWidget();
    insertDefaultWidget();
    // When
    WidgetQuery widgetQuery = new WidgetQuery();
    // Then
    assertEquals(2, widgetQuery.count());
}
```

<!-- .element: class="fragment" -->

->-

### Simplicité

Le test doit être simple !

Si le test est complexe, comment savoir si c'est un problème d'implémentation du code ou du test ?

->-

### Un seul cas fonctionnel par test

->-

#### Anti-pattern

<!-- .element: class="fragment" -->

```java
public class MyTestCase extends TestCase {
  public void testSomething() {
    // Set up local variables

    // Manipulating local variables
    // Call tested function with local variables
    assertTrue(condition1);
    
    // Manipulating local variables
    // Call tested function with local variables
    assertTrue(condition2);
  }
}
```

<!-- .element: class="fragment" -->

->-

#### Test ... unitaire

<!-- .element: class="fragment" -->

```java
public class MyTestCase extends TestCase {
  // Local variables become instance variables

  protected void setUp() {
    // Set up for the test, manipulating instance variables
  }
  public void testCondition1() {
    // Call tested function
    assertTrue(condition1);
  }
  public void testCondition2() {
    // Call tested function
    assertTrue(condition2);
  }
}
```

<!-- .element: class="fragment" -->

->-

## TDD

| Avantages | Inconvénients |
|--|--|
| On code juste ce qui est nécessaire | Le développeur est le testeur |

# A ENRICHIR

->-

## Les avancés

<p><u>Rappel:</u> L'objectif est de tester uniquement le code de la méthode en question</p> <!-- .element: class="fragment" -->

* Isolation du code à tester <!-- .element: class="fragment" -->
* Maitrise des entrants, des sortants et dépendances de ce que l'on veut tester <!-- .element: class="fragment" -->


Notes:
1. Rappel
2. Voir le code pour poser le pb (AddressService.createAddressIfNotExists)
3. Problématiques que cela entraine


->-

# MOCKS

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

