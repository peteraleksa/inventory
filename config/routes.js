module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    var inventories = require('../app/controllers/inventory');

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Inventory Routes
    
    app.get('/inventory/stores', inventories.all);
    // authenticated users only can create
    app.post('/addItem', auth.requiresLogin, inventories.addItem);
    app.post('/addStore', auth.requiresLogin, inventories.create);
    app.put('/inventory/stores/:storeId', inventories.update);
    app.get('/inventory/stores/:storeId', inventories.show);
    //app.put('/inventory/:storeId', inventory.update);
    //app.del('/inventory/:storeId', auth.requiresLogin, auth.inventory.hasAuthorization, inventory.destroy);*/
    //app.put('users/:userId', users.update);

    //Finish with setting up the storeId param
    app.param('storeId', inventories.inventory);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
