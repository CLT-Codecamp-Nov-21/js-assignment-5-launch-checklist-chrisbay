// Write your JavaScript code here!

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       const planet = pickPlanet(listedPlanets);
       console.log(planet);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
   });

   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";

   const form = document.getElementById("the-form");
   form.addEventListener("submit", function(event) {
       event.preventDefault();

       const pilotName = document.getElementById("pilotName").value;
       const copilotName = document.getElementById("copilotName").value;
       const fuelLevel = document.getElementById("fuelLevel").value;
       const cargoMass = document.getElementById("cargoMass").value;

       formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
   });
   
});