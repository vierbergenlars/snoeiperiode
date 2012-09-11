if(typeof module != "undefined" && module.exports) {
    var T = require('../../dist/t.node.js')
    var Handlebars = require('../../vendor/handlebars/handlebars.js');
}
T.parser.define('handlebars',['handlebars','hb'],{
    compile: function( template ) {
        console.log(template);
        return Handlebars.compile( template );
    },
    render: function( compiled, data ) {
        return compiled( data );
    }
});
