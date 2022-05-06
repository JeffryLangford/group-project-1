// global variable for selected zone. value assigned by submit button.
var zoneSelected;

//variables needed for fourqsuare
var drinkEl = document.getElementById("drinks");
var entertainmentEl = document.getElementById("entertainment");
var activeEl = document.getElementById("active");
var foodEl = document.getElementById("food");
var atmosphereEl = document.getElementById("atmosphere");
var parkingEl = document.getElementById("parking");
var weatherEl = document.getElementById("weather-results");
var locationEl = document.getElementById("location-results");
var popularEl = document.getElementById("popular-places");
var locationResultsListEl = document.querySelector("#location-results-list");
var popularResultsListEl = document.querySelector("#popular-places");

//variables needed for functions and functionalty
var wrapEl = document.getElementById("wrap");
var sectionEl = document.getElementById("section");
var errorEl = document.getElementById("error");
var submitButton = document.getElementById("submit-button");
var goBackButton = document.getElementById("go-back-button");

// zone objects 
const downtownAustin = {
  lat: "30.267672625429736",
  lon: "-97.74555522257333"
};

const southEastAustin = {
  lat: "30.211144002203703",
  lon: "-97.70288903062384"
};

const southWestAustin = {
  lat: "30.219860121093262",
  lon: "-97.83423339078256"
};

const northAustin = {
  lat: "30.346023074489636",
  lon: "-97.71761880559511"
};

const beeCaves = {
  lat: "30.336543064363642",
  lon: "-97.96179871839252"
};

// FOURSQUARE API

// foursquare authourization setup
const optionsFoursquare = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3Dd7JeFQQHyDysLsuKKzrNfbaWgHDH09HMsub7/9FfFA='
  }
};

// get most popular places based off of a zone and category
const placeSelectionHandler = (zone, category) => {
  // grab lattitude and longitude from selected zone
  let lat = zone.lat;
  let lon = zone.lon;

  // set api url results parameters based off of user selection
  let apiUrlSelection = `https://api.foursquare.com/v3/places/search?categories=${category}&ll=${lat}%2C${lon}&radius=8047&sort=rating&limit=15`;
  
  // api url for top places of category in all austin
  let apiUrlPopular = `https://api.foursquare.com/v3/places/search?categories=${category}&ll=30.266666%2C-97.733330&radius=48281&sort=rating`;
  
  // get api with specified information
  fetch(apiUrlSelection, optionsFoursquare).then(response => {
    if (response.ok) {
        response.json().then(data => {
          // display the desired info from results
          displayPlacesSelection(data['results'], locationResultsListEl);
        });
    } else {
        alert("ERROR: LINK NOT FOUND");
    }
  }).catch(err => console.error(err));
 
  // get api with general information
  fetch(apiUrlPopular, optionsFoursquare).then(response => {
    if (response.ok) {
        response.json().then(data => {
          // display the desired info from results
          displayPlacesSelection(data['results'], popularResultsListEl);
        });
    } else {
        alert("ERROR: LINK NOT FOUND");
    }
  }).catch(err => console.error(err));
};

// handler for converting chosen zone to zone object
const selectZoneHandler = zone => {
  switch(zone) {
    case "bee-caves":
      return beeCaves;

    case "southwest":
      return southWestAustin;

    case "downtown":
      return downtownAustin;

    case "north":
      return northAustin;

    case "southeast":
      return southEastAustin;

    default:
      return false;
  }
};

const selectCategoryHandler = category => {
  // set category ID#s based off of selected category
  let categoryIds;
  switch (category) {
    case "drinks":
      categoryIds = "13003%2C13029%2C13032%2C13038%2C13050%2C13059%2C13381%2C13387";
      break;
    case "entertainment":
      categoryIds = "10000,10001,10002,10003,10006,10010,10013,10015,10017,10022,10023";
      break;
    case "active":
      categoryIds = "18000";
      break;
    case "food":
      categoryIds = "13001,13002,13040,13052,13053,13054,13065,13382";
      break;
    case "outdoors":
      categoryIds = "16000";
      break;
  }

  return categoryIds;
};

