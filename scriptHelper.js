// Write your helper functions here!
try {
    require('isomorphic-fetch');
} catch (e) {
    // do nothing
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */

    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput === '') {
        return 'Empty';
    } else if (isNaN(Number(testInput))) {
        return 'Not a Number';
    } else {
        return 'Is a Number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    // validate data
    const inputValues = [pilot, copilot, fuelLevel, cargoLevel];
    for (let i = 0; i < inputValues.length; i++) {
        if (validateInput(inputValues[i]) === 'Empty') {
            alert('All fields are required');
            return;
        }
    }

    if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert('Enter valid information for each field');
        return;
    }

    fuelLevel = Number(fuelLevel);
    cargoLevel = Number(cargoLevel);
   
    const pilotStatus = document.getElementById("pilotStatus");
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;

    const copilotStatus = document.getElementById("copilotStatus");
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    const fuelStatusContainer = document.getElementById("fuelStatus");
    const cargoStatusContainer = document.getElementById("cargoStatus");
    const statusContainer = document.getElementById("launchStatus");

    let isReady = true;

    if (fuelLevel < 10000) {
        fuelStatusContainer.innerHTML = 'Fuel level too low for launch';
        isReady = false;
    } else {
        fuelStatusContainer.innerHTML = 'Fuel level high enough for launch';
    }

    if (cargoLevel > 10000) {
        cargoStatusContainer.innerHTML = "Cargo mass too heavy for launch";
        isReady = false;
    } else {
        cargoStatusContainer.innerHTML = "Cargo mass low enough for launch";
    }

    if (!isReady) {
        statusContainer.innerHTML = "Shuttle Not Ready for Launch";
        statusContainer.style.color = "rgb(199, 37, 78)";
    } else {
        statusContainer.innerHTML = "Shuttle is ready for launch";
        statusContainer.style.color = "rgb(65, 159, 106)";
    }

    list.style.visibility = "visible";

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    const idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

try {
    module.exports.addDestinationInfo = addDestinationInfo;
    module.exports.validateInput = validateInput;
    module.exports.formSubmission = formSubmission;
    module.exports.pickPlanet = pickPlanet; 
    module.exports.myFetch = myFetch;
} catch (e) {
    // do nothing
}