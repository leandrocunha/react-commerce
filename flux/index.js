import McFly from 'mcfly';

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
        console.log(payload);
        return payload;
      }, function(err) {
        console.log(err);
      });
    },

    show() {

      var p = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
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
        return { actionType: "GET_TSHIRT", data: result }
      }, function(err) {
        console.log(err); // Error: "It broke"
      });

      return p
    }
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
      console.log('aqui2');
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

let aliases = {
  actions: {
    tshirt: TshirtActions
  },

  store: {
    tshirt: TshirtStore
  }
}

module.exports = aliases;
