casper.test.begin('The hashtag search should work correctly',
    function suite(test) {
        // On se connecte au site
        casper.start("http://localhost:8001", function () {
            this.waitWhileSelector('.post-list.is-loading', function () {
                test.assertElementCount( '.post-list ul > li', 3 );
                this.fill('form', {
                    search: 'photo'
                }, true)
            })
        });

        casper.then( function() {
            this.waitWhileSelector( '.post-list.is-loading', function () {
                test.assertElementCount( '.post-list ul > li', 1 );
            } )
        } )

        // On lance les tests
        casper.run(function () {
            test.done();
        });
    });