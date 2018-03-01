## Conception d'un test unitaire

Notes:
Par Séb

->-

## Lisibilité

#### Anti-pattern

<!-- .element: class="fragment" -->

```java
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    assertEquals(2, new WidgetQuery()
        .insertDefaultWidget().insertDefaultWidget()
        .count());
}
```

<!-- .element: class="fragment" -->

#### Given / When / Then

<!-- .element: class="fragment" -->

```java
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    // Given
    WidgetQuery widgetQuery = new WidgetQuery();
    widgetQuery.addOneWidget();
    widgetQuery.addOneWidget();
    // When
    int result = widgetQuery.count();
    // Then
    assertEquals(2, result);
}
```

<!-- .element: class="fragment" -->

Notes:
Par Séb

->-

## Simplicité

Le test doit être simple !

Si le test est complexe, comment savoir si c'est un problème d'implémentation du code ou du test ?

Notes:
Par Séb

->-

## Un seul cas fonctionnel par test

Notes:
Par Nico

->-

### Anti-pattern

```java
public class MyTestCase {
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

Notes:
Par Nico

->-

### Test ... unitaire

```java
public class MyTestCase {
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

Notes:
Par Nico
* Contextualiser la partie de l'appli testée
* Méthode AddressServiceTest.anti_pattern + pattern

->-

## Utiliser la méthode d'assertion adéquate

Notes:
Par Séb

->-

#### Anti-pattern

```java
assertTrue("Objects must be the same", expected == actual);
assertTrue("Objects must be equal", expected.equals(actual));
assertTrue("Object must be null", actual == null);
assertTrue("Object must not be null", actual != null);
```

#### Exemple

<!-- .element: class="fragment" -->

```java
assertSame("Objects must be the same", expected, actual);
assertEquals("Objects must be equal", expected, actual);
assertNull("Object must be null", actual);
assertNotNull("Object must not be null", actual);
```

<!-- .element: class="fragment" -->

Notes:
Par Séb

->-

## Isolation du code à tester

Notes:
Par Séb

->-

```java
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    // Given
    WidgetQuery widgetQuery = new WidgetQuery();
    widgetQuery.addOneWidget();
    widgetQuery.addOneWidget();
    // When
    int result = widgetQuery.count();
    // Then
    assertEquals(2, result);
}
```

```java
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    // Mock
    when(functionUsedInCountMethod()).thenReturn(true);
    // Given
    WidgetQuery widgetQuery = new WidgetQuery();
    widgetQuery.addOneWidget();
    widgetQuery.addOneWidget();
    // When
    int result = widgetQuery.count();
    // Then
    assertEquals(2, result);
}
```

<!-- .element: class="fragment" -->

Notes:
Par Séb<br>
Exemple : AddressService.createAddressIfNotExists