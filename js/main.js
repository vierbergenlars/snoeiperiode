var ping = setInterval(function() {
    T.transport('ping', function(err, data) {
        if (err) {
            $('#sv_down').show();
            clearInterval(ping);
        }
        if(data == 'STOP!') {
            clearInterval(ping);
        }
    });
}, 2000);
var main = new T('app/main.hb', function() {
    this.update({});
    this.bind(new T('app/nav.hb', function() {
        this.update('app/plants.json', function() {
            main.bind(new T('app/contents.hb', function() {
                this.update('app/plants.json', function() {
                    main.render(function(err, rendered) {
                        if(err) {
                            throw err;
                        }
                        $('#content').html(rendered);
                    })
                })
            }));
        })
    }), 'nav');
});

