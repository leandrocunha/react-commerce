import McFly from 'mcfly';

let Flux = new McFly();

let tshirts = [
    {
      'tshirt-a': {
        name: 'T-Shirt A',
        slug: 't-shirt-a',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },

      'tshirt-b': {
        name: 'T-Shirt B',
        slug: 't-shirt-b',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      },
      
      'tshirt-c': {
        name: 'T-Shirt C',
        slug: 't-shirt-c',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      }
    }
  ];

// SET ACTIONS
let TshirtActions = Flux.createActions({
  list: function(){
    return {
      actionType: 'LIST_TSHIRTS'
    }
  },

  show: function(slug) {
    return {
      actionType: 'GET_TSHIRT',
      slug: slug
    }
  }
});


// SET STORES
let TshirtStore = Flux.createStore({

    list: function(){
      console.log('list all tshirts');
    },

    get: function(slug){
      console.log(slug);
      return tshirts[0][slug];
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
