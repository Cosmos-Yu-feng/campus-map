

// const map = L.map("map").setView([43.88, 125.30], 17.5);
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


const marker = L.marker([43.82048, 125.26893]).addTo(map);
marker.bindPopup("吉林大学前卫南区操场");

const marker0 = L.marker([43.822611, 125.263206]).addTo(map);
marker0.bindPopup("鼎新图书馆");

const marker1 = L.marker([43.817974, 125.263345]).addTo(map);
marker1.bindPopup("宋志平体育馆");

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
  { name: "经信教学楼", category: "教学楼" },
  { name: "逸夫教学楼", category: "教学楼" },
  { name: "中心校区食堂", category: "食堂" },
  { name: "日新楼食堂", category: "食堂" },
  { name: "鼎新图书馆", category: "图书馆"},
  { name: "中心图书馆", category: "图书馆"}
];


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