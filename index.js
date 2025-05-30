let pinDatabase = [];

let newPinData, randomNumbers, inputePin;

document.getElementById("generate").addEventListener("click", () => {
  randomNumbers = Math.floor(
    100000000000 + Math.random() * 900000000000
  ).toString();
  inputePin = document.getElementById("generatedPin");
  inputePin.value = randomNumbers;
});

function getUssdCode(network, pin) {
  const ussdMap = {
    MTN: `*904*${pin}#`,
    Airtel: `*444*${pin}#`,
    Glo: `*123*${pin}#`,
    Etisalat: `*311*${pin}#`,
    Smile: `*450*${pin}#`,
  };

  // Return the USSD code corresponding to the selected network
  return ussdMap[network];
}

function savePin() {
  // Retrieve the selected network and amount from the input fields
  const selectedNetwork = network.value;
  const selectedAmount = amount.value;

  //validate that a network or an amount is selected by the user
  if (!selectedNetwork || !selectedAmount) {
    alert("Please select a network and/or an amount first.");
    return;
  }

  inputePin.value = "";

  const ussdCode = getUssdCode(selectedNetwork, randomNumbers);

  // Validate that a valid USSD code was generated
  if (!ussdCode) {
    alert("Invalid network selected.");
    return;
  }

  // Create a new object to store the PIN data
  const newPinData = {
    network: selectedNetwork,
    amount: selectedAmount,
    pin: ussdCode,
    status: "unused",
    dateCreated: new Date().toLocaleString(),
    dateUsed: "Not used",
  };

  // Add the new PIN data to the database array
  pinDatabase.push(newPinData);

  // Update the user interface to show the new data
  updateUI();
}

function updateUI() {
  pinTable.innerHTML = pinDatabase
    .map(
      (pin, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${pin.network}</td>
      <td>${pin.amount}</td>
      <td>${pin.pin}</td>
      <td>${pin.status}</td>
      <td>${pin.dateCreated}</td>
      <td>${pin.dateUsed}</td>
      <td><button onclick="del(${i})">Delete</button></td>
    </tr>
  `
    )
    .join("");
}
//Delete functioin and Confirmation of delete first
function del(index) {
  const userConfirmed = confirm("Are you sure you want to delete?");

  if (userConfirmed) {
    pinDatabase.splice(index, 1);
    updateUI();
  }
}

function recharge() {
  let index = pinDatabase.findIndex(
    (check) => check.pin === enterPin.value.trim()
  );

  if (index !== -1) {
    if (pinDatabase[index].status === "used") {
      alert("This recharge pin has already been used!");
      return;
    }

    let today = new Date().toLocaleDateString();
    pinDatabase[index].status = "used";
    pinDatabase[index].dateUsed = today;

    alert(
      `Your ${pinDatabase[index].network} recharge of #${pinDatabase[index].amount} airtime is successful!`
    );

    updateUI();
  } else {
    alert("Pin not found!");
  }
}

