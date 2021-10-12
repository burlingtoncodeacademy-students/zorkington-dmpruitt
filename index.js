const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

let prompt = "\n >_ ";

class Room {
  constructor(name, description, connectionsArray, inventoryArray) {
    this.name = name;
    this.descr = description;
    this.connections = connectionsArray || [];
    this.inventory = inventoryArray || [];
  }
  inv() {
    return `${this.name} current inventory is: ${this.inventory.join(", ")} `; // returns requested inventory
  }
}
class Items {
  constructor(name, description, movable, whenAdded) {
    this.name = name;
    this.description = description;
    this.movable = movable || true;
    this.whenAdded = whenAdded;
  }
  take() {
    if (this.movable) {
      // currentPlayer.inventory.push(this.name)
      return `You have picked up the ${this.name} \n${this.whenAdded}`;
    } else {
      return `You cannot that the ${this.name}`;
    }
  }
}

class Player {
  constructor(name, inventoryArray, statusBool) {
    this.name = name || "PlayerOne";
    this.inventory = inventoryArray || [];
    this.status = statusBool || true; // Player true = playing game, false = end of game
  }
  inv() {
    return `Your current inventory is: ${this.inventory.join(", ")} `; // returns requested inventory
  }
  // takes item from current location and places it in player's inventory
  take(item) {
    if (lookupTable[item] === item) {
      let yoink = currentLocation.inventory.splice(
        currentLocation.inventory.indexOf(item),
        1
      );
      yoink = yoink.join();
      console.log(`You have picked up the ${yoink}.`);
      this.inventory.push(yoink);
    } else {
      return console.log(`You cannot take the ${item}.`);
    }
  }
  // takes item from current player and places it in location's inventory
  drop(item) {
    let droppedItem = this.inventory.splice(this.inventory.indexOf(item), 1);
    currentLocation.inventory.push(droppedItem[0]);
    return console.log(`You have dropped the ${item}.`);
  }
}

let sign = new Items(
  "Sign",
  "Welcome to Burlington Code Academy! Come on up to the third floor.\nIf the door is locked, use the code 12345.",
  false,
  "That would be selfish. How will other students find their way?"
);

let sword = new Items("sword", "Shiny and sharp", true, "Oooo, pretty!");

let startRoom = new Room(
  "startRoom",
  "182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.",
  ["foyer"],
  ["sign", "sword"]
);

let roomTwo = new Room(
  "roomTwo",
  "Like any other room2 in the area",
  ["Foyer", "roomThree"],
  []
);
let roomThree = new Room(
  "foyer",
  "Like any other foyer in the area",
  ["startRoom", "roomThree"],
  []
);

let currentLocation = startRoom;

let currentPlayer = new Player();

let lookupTable = {
  sign: "sign",
  sword: "sword",
};

let transitions = {
  startRoom: ["foyer"],
  foyer: ["startRoom", "roomTwo"],
  roomTwo: ["foyer", "roomThree"],
};

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. `;

  let answer = await ask(`${welcomeMessage} ${prompt}`);

  while (answer !== "exit") {
    answer = await ask(`Sorry, I don't know how to ${answer} ${prompt}`);
  }
  process.exit();
}

start();

// I will be coming back to finish this project once I have a better grasp on these concepts.

// TESTING AREA - Trying to get things to work

// console.log("line15");
// console.log(currentPlayer.inv());
// console.log("line17");
// //currentPlayer.inventory.push('icicle')
//currentPlayer.take("thing"); // takes a string to the end of the currentPlayer's inventory array
// console.log("line21");
// currentPlayer.inv();
// console.log("line23");
// console.log(currentPlayer.inventory);
// console.log("line25");
// console.log(currentPlayer.inv());
// console.log("line27");

// This lookup table is for items that are able to be picked up.
// let lookupTable = {
//   sign: "sign",
//   sword: "sword"
// };

//console.log(sign.description);

//currentPlayer.drop("sword");
// console.log(currentLocation.inventory);
// console.log("line95");
// currentPlayer.take("sword");
// console.log("line97");
// console.log(currentPlayer.inv());
// console.log("line99");
// console.log(currentLocation.inv());
// console.log("line101");
// currentPlayer.take("sign");
// console.log(currentLocation.inv());
// console.log(currentLocation.descr);
// console.log(currentLocation.connections);
// console.log(lookupTable[sword].take)
