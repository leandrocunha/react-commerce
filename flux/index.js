import McFly from 'mcfly';
import $ from 'jquery';

let Flux = new McFly();

// SET ACTIONS
let ProductActions = Flux.createActions(
  {
    get: function() {
      return new Promise(function(resolve, reject) {
        $.get(`${RC.apiURL}/products`)
          .done(function(data){
            resolve(data);
          })
          .fail(function( jqxhr, textStatus, error ){
            console.log(jqxhr);
            reject(Error("It broke"));
          });
        })
        .then(function(result) {
          let payload = { actionType: "GET_PRODUCTS", data: result };
          return payload;
        }, function(err) {
          console.log(err);
        });
    }
  }
);

let UserActions = Flux.createActions(
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

    new: function(user){
      return new Promise(function(resolve, reject) {
        $.post(`${RC.apiURL}/users`, user)
          .done(data => resolve(data))
          .fail( (jqxhr, textStatus, error) => reject(Error(error)) );
        })
        .then(function(result){
            let payload = { actionType: 'NEW_USER', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    },

    update: function(user){      
      return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${RC.apiURL}/users/${user._id}`,
            method: 'PUT',
            data: user
          })
          .done(data => resolve(data))
          .fail( (jqxhr, textStatus, error) => reject(Error(error)) );
        })
        .then(function(result){
            let payload = { actionType: 'UPDATE_USER', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    }
  }
);


// SET STORES
let ProductStore = Flux.createStore({

    get: function(data){
      return data;
    },

    // get: function(slug){
      
    //   return tshirts[slug];
    // }

  },

  function(payload){
    switch(payload.actionType) {
      case 'GET_PRODUCTS':
        ProductStore.get(payload.data);        
        break;

      // case 'GET_TSHIRT':

      //   TshirtStore.get(payload.slug);
      //   break;

      default:
        return true;
    }

    ProductStore.emitChange();
    return true;
});

let UserStore = Flux.createStore(
  {
    auth: function(data){
      localStorage['isSignedIn'] = true;
    },

    set: function(data){
      this.user = data.user;
    },

    get: function() {
      return this.user;
    }
  },

  function(payload){
    switch(payload.actionType) {
      case 'LOGIN_USER':      
        UserStore.set(payload.data);
        UserStore.auth(payload.data);
        break;

      case 'NEW_USER':
        UserStore.set(payload.data);
        UserStore.auth(payload.data);
        break;

      case 'UPDATE_USER':
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
    product: ProductActions,
    user: UserActions
  },

  store: {
    product: ProductStore,
    user: UserStore
  }
}

module.exports = aliases;
