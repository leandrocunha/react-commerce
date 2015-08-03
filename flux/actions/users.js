import McFly from 'mcfly';

let Flux = new McFly();

let UserActions = Flux.createActions({
  get: function(username, password) {
    return {
      actionType: 'GET_USER',
      username: username,
      password: password
    }
  }
});
