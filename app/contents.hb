{{#each plants}}
		<a name="cat-{{category}}" id="cat-{{category}}">&nbsp;</a>
		<h2>{{category}}</h2>
		<table class="table table-bordered table-hover">
		<thead><tr><th>Naam</th><th>Jan</th><th>Feb</th><th>Mrt</th><th>Apr</th><th>Mei</th><th>Jun</th><th>Jul</th><th>Aug</th><th>Sep</th><th>Okt</th><th>Nov</th><th>Dec</th></tr></thead>
		<tbody>
		{{#each plants}}
			<tr><th>{{name}} <span class="muted">{{latin}}</span> {{#if ref}}<a href="{{ref}}" title="{{ref}}"><i class="icon-share"></i></a>{{/if}}</th>
			{{#each cut}}
				{{#eq . 1}}
				<td class="ct-winter">&nbsp;</td>
				{{else}}
					{{#eq . 2}}
					<td class="ct-summer" title="Zomersnoei: scheuten inknijpen">&nbsp;</td>
					{{else}}
					<td>&nbsp;</td>
					{{/eq}}
				{{/eq}}
			{{else}}
			<td colspan="12">{{#if cut-info}}{{cut-info}}{{else}}?{{/if}}</td>	
			{{/each}}
			</tr>
		{{/each}}
		</tbody>
		</table>
{{/each}}
