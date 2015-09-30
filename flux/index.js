import McFly from 'mcfly';
import $ from 'jquery';
import Cookie from 'react-cookie';

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
    },

    show: function(slug) {
      return new Promise(function(resolve, reject) {
        $.get(`${RC.apiURL}/products/${slug}`)
          .done(function(data){
            resolve(data);
          })
          .fail(function( jqxhr, textStatus, error ){
            console.log(jqxhr);
            reject(Error("It broke"));
          });
        })
        .then(function(result) {
          let payload = { actionType: "SHOW_PRODUCT", data: result };
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
    },

    getAccess: function(uat){      
      return new Promise(function(resolve, reject) {
        $.post(`${RC.apiURL}/access`, uat)
          .done(data => resolve(data))
          .fail( (jqxhr, textStatus, error) => reject(Error(error)) );
        })
        .then(function(result){
            let payload = { actionType: 'ACCESS_USER', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    }
  }
);

let CartActions = Flux.createActions(
  {
    add: function(products){
      return new Promise(function(resolve, reject){
        $.post(`${RC.apiURL}/cart`, products)
          .done(data => resolve(data))
          .fail((jqxhr, textStatus, error) => reject(Error(error)));
        })
        .then(function(result){
            let payload = { actionType: 'ADD_TO_CART', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    },

    get: function(user) {
      return new Promise(function(resolve, reject) {
        $.get(`${RC.apiURL}/cart/${user.email}`)
          .done(function(data){
            resolve(data);
          })
          .fail(function( jqxhr, textStatus, error ){
            console.log(jqxhr);
            reject(Error("It broke"));
          });
        })
        .then(function(result) {
          let payload = { actionType: "GET_CART", data: result };
          return payload;
        }, function(err) {
          console.log(err);
        });
    },

    remove: function(data) {
      return new Promise(function(resolve, reject) {
          $.ajax({
            url: `${RC.apiURL}/cart`,
            type: 'DELETE',
            data: data
          })
          .done(function(data){
            resolve(data);
          })
          .fail(function( jqxhr, textStatus, error ){
            console.log(jqxhr);
            reject(Error("It broke"));
          });
        })
        .then(function(result) {
          let payload = { actionType: "GET_CART", data: result };
          return payload;
        }, function(err) {
          console.log(err);
        });
    },

    checkout: function(cart){
      return new Promise(function(resolve, reject){
          $.ajax({
            url: `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout`,
            contentType: 'application/xml; charset=ISO-8859-1',
            type: 'POST',
            data: {
              email: 'leandroscunha@gmail.com',
              token: '64653890FA2B4623A735883A7B4C0C2B',
              currency: 'BRL',
              itemId1: 1,
              itemDescription1: 'Notebook Prata',
              itemAmount1: '24300.00',
              itemQuantity1: 1,
              itemWeight1: 1000
            }
          })
          .done(data => resolve(data))
          .fail((jqxhr, textStatus, error) => reject(Error(error)));
        })
        .then(function(result){
            let payload = { actionType: 'CHECKOUT', data: result };
            return payload;
          }, function(err){
            console.log(err);
          });
    }
  }
);


// SET STORES

function productStoreFactory() {
  //a lista de produtos fica salva numa "closure", que é "privada"
  //dessa forma nós poderíamos tranquilamente isolar a store
  //num módulo a parte, e dar um require/import
  //assim como é no dash :p

  let products;

  return {

    get() {
      return products;
    },

    show(){
      return products;
    },

    save(data) {
      products = data.data;
    }

  };
}

let ProductStore = Flux.createStore(
  productStoreFactory(),

  function(payload){

    switch(payload.actionType) {
      case 'GET_PRODUCTS':
        ProductStore.save(payload.data);
        //só deve ser emitido um evento "change" quando a store for de fato alterada
        ProductStore.emitChange();
        break;

      case 'SHOW_PRODUCT':
        ProductStore.save(payload.data);
        ProductStore.emitChange();
        break;
    }

    return true;
});

let UserStore = Flux.createStore(
  {
    auth: function(data){
      Cookie.save('_UAT', data.user.accessToken);
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
        UserStore.emitChange();
        break;

      case 'NEW_USER':
        UserStore.set(payload.data);
        UserStore.auth(payload.data);
        UserStore.emitChange();
        break;

      case 'UPDATE_USER':
        UserStore.set(payload.data);
        break;

      case 'ACCESS_USER':
        UserStore.set(payload.data);
        UserStore.emitChange();
        break;

      default:
        return false;
    }

    return true;
  }
);

let CartStore = Flux.createStore(
    {
      set: function(data){
        this.products = data.data;
      },

      get: function(){
        return this.products;
      }
    },

    function(payload){
      switch(payload.actionType){
        case 'ADD_TO_CART':
          CartStore.set(payload.data);
          CartStore.emitChange();
          break;

        case 'GET_CART':
          CartStore.set(payload.data);
          CartStore.emitChange();
          break;

        default:
          return false;
      }
    }
  );


// HELPER
let aliases = {
  actions: {
    product: ProductActions,
    user: UserActions,
    cart: CartActions
  },

  store: {
    product: ProductStore,
    user: UserStore,
    cart: CartStore
  }
}

module.exports = aliases;
