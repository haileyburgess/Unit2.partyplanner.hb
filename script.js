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

//posting new party to the api
async function addParty(event) {
    event.preventDefault();

await createParty(
    addPartyForm.name.value,
    addPartyForm.description.value,
    addPartyForm.date.value,
    addPartyForm.location.value
);
}

    // const name = document.querySelector("#name").value;
    // const description = document.querySelector("#description").value;
    // const date = document.querySelector("#date").value;
    // const location = document.querySelector("#location").value;
    
console.log(JSON.stringify({ name, description, date, location}));
async function  createParty(name, description, date,location) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name, description, date, location }),
      });
      const newParty = await response.json();
      console.log(newParty);

      state.parties.push(newParty);

      renderParties();

    } catch (error) {
      console.error(error);
    }
  }

  //add parties using the addParty form in the html
  const addPartyForm = document.querySelector("#addParty");
  addPartyForm.addEventListener("submit", addParty);
    render();