//define API URI to fetch from
const COHORT = "2502-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//define initial state
const state = {
  parties: [],
};

//grab parties from the id=parties as created in the form in the html
const partiesList = document.querySelector("#parties");

// Function to add a party to the list
function addPartyToList(party) {
    const partyItem = document.createElement("li");
    partyItem.textContent = party.name; // Assuming each party object has a 'name' property
    partiesList.appendChild(partyItem);
}

//render parties from state
function renderParties() {
  if (!state.parties.length) {
    partiesList.innerHTML = `<li>No parties found.</li>`;
    return;
  }
// Add fetched parties to the list
state.parties.forEach(addPartyToList);
}

//update initial state with recipies fetched from API
async function getParties() {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log(result);
      state.parties = result.data;
      console.log(state.parties);
    } catch (error) {
      console.error(error);
    }
  }

  //render
async function render() {
    await getParties();
    console.log("after fetching parties:", state.parties);
    renderParties();
  }

  //add parties using the addParty form in the html
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);
  render();

//create elements on the page for each party

// Loop through the parties and create <li> elements
// state.parties.forEach((party) => {
//   const partyItem = document.createElement("li");
//   partyItem.textContent = party.name; // Assuming each party object has a 'name' property
//   partiesList.appendChild(partyItem);
// });
