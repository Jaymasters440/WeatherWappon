$(function () {
  console.log("Hi!");
  $('#search').click(function () {
    populate($('#cityName').val());
  });

});
function populate(city) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6c5919017f7f040f339300addaf119d4"
  fetch(url)
    .then(function (response) {
      return response.json();

    })
    .then(function (data) {
      showFiveDayCard(data);
    })

}

function showFiveDayCard(data) {
  var cardHTML = ''

  for (var i = 0; i < data.list.length; i += 8) {
    var currentDay = data.list[i]
    cardHTML += `
  <div class="col">
    <div class="card">
      <div class="card-body">
      <img id="icon1"></img>
      <p>Temp: ${currentDay.main.temp}</p>
      <p>Wind: ${currentDay.wind.speed}</p>
      <p>Humidity: ${currentDay.main.humidity}</p>
      </div>
    </div>
  </div>
  `
  }

  $("#five-day-section").html(cardHTML)
}