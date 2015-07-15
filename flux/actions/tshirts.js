import McFly from 'mcfly';

let Flux = new McFly();

let TshirtActions = Flux.createActions({
  show: function(slug) {
    return {
      actionType: 'GET_TSHIRT',
      slug: slug
    }
  }
});
