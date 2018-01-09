## Isolation du SUT

->-

### Isolation

* Dans un "vrai" projet, il y a des dépendances plus complexes
  * Base de données, serveur JMS, serveur mail, ....
* Pour isoler le SUT d'un test unitaire, il faut "bouchonner" les dépendances externes

->-

### Stub ou Mock

* On trouve les dénominations Dummy vs Stub vs Spy vs Fake vs Mock
* Stub : implémentation "vide" d'une dépendance
  * un DAO qui n'accède pas à la base et renvoie toujours la même valeur
* Mock : implémentation généré par une librairie spécialisée qui la crée à la volée en fonction de l'interface à respecter
  * un mock est programmable et est capable de vérifier le comportement (nombre d'appels, paramêtres...)

http://martinfowler.com/articles/mocksArentStubs.html

->-

### Stub

* Le Stub implémente la même interfaice que la dépendance injecté, c'est
  * une classe anonyme pour éviter de créer trop de fichier
  * une vraie classe afin de l'utiliser pour plusieurs tests

```Java
AccountService accountService = new AccountService();
accountService.setUserService(new UserService(){
  public User getCurrentUser(){
    User user = new User();
    user.setLogin("user");
    user.setName("Bob");
    return user;
  }
})
assertEquals("Bob", accountService.getCurrentUser().getName());
```

->-

### Framework de Mock

* 3 principaux :
  * EasyMock
  * JMock
  * Mockito
* Mockito est le plus populaire
* Extension possible avec PowerMock pour mocker les méthodes statiques

->-

### Mockito

* Génération d'un Mock à partir d'une classe ou d'une interface
* Ajout des comportements prévus
* Vérification des attentes
* Utilisation des import statiques et de l'API "fluent" pour la lecture

->-

### Mockito

```Java
@Test
public void testAdminAuthentification(){
  //mock repository
  UserRepository userRepository = mock(UserRepository.class);

  //Stubbing
  when(userRepository.findOne("admin")).thenReturn(admin);

  //Inject
  userDetailService.setUserRepository(userRepository);

  //test
  UserDetails userDetails =
      userDetailsService.loadUserByUsername("admin");

  //verification
  verify(userRepository).findOne("admin");  
}
```

->-

### Programmation en chaîne

```Java
public void testSomething(){
  when(mock.someMethod())
    .thenReturn(something)
    .thenReturn(somethingElse);

  assertEquals(something, mock.someMethod());
  assertEquals(somethingElse, mock.someMethod());
  assertEquals(somethingElse, mock.someMethod());
}
```

Si plus de programmation, le mock applique la dernière.

->-

### Mockito : nombre d'invocations

```Java
public void testSomething(){
  //do something with mock
  verify(userRepository, times(1)).findOne("admin");
  verify(userRepository, never()).findMany();
  verify(userRepository, atLeastOnce()).findOne("admin");
  verify(userRepository, atLeast(1)).findOne("admin");
  verify(userRepository, atMost(1)).findOne("admin");
}
```

->-

### Mockito : pas de programmation

* Si pas de programmation, le mock renvoie null

```Java
@Test
public void testUserAuthentification(){
  //mock repository
  UserRepository userRepository = mock(UserRepository.class);

  //Stubbing
  when(userRepository.findOne("admin")).thenReturn(admin);

  //Inject
  userDetailService.setUserRepository(userRepository);

  //test
  UserDetails userDetails =
      userDetailsService.loadUserByUsername("John");

  //verification
  assertNull(userDetail);
}
```

->-

### Mock renvoyant une Exception

```Java
@Test(expected = IllegalArgumentException.class)
public void testThrowException(){
  //mock repository
  UserRepository userRepository = mock(UserRepository.class);

  //Stubbing with return value
  when(userRepository.findOne(null))
      .thenThrow(new IllegalArgumentException());

  //Stubbing void
  doThrow(new IllegalArgumentException()).when(userRepository).voidMethod();

  //...
}
```

->-

### Mock partiel ou Spy

```Java
@Test
public void someDummyTestWithSpy(){
  List list = new LinkedList();
  List spy = spy(list);

  //stub out size
  when(spy.size()).thenReturn(100);

  //call real add on the spy
  spy.add("one");
  spy.add("two");

  //assert
  assertEquals("one" spy.get(0));  //real
  assertEquals(100, spy.size());    //stubbed
}
```

->-

### Argument Matcher

```Java
//stubbing using built-in anyInt() argument matcher
when(mockedList.get(anyInt())).thenReturn("element");

//stubbing using custom matcher (let's say isValid() returns your own matcher implementation):
when(mockedList.contains(argThat(isValid()))).thenReturn("element");

//following prints "element"
System.out.println(mockedList.get(999));

//you can also verify using an argument matcher
verify(mockedList).get(anyInt());
```

->-

### Vérifier aucune interaction

```Java
//using mocks - only mockOne is interacted
mockOne.add("one");

//ordinary verification
verify(mockOne).add("one");

//verify never called on a mock
verify(mockOne, never()).add("two");

//verify that other mocks were not interacted
verifyZeroInteractions(mockTwo, mockThree);
```

->-

### Mock intelligent

```Java
when(mock.someMethod(anyString())).thenAnswer(new Answer() {
     Object answer(InvocationOnMock invocation) {
         Object[] args = invocation.getArguments();
         Object mock = invocation.getMock();
         return "called with arguments: " + args;
     }
 });

 //the following prints "called with arguments: foo"
 System.out.println(mock.someMethod("foo"));
```

->-

### Capture d'arguments

* Permet de capturer les arguments utilisés pour l'invocation de la méthode

```Java
@Test
public void testSomething(){
  //declare ArgumentCaptor
  ArgumentCaptor<Person> argument = ArgumentCaptor.forClass(Person.class);
  //Activate capture on verify
  verify(mock).doSomething(argument.capture());
  //Assert on captured argument
  assertEquals("John", argument.getValue().getName());
}
```

->-

### Annotations

* Utilisation d'annotations @Mock, @Captor, @Spy, @InjectMocks
* 3 solutions pour les activer :
  * Ajout d'une Rule `MockitoRule`
  * Utilisation du Runner `MockitoJUnitRunner`
  * Invocation de `MockitoAnnotations.initMocks(Object)`

->-

### Annotations

```Java
@RunWith(MockitoJUnitRunner.class)
public class SomeClassTest{
  @InjectMocks
  private SomeClass someClass;
  @Mock
  private AService mockService;

  @Test
  public void shouldDoSomething(){
    //program mock and do test
  }
}
```

->-

### Intérêt des Mocks par rapport au Stub

* Plus simple à maintenir : que le code nécessaire au test
* Plus simple de changer le comportement
* Plus puissants pour les tests : vérification de l'appel