// display results in selected list element
const displayPlacesSelection = (results, listEl) => {

  for (let i = 0; i < results.length; i++) {
    // grab information for list elements
    let currentPlaceName = results[i]["name"];
    let currentPlaceLocation = `${results[i]["location"]["address"]}, ${results[i]["location"]["locality"]}, ${results[i]["location"]["region"]} ${results[i]["location"]["postcode"]}`;
    let urlQuery = `https://google.com/search?q=${currentPlaceName.replace(/ /g, "+")}+${currentPlaceLocation.replace(/ /g, "+")}`;
    
    // create list element to append the information to
    let placesListItemEl = document.createElement("li")
    
    // create link for list
    let placeLinkEl = document.createElement("a");
    placeLinkEl.classList.add("text-blue-500", "hover:blue-700", "hover:underline", "nobullet");
    placeLinkEl.href = urlQuery;
    placeLinkEl.target = "_blank";
    placeLinkEl.innerText = `${i+1}). ${currentPlaceName} - ${currentPlaceLocation}`;

    // append link to list item el
    placesListItemEl.appendChild(placeLinkEl);

    // append list item el to list el
    listEl.appendChild(placesListItemEl);
  }
};

//when the submit button is clicked, change the page to the results page
function submitResults () {
  // grab selected zone
  var locationSelectorEl = document.getElementsByName('location-selector');
  var selectedLocationEl = Array.from(locationSelectorEl).find(location => location.checked);

  // grab selected category
  var categorySelectorEl = document.getElementsByName('category-selector');
  var selectedCategoryEl = Array.from(categorySelectorEl).find(category => category.checked);
  
  // make sure zone was selected
  //if a location isn't selected, then the user is told to select one
  if (!selectedLocationEl || !selectedCategoryEl) {
    errorEl.classList.remove("hide");
    return;
  }
  
  // hide welcome page
  wrapEl.classList.add("hide");
  sectionEl.classList.add("hide");
  errorEl.classList.add("hide");
  submitButton.classList.add("hide");

  // reveal display page
  weatherEl.classList.remove("hide");
  locationEl.classList.remove("hide");
  popularEl.classList.remove("hide");
  goBackButton.classList.remove("hide");
    
  // get selected zone object
  zoneSelected = selectZoneHandler(selectedLocationEl.value);

  // get selected category
  let selectedCategory = selectCategoryHandler(selectedCategoryEl.value);
  
  // find and display places in selected zone
  placeSelectionHandler(zoneSelected, selectedCategory);
};

function goBack () {
  location.reload();
};
 
// CATEGORY SPECIFICATION TO BE ADDED

//when clicking the different categories, show more specific results
// drinkEl.addEventListener('click', function () {
//   var drinkResults = document.getElementById("drink-results");
//   if (drinkResults.classList.contains("hide")) {
//   drinkResults.classList.remove("hide");
//   } else {
//     drinkResults.classList.add("hide");
//   }
//   console.log("clicked drinks");
// });

// entertainmentEl.addEventListener('click', function () {
//   var entertainmentResults = document.getElementById("entertainment-results");
//   if (entertainmentResults.classList.contains("hide")) {
//   entertainmentResults.classList.remove("hide");
//   } else {
//     entertainmentResults.classList.add("hide");
//   }
//   console.log("clicked entertainment");
// });

// activeEl.addEventListener('click', function () {
//   var activeResults = document.getElementById("active-results");
//   if (activeResults.classList.contains("hide")) {
//   activeResults.classList.remove("hide");
//   } else {
//     activeResults.classList.add("hide");
//   }
//   console.log("clicked active");
// });

// foodEl.addEventListener('click', function () {
//   var foodResults = document.getElementById("food-results");
//   if (foodResults.classList.contains("hide")) {
//   foodResults.classList.remove("hide");
//   } else {
//     foodResults.classList.add("hide");
//   }
//   console.log("clicked food");
// });

// atmosphereEl.addEventListener('click', function () {
//   var atmosphereResults = document.getElementById("atmosphere-results");
//   if (atmosphereResults.classList.contains("hide")) {
//   atmosphereResults.classList.remove("hide");
//   } else {
//     atmosphereResults.classList.add("hide");
//   }
//   console.log("clicked atmosphere");
// });

// parkingEl.addEventListener('click', function () {
//   var parkingResults = document.getElementById("parking-results");
//   if (parkingResults.classList.contains("hide")) {
//   parkingResults.classList.remove("hide");
//   } else {
//     parkingResults.classList.add("hide");
//   }
//   console.log("clicked parking");
// });


//event listeners on buttons
submitButton.addEventListener('click', submitResults);
goBackButton.addEventListener('click', goBack);
