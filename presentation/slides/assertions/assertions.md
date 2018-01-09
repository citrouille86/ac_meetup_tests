## Les Assertions

->-

### Les Assertions

* Servent à valider une instance d'objet ou une valeur
  * Exemple : le prénom de l'utilisateur est "Bob"
* JUnit fournit des assertions de base (égalité, erreur, ...)
* Pour les assertions complexes, on utilise des librairies spécialisées
  * Hamcrest, FEST-Assert, AssertJ...
* L'usage des import statiques facilite la lecture

->-

### Les Asssertions de JUnit

* assertEquals
* assertSame
* assertTrue
* assertNotNull
* fail

```java
assertEquals(expected, value);
```

->-

### AssertJ

* Fork de FEST-Assert qui n'est plus actif
* Propose une API "Fluent"
* Très nombreuses assertions

```Java
// invocation of Comparable.compareTo()
assertThat(shoppingCart.getGrossPrice())
  .isEqualByComparingTo(expectedPrice);
```

->-

### AssertJ exemples

```Java
// Collection size and content using chaining
assertThat(userRepository.findAll())
  .hasSize(2)
  .contains(john);
```
