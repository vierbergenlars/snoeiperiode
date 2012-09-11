setInterval(function() {
    T.transport('/ping', function() {});
}, 2000);
var main = new T('app/main.hb', function() {
    this.update({});
    var wait = 0;
    wait++;
    main.bind(new T('app/nav.hb', function() {
        this.update('app/plants.json')
    }), 'nav');
    wait++;
    main.bind(new T('app/contents.hb', function() {
        this.update('app/plants.json')
    }));
    this.attach('#content');

    this.render(function(err) {
        console.log('Render called');
        if (err) {
            throw err;
        }
        this.update();
    })
});


