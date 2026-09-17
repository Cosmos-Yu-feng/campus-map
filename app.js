
console.log("脚本开始执行");
// 创建geojson对象
const libraryGeoJSON = {
    "type": "Feature",
    "properties": {
        "name":"鼎新图书馆",
        "category": "图书馆"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [125.263093, 43.822624]
    }
};

const canteenGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "湖畔餐厅",
    "category": "食堂"
  },
  "geometry": {
    "type":"Point",
    "coordinates": [125.267737,43.818020,]
  }
};

const campusFeatures = {
  "type": "FeatureCollection",
  "features":[
    libraryGeoJSON,
    canteenGeoJSON
  ]
};

// 地图对象
const map = L.map("map").setView([43.82048, 125.26893], 18);
const markerLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);
const areaLayer = L.layerGroup().addTo(map);
L.geoJSON(campusFeatures).addTo(map);
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }
).addTo(map);

// 地图点击逻辑
map.on("click", (event) => {
  const latitude = event.latlng.lat;
  const longitude = event.latlng.lng;

  console.log(latitude, longitude);

  L.popup()
    .setLatLng(event.latlng)
    .setContent(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
    .openOn(map);
});

// 地点对象
const places = [
  // {
  //   name: "鼎新图书馆",
  //   category: "图书馆",
  //   latitude: 43.822624, 
  //   longitude: 125.263093
  // },
  // {
  //   name: "湖畔餐厅",
  //   category: "食堂",
  //   latitude: 43.818020,
  //   longitude:  125.267737
  // },
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

// 路线对象
const route = L.polyline([
  [43.820592, 125.2774],
  // [43.819491, 125.261976],
  [43.817014, 125.265194],
  [43.819491, 125.261976]
]).addTo(routeLayer);

// 区域范围对象
const area = L.polygon([
  [43.820949, 125.267943],
  [43.821177, 125.269048],
  [43.819803, 125.269745],
  [43.819555, 125.268736],
]).addTo(areaLayer);

// 链接DOM对象和Java对象
const placeList = document.querySelector("#place-list");
const buttons = document.querySelectorAll(".filters button");

// 点击DOM对象事件函数
function renderPlaces(category) {
  // 初始化容器
  placeList.innerHTML = "";
  markerLayer.clearLayers();
  
  // 过滤
  const filteredPlaces = places.filter((place) => {
    return category === "全部" || place.category === category;
  });

  // 过滤后对象的行为
  filteredPlaces.forEach((place) => {
    // 地图显示变化
    const marker = L.marker([place.latitude, place.longitude]).addTo(markerLayer).bindPopup(`${place.name}（${place.category}）`); 
    // DOM对象变化
    const listItem = document.createElement("li");
    listItem.textContent = `${place.name}（${place.category}）`;
    placeList.appendChild(listItem);

    // 点击地点DOM
    listItem.addEventListener("click", () => {
      map.setView([place.latitude, place.longitude], 18);
      marker.openPopup();
    });

    // 点击marker
    marker.on("click", () => {
      placeList.querySelectorAll(".active").forEach(item => {
        item.classList.remove("active");
      });
      listItem.classList.add("active");
    });
  });
}

// 监视DOM对象
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    renderPlaces(button.dataset.category);
  });
});

renderPlaces("全部");