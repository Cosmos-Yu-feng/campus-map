
console.log("脚本开始执行");

const map = L.map("map").setView([43.82048, 125.26893], 17.5);


// L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution: "Tiles &copy; Esri"
//   }
// ).addTo(map);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }
).addTo(map);


map.on("click", (event) => {
  const latitude = event.latlng.lat;
  const longitude = event.latlng.lng;

  console.log(latitude, longitude);

  L.popup()
    .setLatLng(event.latlng)
    .setContent(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
    .openOn(map);
});


const places = [
  {
    name: "鼎新图书馆",
    category: "图书馆",
    latitude: 43.823,
    longitude: 125.301
  },
  {
    name: "湖畔餐厅",
    category: "食堂",
    latitude: 43.818020,
    longitude:  125.267737
  },
  {
    name: "基础园餐厅",
    category: "食堂",
    latitude: 43.823857,
    longitude:  125.265827
  },
  {
    name: "中心图书馆",
    category: "图书馆",
    latitude:43.820592, 
    longitude:125.2774
  },
  {
    name: "敬信楼",
    category: "教学楼",
    latitude: 43.817014, 
    longitude: 125.265194
  },
  {
    name: "李四光楼",
    category: "教学楼",
    latitude: 43.819491, 
    longitude: 125.261976
  },
];

places.forEach((place) => {
  L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(`${place.name}（${place.category}）`);
});



const placeList = document.querySelector("#place-list");
const buttons = document.querySelectorAll(".filters button");

function renderPlaces(category) {
  placeList.innerHTML = "";

  const filteredPlaces = places.filter((place) => {
    return category === "全部" || place.category === category;
  });

  filteredPlaces.forEach((place) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${place.name}（${place.category}）`;
    placeList.appendChild(listItem);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    renderPlaces(button.dataset.category);
  });
});

renderPlaces("全部");