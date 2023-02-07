$(function () {
  console.log("Hi!");
  $('#search').click(function () {
    var buttonHtml = `<button id="placeholder" class="row placeholder">`+$('#cityName').val()+`</button>`;
    $("#previous").prepend(buttonHtml);
    $("#previous").children().eq(0).click(function(){
      populate(this.textContent);
    })
    populate($('#cityName').val());
  });

});
function populate(city) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6c5919017f7f040f339300addaf119d4"
  fetch(url)
    .then(function (response) {
      if (response.status === 404) {
        alert("Invalid City Name");
      }
      
      return response.json();

    })
    .then(function (data) {  
      
      
      showFiveDayCard(data);
     
      
    })
 
}
function convertK(k){
  return (((k-273.15)*1.8)+32).toFixed(2  );
}
function showFiveDayCard(data) {
  var cardHTML = ''
  $("#temp1").html("Temp: "+convertK(data.list[0].main.temp));
  $("#wind1").html("Wind: "+data.list[0].wind.speed);
  $("#humidity1").html("Humidity: "+data.list[0].main.humidity);
  for (var i = 7; i < data.list.length; i += 8) {
    var currentDay = data.list[i];
    console.log(currentDay);
    cardHTML +=

      `<div class="col">    
        <div class="card">
          <div class="card-body">
            <img id="icon1"></img>
            <p>Temp: ${convertK(currentDay.main.temp)}</p>
            <p>Wind: ${currentDay.wind.speed}</p>
            <p>Humidity: ${currentDay.main.humidity}</p>
          </div>
        </div>
      </div>`

  }

  $("#five-day-section").html(cardHTML);
}