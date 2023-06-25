//const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let userInput;
let locationX;
let locationY;
let gameWonOrLost = false;

function randomNum(upTo) {
  return Math.floor(Math.random() * upTo);
}

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    let grid = this._field;
    for (let row of grid) {
      console.log(row.join(""));
    }
  }

  findInitialLocation() {
    for (let i = 0; i < this._field.length; i++) {
      if (this._field[i].includes(pathCharacter)) {
        for (let t = 0; t < this._field[i].length; t++)
          if (this._field[i][t].includes(pathCharacter)) {
            locationX = t;
            locationY = i;
          }
      }
    }
  }

  playGame() {
    this.findInitialLocation();
    this.print();
    let i = 0;
    do {
      i++;
      console.log(`Player location X: ${locationX} Y: ${locationY} .`);
      userInput = prompt("next move:");
      this.takeInput(userInput);
    } while (gameWonOrLost == false);
    console.log("*** END OF GAME ***");
  }

  takeInput(userInput) {
    userInput = userInput.toString().toUpperCase();
    if (
      userInput !== "W" &&
      userInput !== "A" &&
      userInput !== "S" &&
      userInput !== "D"
    ) {
      console.log("Invalid Input.");
    } else {
      this.movePlayer(userInput);
    }
  }

  movePlayer(moveDirection) {
    switch (moveDirection) {
      case "W":
        locationY--;
        break;
      case "A":
        locationX--;
        break;
      case "S":
        locationY++;
        break;
      case "D":
        locationX++;
        break;
    }
    this.checkNewLocation();
  }

  checkNewLocation() {
    let tileItem = this._field[locationY][locationX];
    console.log(`Found: ${tileItem}`);
    switch (tileItem) {
      case fieldCharacter:
        this.updateNewPosition();
        break;
      case hole:
        console.log("YOU FELL DOWN A HOLE");
        gameWonOrLost = true;
        break;
      case hat:
        console.log("YOU WIN");
        gameWonOrLost = true;
        break;
      case pathCharacter:
        this.updateNewPosition();
        break;
      default:
        console.log("Out of bounds!");
        gameWonOrLost = true;
    }
  }

  updateNewPosition() {
    this._field[locationY][locationX] = pathCharacter;
    this.print();
  }

  static generateField(height, width, percentage) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      console.log(newField);
    }
    if (percentage < 5) {
      percentage = 5;
    }
    let randomTile;
    const remainingPercentage = 100 - percentage;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let randomPercent = randomNum(100);
        if (randomPercent <= percentage) {
          randomTile = hole;
        } else {
          randomTile = fieldCharacter;
        }
        newField[y].push(randomTile);
        let grid = newField;
        for (let row of grid) {
          console.log(row.join(""));
        }
      }
    }
    newField[randomNum(height)][randomNum(width)] = hat;
    newField[randomNum(height)][randomNum(width)] = pathCharacter;
    let grid = newField;
    for (let row of grid) {
      console.log(row.join(""));
    }
    console.log(newField);
    return newField;
  }
}

const fieldArray = Field.generateField(7, 15, 30);
const FieldDay = new Field(fieldArray);