let pinDatabase = [];

let newPinData;

let randomNumbers;

let inputePin;

function generatePin() {
  randomNumbers = Math.floor(
    100000000000 + Math.random() * 900000000000
  ).toString();
  inputePin = document.getElementById("generatedPin");
  inputePin.value = randomNumbers;
}

function savePin() {
  inputePin.value = "";
  newPinData = {
    network: network.value,
    amount: amount.value,
    pin: "",
    status: "Unused",
    dateCreated: new Date().toLocaleString(),
    dateUsed: "Not used",
  };
  if (network.value === "MTN") {
    newPinData.pin = `*904*${randomNumbers}#`;
  } else if (network.value === "Airtel") {
    newPinData.pin = `*444* ${randomNumbers}#`;
  } else if (network.value === "Glo") {
    newPinData.pin = `*123* ${randomNumbers}#`;
  } else if (network.value === "Etisalat") {
    newPinData.pin = `*311*${randomNumbers}#`;
  } else if (network.value === "Smile") {
    newPinData.pin = `*450* ${randomNumbers}#`;
  } else {
    alert("Network is not selected");
  }
  pinDatabase.push(newPinData);

  updateUI();
}
function updateUI() {
  pinTable.innerHTML = "";

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
function del(index) {
  pinDatabase.splice(index, 1);
  updateUI();
}

function recharge() {
  let index = pinDatabase.findIndex(
    (check) => check.pin === enteredPin.value.trim()
  );
  if (index !== -1) {
    let today = new Date().toLocaleDateString();
    pinDatabase[index].status = "used";
    pinDatabase[index].dateUsed = today;
    alert(
      `Your ${pinDatabase[index].network} Recharge of #${pinDatabase[index].amount} airtime is Successful!`
    );
    updateUI();
  } else {
    alert("pin not found");
  }

  updateUI();
}
