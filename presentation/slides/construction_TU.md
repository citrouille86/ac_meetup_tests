# Construction d'un test unitaire

->-

## Lisibilité

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

## Simplicité

Le test doit être simple !

Si le test est complexe, comment savoir si c'est un problème d'implémentation du code ou du test ?

->-

## Un seul cas fonctionnel par test

->-

### Anti-pattern

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

### Test ... unitaire

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

## Utiliser la méthode d'assertion adéquat

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

->-

## Isolation du code à tester

->-

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

```java
@Test
public void givenTwoWidgetsWhenTheWidgetsAreQueriedThenTheCountIsTwo() {
    // Mock
    when(functionUsedInWidgetQuery()).thenReturn(true);
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

Notes:
Exemple : AddressService.createAddressIfNotExists