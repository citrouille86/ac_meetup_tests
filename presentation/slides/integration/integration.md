## Integration tests

->-

### Définition

* Test un ensemble de composants dans un environnement comparable à la production
* Inclu l'utilisation de Spring, JPA, ...
* Si utilisation de Java EE, cela inclut votre serveur

->-

### Tests avec Spring

* Avec un ApplicationContext réduit, comprenant uniquement l'ensemble ce classes que l'on veut tester
* Avec une configuration d'infrastructure spécifique : SGBD en mémoire ou instance spécifique
* Spring propose un ensemble d'intégration

->-

### Tests avec Spring

* `SpringJUnit4ClassRunner` permet l'intégration de Spring dans un test JUnit
* `@ContextConfiguration` permet de localiser la configuration de Spring
* Ne nécessite pas de serveur
* Simple et rapide

->-

### Tests avec Spring

```Java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations=
  {"classpath*:/META-INF/application-context-test.xml"})
public class IntegrationTest{
  @Inject
  private UserService userService;

  @Test
  public void someTest(){
    //do some test on userService
  }
}
```

->-

### Tests avec Spring

* Un ApplicationContext par classe de test
* Si la méthode est annotée `@Transactional` un Rollback est fait en fin de test
  * Si personne ne commit explicitement pendant le test

->-

### Tests avec Arquillian

* Utilisé dans un contexte Java EE
* Arquillian permet un déploiement des tests sur le serveur et une exécution à distance
* Fonctionne avec JBoss, GlassFish et Tomcat

->-

### Tests avec Arquillian

* Beaucoup plus complexe
  * Serveur disponible est nécessaire
  * Gestion des transactions à la main
  * Tests plus lents car déployés sur le serveur
* Utilisation du Runner `Arquillian.class`

->-

### Base de données

* Nécessité d'un jeu de données pour les tests
* MySQL lourd mais simple à auditer en cas de problème
* HSQLDB ou H2 ou Derby (base mémoire ou fichier)

->-

### Base de données

* Utilisation d'outils pour préparer les bases
  * Liquibase
  * DBUnit
  * DBSetup

->-

### Liquibase

* Format de fichier de migration de données en XML, JSON, YAML ou SQL
* Peut être utiliser pour la migration de schéma en production

->-

### DBUnit

* Plugin Maven ou intégration à Spring
* Peut verifier l'état des données après le test
* Maintient de jeux de données en XML est lourd

->-

### DBSetup

* Dispose d'une API pour l'injection de jeu de données via des Rules ou les fixtures
