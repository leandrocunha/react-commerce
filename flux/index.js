import McFly from 'mcfly';

let Flux = new McFly();

let tshirts = {
  't-shirt-a': { name: 'T-Shirt A', slug: 't-shirt-a', image: 'assets/img/tshirt-blue.jpg', price: '100' },
  't-shirt-b': { name: 'T-Shirt B', slug: 't-shirt-b', image: 'assets/img/tshirt-red.jpg', price: '100' },
  't-shirt-c': { name: 'T-Shirt C', slug: 't-shirt-c', image: 'assets/img/tshirt-blue.jpg', price: '100' },
  't-shirt-d': { name: 'T-Shirt D', slug: 't-shirt-d', image: 'assets/img/tshirt-red.jpg', price: '100' },
  't-shirt-e': { name: 'T-Shirt E', slug: 't-shirt-e', image: 'assets/img/tshirt-blue.jpg', price: '100' }
};

// SET ACTIONS
let TshirtActions = Flux.createActions(
  {
    show() {
      return Promise.all([
        
        $.getJSON(`https://api.parse.com/1/classes/TestObject`, function(data){
          console.log(data);
        })
        .fail(function(jqxhr, textStatus, error) {
          console.log( jqxhr );
          console.log( textStatus );
          console.log( error );
        })

      ]).then(ls =>
        ( console.log('teste') )
      )
    }
  }

// {
//   list: function(){
//     return {
//       actionType: 'LIST_TSHIRTS'
//     }
//   },

//   show: function(slug) {
//     return {
//       actionType: 'GET_TSHIRT',
//       slug: slug
//     }
//   }
// }
);


// SET STORES
let TshirtStore = Flux.createStore({

    list: function(){
      console.log('list all tshirts');
    },

    get: function(slug){
      return tshirts[slug];
    }

  },

  function(payload){
    switch(payload.actionType) {
      case 'LIST_TSHIRTS':
        TshirtStore.list();
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
