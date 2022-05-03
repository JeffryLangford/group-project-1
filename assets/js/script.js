//const { stringify } = require("postcss");

//variables needed for weather
var beeCavesChosen = document.getElementById("bee-caves");
var southwestChosen = document.getElementById("southwest");
var downtownChosen = document.getElementById("downtown");
var northChosen = document.getElementById("north");
var southeastChosen = document.getElementById("southeast");

//variables needed for fourqsuare
var drinkEl = document.getElementById("drinks");
var entertainmentEl = document.getElementById("entertainment");
var activeEl = document.getElementById("active");
var foodEl = document.getElementById("food");
var atmosphereEl = document.getElementById("atmosphere");
var parkingEl = document.getElementById("parking");

var weatherEl = document.getElementById("weather-results");
var locationEl = document.getElementById("location-results");
var popularEl = document.getElementById("popular-events");

//variables needed for functions and functionalty
var wrapEl = document.getElementById("wrap");
var sectionEl = document.getElementById("section");
var errorEl = document.getElementById("error");
var submitButton = document.getElementById("submit-button");

//foursquare API
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3Dd7JeFQQHyDysLsuKKzrNfbaWgHDH09HMsub7/9FfFA='
  }
};

fetch('https://api.foursquare.com/v3/places/search?near=\'Austin, TX\'', options).then(response => {
  if (response.ok) {
      response.json().then(data => {
          console.log(data);
      });
  } else {
      alert("ERROR: NOT WORKING");
  }
}).catch(err => console.error(err));

//when clicking the different categories, show more specific results
drinkEl.addEventListener('click', function () {
  var drinkResults = document.getElementById("drink-results");
  if (drinkResults.classList.contains("hide")) {
  drinkResults.classList.remove("hide");
  } else{
    drinkResults.classList.add("hide");
  }
  console.log("clicked drinks");
});
entertainmentEl.addEventListener('click', function () {
  var entertainmentResults = document.getElementById("entertainment-results");
  if (entertainmentResults.classList.contains("hide")) {
  entertainmentResults.classList.remove("hide");
  } else{
    entertainmentResults.classList.add("hide");
  }
  console.log("clicked entertainment");
});
activeEl.addEventListener('click', function () {
  var activeResults = document.getElementById("active-results");
  if (activeResults.classList.contains("hide")) {
  activeResults.classList.remove("hide");
  } else{
    activeResults.classList.add("hide");
  }
  console.log("clicked active");
});
foodEl.addEventListener('click', function () {
  var foodResults = document.getElementById("food-results");
  if (foodResults.classList.contains("hide")) {
  foodResults.classList.remove("hide");
  } else{
    foodResults.classList.add("hide");
  }
  console.log("clicked food");
});
atmosphereEl.addEventListener('click', function () {
  var atmosphereResults = document.getElementById("atmosphere-results");
  if (atmosphereResults.classList.contains("hide")) {
  atmosphereResults.classList.remove("hide");
  } else{
    atmosphereResults.classList.add("hide");
  }
  console.log("clicked atmosphere");
});
parkingEl.addEventListener('click', function () {
  var parkingResults = document.getElementById("parking-results");
  if (parkingResults.classList.contains("hide")) {
  parkingResults.classList.remove("hide");
  } else {
    parkingResults.classList.add("hide");
  }
  console.log("clicked parking");
});


//testing to store miles and range
function submitResults () {
  if (!beeCavesChosen && !southeastChosen && !downtownChosen && !northChosen && !southeastChosen) {
    errorEl.classList.remove("hide");
    return;
  }
  wrapEl.classList.add("hide");
  sectionEl.classList.add("hide");
  errorEl.classList.add("hide");
  submitButton.classList.add("hide");
  weatherEl.classList.remove("hide");
  locationEl.classList.remove("hide");
  popularEl.classList.remove("hide");
}
 
//event listeners on buttons
submitButton.addEventListener('click', submitResults);