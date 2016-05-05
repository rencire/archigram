
export function populateStorage() {
  var state = seedData();

  localStorage.setItem('state', JSON.stringify(state));
  console.log(JSON.stringify(state));
  console.log('Populated localstorage with test data');

}

export function clearStorage() {
  localStorage.setItem('state', null);
  console.log('Cleared app data from localStorage');
}

export function saveData(state) { 
  if(state === null) {
    console.log("No 'state' parameter");
    return;
  }

  // replace `from` and `to` (shape objects) with their respective ids
  state.edges.forEach(function(e) {
    e.from = e.from.id;
    e.to = e.to.id;
  }); 

  localStorage.setItem('state', JSON.stringify(state));
  console.log(JSON.stringify(state));
  console.log('State saved!');

  // reload shape objects to state
  loadShapesToState(state);
}

export function loadData() {
  var state = JSON.parse(localStorage.getItem('state'));

  // replace `from` and `to` (ids) with respective shape objects
  loadShapesToState(state);
  return state;  
}

function seedData() {
  var rects = [
    {id:0, x: 50, y:50, width:100, height:100, highlight: false },
    {id:1, x: 200, y:100, width:100, height:200, highlight: false},
    {id:2, x: 350, y:50, width:100, height:100, highlight: false},
    {id:3, x: 550, y:50, width:100, height:100, highlight: false},
  ];


  // NOTE:
  // since we can have multiple edges, we should store edges in its own array.  each edge should have an identifier also to differentiate between other edges between same vertices 

  var state = {
    add_edge_mode:  false,
    new_edge_source: undefined,
    rects: rects,
    edges: []
  };
  return state;
}

// replace `from` and `to` (ids) with respective shape objects
function loadShapesToState(state) {
  state.edges.forEach(function(e) {
    e.from = state.rects.find(function(shape) {
      return shape.id === e.from;
    });
    e.to = state.rects.find(function(shape) {
      return shape.id === e.to;
    });
  });
}

