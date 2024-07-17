// http://api.weatherapi.com/v1/forecast.json?key=${myK}&q=${value}&days=3
// 2efe720e2bf24f669f3235056240907


//& ----------------------------Select Html Elements----------------------------
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const rowData = document.querySelector("#rowData")



//& variabels
const myK = "2efe720e2bf24f669f3235056240907";

//& ----------------------------Functions-----------------------------

//^ Fetch Api

async function callApi(value) {
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myK}&q=${value}&days=3`); 
  let apiData = await response.json();
    display(apiData)
}

//^ Display Html

function display(apiData) {
  
  //* vars

  let array = apiData.forecast.forecastday
  let location = apiData.location.name
  let cartona = ``
  
  //* Looping
  
  for (let i = 0; i < array.length; i++) {
   let x =  getUserDate(array[i].date)
    cartona += `
      <div class="col-md-4 forecast p-0">
        <div class="forecast-header p-3 d-flex align-items-center justify-content-between">
  <p class="day">${x.day}</p>
  <p>${ i < 1 ? x.month : ""}</p>
</div>
<div class="forecast-body p-3">
  <p class="location">${ i < 1 ? location : ""}</p>
  <div class="degree">
      <div class="num me-4 d-inline-block">
      ${ i < 1 ? apiData.current.temp_c : array[i].day.avgtemp_c}
       <sub>o</sub>C
      </div>
      <div class="forecast-icon d-inline-block mb-2">
          <img src=${apiData.current.condition.icon} width="90" alt="">
      </div>
  </div>
  <p class="custom mb-5">${apiData.current.condition.text}</p>
 <div>
  ${
    i < 1
      ? ` <span class="me-2">
      <img src="./images/icon-umberella.png" alt="">
      
      %
  </span>
  <span class="me-2">
      <img src="./images/icon-wind.png" alt="">
       Kph
  </span>
  <span class="me-2">
      <img src="./images/icon-compass.png" alt="">
      
  </span>`
      : ""
  }
 </div>
</div>
    </div>
    `;
  }
  rowData.innerHTML = cartona
}

//^ get date 
function getUserDate(x) {
  let data = new Date(x);
  let day = data.toLocaleString("en-Us",{weekday: "long"})
  let month = data.toLocaleString("en-Us",{month: "long"})
  return {
    day,
    month,
  }
}

// & ----------------------------Events----------------------------


searchInput.addEventListener("input",(e)=>{
if (e.target.value.length < 3) return
callApi(e.target.value)
})