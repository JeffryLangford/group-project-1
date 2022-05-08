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
var popularResultsListEl = document.querySelector("#popular-places-list");
var weatherResultsListEl = document.querySelector("#weather-results-list");

//variables needed for functions and functionalty
var heroEl = document.getElementById("hero");
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

// OPENWEATHERMAPS API
const weatherApi = '54a0c119a5115d192186a1c181e307e9';

// get weather based off zone
const getWeatherHandler = (zone) => {
  // grab lattitude and longitude from selected zone
  let lat = zone.lat;
  let lon = zone.lon;

  //// set api for hourly weather based off user place selection
  let apiUrlSelection = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${weatherApi}&units=imperial`;

  // get api with specified information
  fetch(apiUrlSelection).then(response => {
    if (response.ok) {
      response.json().then(data => {
        displayPlacesWeather(data);
      });
    } else {
      alert("ERROR: LINK NOT FOUND");
    }
  }).catch(err => console.error(err));
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
  let apiUrlSelection = `https://api.foursquare.com/v3/places/search?categories=${category}&ll=${lat}%2C${lon}&radius=8047&sort=rating&limit=16`;
  
  // api url for top places of category in all austin
  let apiUrlPopular = `https://api.foursquare.com/v3/places/search?categories=${category}&ll=30.266666%2C-97.733330&radius=48281&sort=rating&limit=8`;
  
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
      categoryIds = "13003,13029,13032,13038,13050,13059,13381,13387";
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

const displayPlacesWeather = (weatherResults) => {
  
  let weatherContentEl = document.createElement('div');

  for (var i = 0; i < 5; i++) {
    let temp = weatherResults['hourly'][i]['temp'];
    
    let weatherTempEl = document.createElement("h4");
    weatherTempEl.classList.add("font-bold", "text-xl", "mb-2");
    weatherTempEl.innerText = temp;    
    
    //weatherContentEl.appendChild(weatherTempEl);
  };

  weatherEl.appendChild(weatherContentEl);
};

// display weather results
//const displayPlacesWeather = (weatherResults) => {
  //let hourlyWeather = weatherResults;
  //let weatherUrl = 'https://weather.com/weather/today/l/356294623afa50086ac48c7d81d64f3deecdf8e3a5eb152599c2e0f30622bd72'


  // create list element to append weather info to
  //let weatherLinkEl = document.createElement('a');

  //weatherLinkEl.href = weatherUrl;
  //weatherLinkEl.target = "_blank";
  //weatherLinkEl.innerText = hourlyWeather;

  // append weather link to <a> element
  //weatherEl.appendChild(weatherLinkEl);/
//};

// display results in selected list element
const displayPlacesSelection = (results, listEl) => {

  for (let i = 0; i < results.length; i++) {
    
    // get fsq_id
    let fsq_id = results[i]['fsq_id'];

    // set api urls
    let imgsApiUrl = `https://api.foursquare.com/v3/places/${fsq_id}/photos?sort=POPULAR&limit=1`;
    let tipsApiUrl = `https://api.foursquare.com/v3/places/${fsq_id}/tips?sort=POPULAR&limit=1`;

    // fetch image for each place
    fetch(imgsApiUrl, optionsFoursquare).then(response => {
      if (response.ok) {
        response.json().then(imgData => {
          // fetch tip info for each place          
          fetch(tipsApiUrl, optionsFoursquare).then(response => {
            if (response.ok) {
              response.json().then(tipData => {
                // builds card with all data
                buildPlaceCardEl(results[i], imgData, tipData, listEl);
              });
            } else {
              let tipData;
              // builds card with no tip data available
              buildPlaceCardEl(results[i], imgData, tipData, listEl)
            }
          }).catch(err => console.error(err));
        });
      } else {
        let imgData;
        // fetch tip info for each place if no image is found         
        fetch(tipsApiUrl, optionsFoursquare).then(response => {
          if (response.ok) {
            response.json().then(tipData => {
              // builds card with tip data but no image data
              buildPlaceCardEl(results[i], imgData, tipData, listEl);
            });
          } else {
            // builds card with no tip data or image data
            let tipData;
            buildPlaceCardEl(results[i], imgData, tipData, listEl);
          }
        }).catch(err => console.error(err));
      }
    }).catch(err => console.error(err));
  
  }
};

// build place cards in function to pass to continue to build if some info doesn't exist 
const buildPlaceCardEl = (result, imgData, tipData, listEl) => {
  // grab information for list elements
  let currentPlaceName = result["name"];
  let currentPlaceLocation = `${result["location"]["address"]}, ${result["location"]["locality"]}, ${result["location"]["region"]} ${result["location"]["postcode"]}`;
  let urlQuery = `https://google.com/search?q=${currentPlaceName.replace(/ /g, "+")}+${currentPlaceLocation.replace(/ /g, "+")}`;
  
  // create link for list items
  let placeLinkEl = document.createElement("a");
  placeLinkEl.href = urlQuery;
  placeLinkEl.target = "_blank";
  
  // create card element to append the information to
  let placesCardEl = document.createElement("div");
  placesCardEl.classList.add("max-w-sm", "rounded", "overflow-hidden", "shadow-lg", "bg-green-100");

  // create card image
  let imgUrl;
  if (imgData){
    if (imgData.length) {
      imgUrl = `${imgData[0]['prefix']}original${imgData[0]['suffix']}`;
    }
  }
  let cardImgEl = document.createElement("img");
  cardImgEl.classList.add("w-full", "card-img");
  cardImgEl.src = imgUrl || './assets/images/no-image-stock.png';
  placesCardEl.appendChild(cardImgEl);

  // div for text content
  let cardContentEl = document.createElement("div");
  cardContentEl.classList.add("px-6", "py-4");

  // create heading
  let cardTitleEl = document.createElement("h2");
  cardTitleEl.classList.add("font-bold", "text-xl", "mb-2");
  cardTitleEl.innerText = currentPlaceName;
  cardContentEl.appendChild(cardTitleEl);

  // get tips for place
  let tipText;
  if (tipData) {
    if(tipData.length) {
      tipText = tipData[0]['text'];
    }
  }
  let cardTipsEl = document.createElement("div");
  cardTipsEl.classList.add("italic", "text-gray-700", "text-base");
  cardTipsEl.innerText = tipText  || "No current tips available.\n Click this card to search for more information!";
  cardContentEl.appendChild(cardTipsEl);

  // get address for place
  let cardAddressEl = document.createElement("address");
  cardAddressEl.classList.add("font-bold", "text-md", "mt-2");
  cardAddressEl.innerText = `Address: ${currentPlaceLocation}`;
  cardContentEl.appendChild(cardAddressEl);

  // append card content (title, tip, address) to card
  placesCardEl.appendChild(cardContentEl);

  // create div to hold categories
  let categoriesEl = document.createElement("div");
  categoriesEl.classList.add("px-6", "pt-4", "pb-2");

  // create spans for each category
  let categories = result['categories'];
  let buildCategorySpan = (index) => {
    let catSpanEl = document.createElement("span");
    catSpanEl.classList.add("inline-block", "bg-gray-200", "rounded-full", "px-3", "py-1", "text-sm", "font-semibold", "text-gray-700", "mr-2", "mb-2");
    catSpanEl.innerText = `#${categories[index]['name']}`;
    // append span to categories div
    categoriesEl.appendChild(catSpanEl);
  }
  if (categories.length > 0) {
    // multiple categories
    for (let catNum = 0; catNum < categories.length; catNum++) {
      buildCategorySpan(catNum);
    }
  } else {
    if (categories[0]) {
      // single category
      buildCategorySpan(0);
    }
  }

  // append categories to card
  placesCardEl.appendChild(categoriesEl);


  // append card to link
  placeLinkEl.appendChild(placesCardEl);

  // append list item el to list el
  listEl.appendChild(placeLinkEl);
}

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
  heroEl.classList.add("hide");
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

  // find and display weather in selected zone
  getWeatherHandler(zoneSelected);

  // find and display places in selected zone
  placeSelectionHandler(zoneSelected, selectedCategory);
};

// reloads page when passed in go back button
function goBack () {
  location.reload();
};

//event listeners on buttons
submitButton.addEventListener('click', submitResults);
goBackButton.addEventListener('click', goBack);
 

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