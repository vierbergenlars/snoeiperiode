{{#each plants}}
		<a name="cat-{{category}}" id="cat-{{category}}">&nbsp;</a>
		<h2>{{category}}</h2>
		<table class="table table-bordered table-hover">
		<thead><tr><th>Naam</th><th>Jan</th><th>Feb</th><th>Mrt</th><th>Apr</th><th>Mei</th><th>Jun</th><th>Jul</th><th>Aug</th><th>Sep</th><th>Okt</th><th>Nov</th><th>Dec</th></tr></thead>
		<tbody>
		{{#each plants}}
			<tr><th title="{{latin}}">{{name}} {{#if ref}}<a href="{{ref}}" title="Externe link"><i class="icon-share"></i></a>{{/if}}</th>
			{{#each cut}}
				{{#if .}}
				<td class="color">&nbsp;</td>
				{{else}}
				<td>&nbsp;</td>
				{{/if}}
			{{else}}
			<td colspan="12">?</td>	
			{{/each}}
			</tr>
		{{/each}}
		</tbody>
		</table>
{{/each}}