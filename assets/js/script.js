var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

var drinkTarget = document.getElementById("drinks");
var entertainmentTarget = document.getElementById("entertainment");
var activeTarget = document.getElementById("active");
var foodTarget = document.getElementById("food");
var atmosphereTarget = document.getElementById("atmosphere");
var parkingTarget = document.getElementById("parking");

output.innerHTML = slider.value; // Display the default slider value

// FOURSQUARE API REQUEST
// foursquare Places API key fsq3Dd7JeFQQHyDysLsuKKzrNfbaWgHDH09HMsub7/9FfFA=


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

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

drinkTarget.addEventListener('click', function () {
  var drinkResults = document.getElementById("drink-results");
  drinkResults.classList.remove("hide");
  console.log("clicked drinks");
});
entertainmentTarget.addEventListener('click', function () {
  var entertainmentResults = document.getElementById("entertainment-results");
  entertainmentResults.classList.remove("hide");
  console.log("clicked entertainment");
});
activeTarget.addEventListener('click', function () {
  var activeResults = document.getElementById("active-results");
  activeResults.classList.remove("hide");
  console.log("clicked active");
});
foodTarget.addEventListener('click', function () {
  var foodResults = document.getElementById("food-results");
  foodResults.classList.remove("hide");
  console.log("clicked food");
});
atmosphereTarget.addEventListener('click', function () {
  var atmosphereResults = document.getElementById("atmosphere-results");
  atmosphereResults.classList.remove("hide");
  console.log("clicked atmosphere");
});
parkingTarget.addEventListener('click', function () {
  var parkingResults = document.getElementById("parking-results");
  parkingResults.classList.remove("hide");
  console.log("clicked parking");
});

