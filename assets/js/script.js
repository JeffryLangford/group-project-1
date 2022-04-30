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

console.log(options);