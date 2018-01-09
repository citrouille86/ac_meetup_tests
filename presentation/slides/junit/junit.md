## Tests unitaires avec JUnit

->-

### Pourquoi les tests unitaires ?

* Vérifier le comportement d'une fonctionnalité au regard de la spécification
* Se prémunir des régressions lors de
 * Corrections d'anomalies
 * Evolutions fonctionnelles
 * Montée de socle
 * Refactoring

->-

### Avantages des tests

* Sérénité du développeur
* Documentation du code
* Contribuent
 * au design logiciel
 * à la qualité de l'application

->-

### Structure d'un test

* Un test est généralement composé de 3 parties
  * Mise en place du contexte
  * Invocation de la méthode
  * Vérification du résultat
* Given, When, Then
* Arrange, Act, Assert

->-

### Un Test

```Java
public class SomeClassTest{
  @Test
  public void shouldTestSomething(){
    int result = 2*3;
    assertEquals(6, result);
  }
}
```

->-

### Test d'Exception

```Java
public class SomeClassTest{
  @Test(expected=IndexOutOfBoundsException.class)
  public void shouldThrowException(){
    new ArrayList<Object>().get(0);
  }
}
```

->-

### Test avancé d'Exception

```Java
public class SomeClassTest{
  @Test
  public void shouldThrowException(){
    try{
        new ArrayList<Object>().get(0);
        fail("should have throw an IndexOutOfBoundsException");
    }catch (IndexOutOfBoundsException e){
      assertThat(e.getMessage()).isEqualTo("Index: 0, Size: 0");
    }
  }
}
```

->-

### Test d'Exception avec Rule

```Java
public class SomeClassTest{
  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Test
  public void shouldTestExceptionMessage() throws IndexOutOfBoundsException {
      List<Object> list = new ArrayList<Object>();

      thrown.expect(IndexOutOfBoundsException.class);
      thrown.expectMessage("Index: 0, Size: 0");
      list.get(0); // execution will never get past this line
  }
}
```

->-

### Préparer et nettoyer l'environnement

* On parle de "Fixture"
* La préparation peut se faire
  * une fois avant de faire les tests de la classe
  * avant chacun tests d'une classe
* Le nettoyage peut se faire
  * une fois après tous les tests de la classe
  * après chaque tests de la classe

->-

### Pour chaque test

* Créer des variables de classes (communes pour tous les tests)
* Annoter une méthode `@Before` pour initialiser les variables
* Annoter une méthode `@After` pour nettoyer après un test

->-

### `@Before`

```Java
private User user;
@Before
public void setUp(){
  user = new User();
  user.setLogin("user");
  user.setName("Bob");
}
```

->-

### Pour la classe

* Il faut travailler sur des éléments statiques
* Créer des variables statiques
* Annoter une méthode statique `@BeforeClass` pour initialiser
* Annoter une méthode statique `@AfterClass` pour nettoyer

->-

### `@BeforeClass`

```Java
private static String sharedValue;

@BeforeClass
public static void classSetUp(){
  sharedValue = "important Value";
}
```

->-

### Rule

* Permet l'addition ou la redefinition de comportement
* Le testeur peut utiliser ou étendre les `Rule` existantes
* Le testeur peut écrire ses propres `Rule`

->-

### Rule

```Java
public class DigitalAssetManagerTest {
  @Rule
  public TemporaryFolder tempFolder = new TemporaryFolder();

  @Test
  public void countsAssets() throws IOException {
    File icon = tempFolder.newFile("icon.png");
    File assets = tempFolder.newFolder("assets");
    createAssets(assets, 3);

    DigitalAssetManager dam = new DigitalAssetManager(icon, assets);
    assertEquals(3, dam.getAssetCount());
  }
}
```

->-

### TemporaryFolder Rule

* Permet la création de fichier et dossiers qui seront supprimés à la fin du test.

```Java
public static class HasTempFolder {
  @Rule
  public TemporaryFolder folder = new TemporaryFolder();

  @Test
  public void testUsingTempFolder() throws IOException {
    File createdFile = folder.newFile("myfile.txt");
    File createdFolder = folder.newFolder("subfolder");
    // ...
  }
}
```

->-

### ExternalResource Rule

* Classe de base pour les Rules qui prépare une resource externe et la supprime à la fin

```Java
public static class UsesExternalResource {
  Server myServer = new Server();

  @Rule
  public ExternalResource resource = new ExternalResource() {
    @Override
    protected void before() throws Throwable {
      myServer.connect();
    };

    @Override
    protected void after() {
      myServer.disconnect();
    };
  };

  @Test
  public void testFoo() {
    new Client().run(myServer);
  }
}
```

->-

### ErrorCollector Rule

* Permet de collecter les erreurs pour toutes les rapporter à la fin

```Java
public static class UsesErrorCollectorTwice {
  @Rule
  public ErrorCollector collector = new ErrorCollector();

  @Test
  public void example() {
    collector.addError(new Throwable("first thing went wrong"));
    collector.addError(new Throwable("second thing went wrong"));
  }
}
```

->-

### TimeOut Rules

```Java
public static class HasGlobalTimeout {
  public static String log;

  @Rule
  public TestRule globalTimeout = new Timeout(20);

  @Test
  public void testInfiniteLoop1() {
    log += "ran1";
    for(;;) {}
  }

  @Test
  public void testInfiniteLoop2() {
    log += "ran2";
    for(;;) {}
  }
}
```

->-

### Autres Rules

* TestName Rule : expose le nom de la méthode dans le Test
* ClassRules : comme un méthode Rule mais au niveau de la classe et donc static
* RuleChain : permet de gerer l'ordre des testRules

->-

### Les tests paramétriques

* Permet l'invocation en boucle d'une méthode de tests avec des tableaux de paramètres
* Deux façons de faire l'injection :
  * par le constructeur
  * par les champs

->-

### Test paramétriques par le constructeur

```Java
@RunWith(Parameterized.class)
public class FibonacciTest {
    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {     
                 { 0, 0 }, { 1, 1 }, { 2, 1 }, { 3, 2 }, { 4, 3 },
           });
    }

    private int fInput;
    private int fExpected;

    public FibonacciTest(int input, int expected) {
        fInput= input;
        fExpected= expected;
    }

    @Test
    public void test() {
        assertEquals(fExpected, Fibonacci.compute(fInput));
    }
}
```

->-

### Test paramétriques par les champs

* Seulement pour les champs public

```Java
@RunWith(Parameterized.class)
public class FibonacciTest {
    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {
                 { 0, 0 }, { 1, 1 }, { 2, 1 }, { 3, 2 }, { 4, 3 }, { 5, 5 }, { 6, 8 }  
           });
    }

    @Parameter // first data value (0) is default
    public /* NOT private */ int fInput;

    @Parameter(value = 1)
    public /* NOT private */ int fExpected;

    @Test
    public void test() {
        assertEquals(fExpected, Fibonacci.compute(fInput));
    }
}
```

->-

### Assumption

* JUnit Runner ignore les tests dont une assumption échoue

```Java
@Test
public void filenameIncludesUsername() {
    assumeThat(File.separatorChar, is('/'));
    assertThat(new User("optimus").configFileName(), is("configfiles/optimus.cfg"));
}

@Test
public void correctBehaviorWhenFilenameIsNull() {
   assumeTrue(bugFixed("13356"));  // bugFixed is not included in JUnit
   assertThat(parse(null), is(new NullDocument()));
}
```
