let allBedRooms = [];
let allBedRoomsOrigin = [];
let tabBedRooms = null;
let selectDormitorio = null;
let inputPrecoAPartir = null;
let inputPrecoAte = null;
let allTypesDorms = [];

window.addEventListener('load', start);

function start() {
  tabBedRooms = document.querySelector('#bedrooms');
  selectDormitorio = document.querySelector('#selectDormitorio');
  inputPrecoAPartir = document.querySelector('#priceAPartirDe');
  inputPrecoAte = document.querySelector('#priceAte');

  fetchProducts();
}

async function fetchProducts() {
  const res = await fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72');
  const json = await res.json();
  allBedRooms = json.map((bedroom) => {
    const { photo, property_type, name, price } = bedroom;

    let typeFinded = false;
    for (let i = 0; i < allTypesDorms.length; i++) {
      if (allTypesDorms[i] === property_type) {
        typeFinded = true;
      } else {
        typeFinded = false;
      }
    }

    if (typeFinded === false) {
      allTypesDorms.push(property_type);
    }

    allTypesDorms.forEach((value) => {
    
    })

    return {
      photo,
      type: property_type,
      name,
      price,      
    };
  });

  allBedRoomsOrigin = allBedRooms;
  render();
}

function render() {
  tabBedRooms.innerHTML = '';

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

  renderSelect();
}

function renderSelect() {  
  selectDormitorio.innerHTML = '';

  let optDefault = document.createElement("option");
  optDefault.value = "0";
  optDefault.text = "Todos";
  selectDormitorio.add(optDefault, selectDormitorio.options[0]);
  
  allTypesDorms.forEach((dorm, index) => {
    let opt = document.createElement("option");
    opt.value = index+1;
    opt.text = dorm;
    selectDormitorio.add(opt, selectDormitorio.options[index+1]);
  });
}

function buscar() {
  let indexDorm = selectDormitorio.selectedIndex;
  let typeDorm = selectDormitorio[indexDorm].text;
  if (typeDorm !== 'Todos') {
    allBedRooms = allBedRoomsOrigin.filter((dorm, index) => {
      if (dorm.type === typeDorm) {
        return dorm;
      } 
    })
  } else {
    allBedRooms = allBedRoomsOrigin.filter((dorm, index) => {
      return dorm;
    });
  }  

  render();  
  selectDormitorio.selectedIndex = indexDorm;
}