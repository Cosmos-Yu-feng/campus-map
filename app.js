
console.log("脚本开始执行");

// 配置对象的回调函数逻辑
function handleFeature(feature, layer){
  if (feature.geometry.type === "LineString"){
    layer.bindPopup(`${feature.properties.name}`);
    layer.addTo(routeLayer);
  }
  else if (feature.geometry.type === "Polygon"){
    layer.bindPopup(`${feature.properties.name}`);
    layer.addTo(areaLayer);
  }
};

// 地图对象
const map = L.map("map").setView([43.82048, 125.26893], 18);
const markerLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);
const areaLayer = L.layerGroup().addTo(map);
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }
).addTo(map);

// 创建外部数据变量
let campusFeatures = [];

// 读取geojson数据
fetch("./campus.geojson")
  .then((response) => response.json())
  .then((data) => {
    campusFeatures = data.features;
    L.geoJSON(data, {onEachFeature: (feature, layer) => 
      handleFeature(feature, layer)
    });
    renderPlaces("全部");
  })
  .catch((error) => {
    console.error("GeoJSON 加载失败：", error);
  });


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

// 链接DOM对象和Java对象
const placeList = document.querySelector("#place-list");
const buttons = document.querySelectorAll(".filters button");

// 点击DOM对象事件函数
function renderPlaces(category) {
  // 初始化容器
  placeList.innerHTML = "";
  markerLayer.clearLayers();
  
  // 过滤
  const filteredFeatures = campusFeatures.filter((feature) => {
    return (feature.geometry.type === "Point") && 
    (category === "全部" || feature.properties.category === category);
  });

  // 过滤后对象的行为
  filteredFeatures.forEach((feature) => {
    
    // 地图显示变化
    const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
    .addTo(markerLayer)
    .bindPopup(`${feature.properties.name}（${feature.properties.category}）`);

    // DOM对象变化
    const listItem = document.createElement("li");
    listItem.textContent = `${feature.properties.name}（${feature.properties.category}）`;
    placeList.appendChild(listItem);

    // 点击地点DOM
    listItem.addEventListener("click", () => {
      map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 18);
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
