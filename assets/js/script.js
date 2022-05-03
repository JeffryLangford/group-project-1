var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

var drinkTarget = document.getElementById("drinks");
var entertainmentTarget = document.getElementById("entertainment");
var activeTarget = document.getElementById("active");
var foodTarget = document.getElementById("food");
var atmosphereTarget = document.getElementById("atmosphere");
var parkingTarget = document.getElementById("parking");

output.innerHTML = slider.value; // Display the default slider value

// zone objects 
const downtownAustin = {
  lat: "30.267672625429736",
  lon: "-97.74555522257333"
}

const southEastAustin = {
  lat: "30.211144002203703",
  lon: "-97.70288903062384"
}

const southWestAustin = {
  lat: "30.219860121093262",
  lon: "-97.83423339078256"
}

const northAustin = {
  lat: "30.346023074489636",
  lon: "-97.71761880559511"
}

const beeCaves = {
  lat: "30.336543064363642",
  lon: "-97.96179871839252"
}


// FOURSQUARE API
// foursquare authourization key: 'fsq3Dd7JeFQQHyDysLsuKKzrNfbaWgHDH09HMsub7/9FfFA='

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3Dd7JeFQQHyDysLsuKKzrNfbaWgHDH09HMsub7/9FfFA='
  }
};

fetch('https://api.foursquare.com/v3/places/search?near=\'Austin, TX\'&categories=10000&sort=rating', options).then(response => {
  if (response.ok) {
      response.json().then(data => {
        
          console.log(data['results']);
      });
  } else {
      alert("ERROR: NOT WORKING");
  }
}).catch(err => console.error(err));

// get most popular places based off of a zone and category


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

