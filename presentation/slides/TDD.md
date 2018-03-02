## Une méthode de développement
## parmi d'autres

Notes:
Par Nico

->-

## Test Driven Development

<table>
	<tr>
		<td>
			<h3>Avantages</h3><!-- .element: class="fragment" -->
			<ul>
				<li>On code juste ce qui est nécessaire</li><!-- .element: class="fragment" -->
				<li>Code modulaire</li><!-- .element: class="fragment" -->
				<li>Bugs trouvés rapidement</li><!-- .element: class="fragment" -->
				<li>Refactoring et maintenance simplifiée</li><!-- .element: class="fragment" -->
			</ul>
		</td>
		<td>
			<h3>Inconvénients</h3><!-- .element: class="fragment" -->
			<ul>
				<li>Le développeur est le testeur</li><!-- .element: class="fragment" -->
				<li>Conception à court terme</li><!-- .element: class="fragment" -->
				<li>Couteux en temps lors du développement</li><!-- .element: class="fragment" -->
			</ul>
	    </td>
	</tr>
</table>

Notes:
Par Nico<br>
Livecoding en mode TDD sur AddressUtilsTest (AddressUtils.getPropertiesWithBestScoreFromSearchResponse)
Methode qui traite la reponse du WS (SearchResponse)
UC1: #tu1 + #step1 from_unique_search_response
UC2: #tu2 + #step2 highest_scored_properties_from_multiple_search_responses
UC3: #tu3 + #step3 empty_properties_from_empty_search_response
UC4: #tu4 + #step4 fail_from_null_search_response
