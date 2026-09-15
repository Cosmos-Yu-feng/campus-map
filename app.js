

const map = L.map("map").setView([43.88, 125.30], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap"
}).addTo(map);


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