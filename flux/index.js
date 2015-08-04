import McFly from 'mcfly';
import $ from 'jquery';

let Flux = new McFly();

let tshirts = {
  "t-shirt-a": {
    "name": "T-Shirt A",
    "slug": "t-shirt-a",
    "image": "assets/img/tshirt-blue.jpg",
    "price": "100"
  },
  "t-shirt-b": {
    "name": "T-Shirt B",
    "slug": "t-shirt-b",
    "image": "assets/img/tshirt-red.jpg",
    "price": "100"
  },
  "t-shirt-c": {
    "name": "T-Shirt C",
    "slug": "t-shirt-c",
    "image": "assets/img/tshirt-blue.jpg",
    "price": "100"
  },
  "t-shirt-d": {
    "name": "T-Shirt D",
    "slug": "t-shirt-d",
    "image": "assets/img/tshirt-red.jpg",
    "price": "100"
  },
  "t-shirt-e": {
    "name": "T-Shirt E",
    "slug": "t-shirt-e",
    "image": "assets/img/tshirt-blue.jpg",
    "price": "100"
  }
};

// SET ACTIONS
let TshirtActions = Flux.createActions(
  {
    list: function() {
      return new Promise(function(resolve, reject) {
        $.getJSON(`http://localhost:8888/react-commerce/assets/tshirts.json`)
        .done(function(data){
          resolve(data);
        })
        .fail(function( jqxhr, textStatus, error ){
          console.log(jqxhr);
          reject(Error("It broke"));
        });
      })
      .then(function(result) {
        let payload = { actionType: "LIST_TSHIRTS", data: result };
        return payload;
      }, function(err) {
        console.log(err);
      });
    }
  }
);

let UsersActions = Flux.createActions(
  {
    login: function(email, password){
      return new Promise(function(resolve, reject) {
        $.post(`${RC.apiURL}/login`, { email: email, password: password })
          .done(data => resolve(data))
          .fail( (jqxhr, textStatus, error) => reject(Error(error)) );
        })
        .then(function(result){
            let payload = { actionType: 'LOGIN_USER', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    },

    update: function(user){
      
      let loggedUser = UserStore.get();

      return new Promise(function(resolve, reject) {
        $.put(`${RC.apiURL}/user/${loggedUser.user._id}`, { user })
          .done(data => resolve(data))
          .fail( (jqxhr, textStatus, error) => reject(Error(error)) );
        })
        .then(function(result){
            let payload = { actionType: 'UPDATE_USER', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    },
  }
);


// SET STORES
let TshirtStore = Flux.createStore({

    list: function(data){      
      console.log(data);
      return data;
    },

    get: function(slug){
      
      return tshirts[slug];
    }

  },

  function(payload){
    switch(payload.actionType) {
      case 'LIST_TSHIRTS':
        TshirtStore.list(payload.data);
        break;

      case 'GET_TSHIRT':

        TshirtStore.get(payload.slug);
        break;

      default:
        return true;
    }

    TshirtStore.emitChange();
    return true;
});

let UserStore = Flux.createStore(
  {
    login: function(data){
      return data.success; // true
    },

    set: function(data){
      this.user = data.user; // object user
    },

    get: function() {
      return this.user;
    },

    update: function(data){
      console.log(data);
    }
  },

  function(payload){
    switch(payload.actionType) {
      case 'LOGIN_USER':
        UserStore.login(payload.data);
        UserStore.set(payload.data);
        break;

      default:
        return false;
    }

    UserStore.emitChange();
    return true;
  }
);


// HELPER
let aliases = {
  actions: {
    tshirt: TshirtActions,
    user: UsersActions
  },

  store: {
    tshirt: TshirtStore,
    user: UserStore
  }
}

$.put = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

module.exports = aliases;
