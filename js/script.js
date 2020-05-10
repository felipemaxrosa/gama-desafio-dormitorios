let allBedRooms = [];
let tabBedRooms = null;

window.addEventListener('load', start);

function start() {
  tabBedRooms = document.querySelector('#bedrooms');
  fetchProducts();
}

async function fetchProducts() {
  const res = await fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72');
  const json = await res.json();
  //console.log(json);
  allBedRooms = json.map((bedroom) => {
    const { photo, property_type, name, price } = bedroom;
    return {
      photo,
      type: property_type,
      name,
      price,      
    };
  });

  render();
}

function render() {
  allBedRooms.forEach((bedroom, index) => {
    const { photo, type, name, price } = bedroom;

    const bedRoomEl = document.createElement('div');
    bedRoomEl.setAttribute('class', 'card');
    
    const imgEl = document.createElement('img');
    imgEl.setAttribute('id', 'img-bd'+index.toString());
    imgEl.setAttribute('src', photo);
    
    const titleEl = document.createElement('p');
    titleEl.innerHTML = name;
    
    const typeEl = document.createElement('p');
    const typeStrongEl = document.createElement('strong');
    typeStrongEl.innerHTML = type;
    
    typeEl.appendChild(typeStrongEl);
    
    const priceEl = document.createElement('h2');
    const priceFormated = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    priceEl.innerHTML = priceFormated;
    
    bedRoomEl.appendChild(imgEl);
    bedRoomEl.appendChild(titleEl);
    bedRoomEl.appendChild(typeEl);
    bedRoomEl.appendChild(priceEl);
  
    tabBedRooms.appendChild(bedRoomEl);
  }); 

}