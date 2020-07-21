/*
 * Shaun Kickbusch, n9962361
 */

const UNIT = 32; // each unit in the world is 32 pixels.
const WIDTH = 45; // width, in world units.
const HEIGHT = 25; // height, in world units.
const SPIDER_SPEED = 4;
const GHOUL_SPEED = 6;
const GOBLIN_SPEED = 7;
const DRAGON_SPEED = 7;
const BARBARIAN_RANGE = 150;
const BARBARIAN_COST_PRICE = 170;
const BARBARIAN_SELL_PRICE = 100;
const BARBARIAN_ATTACK_SPEED = 5;
const WIZARD_IMG_X_OFFSET = 45;
const WIZARD_IMG_Y_OFFSET = 10;
const WIZARD_RANGE = 275;
const WIZARD_COST_PRICE = 200;
const WIZARD_SELL_PRICE = 130;
const WIZARD_ATTACK_SPEED = 5;
const RON_IMG_X_OFFSET = 20;
const RON_RANGE = 350;
const RON_COST_PRICE = 310;
const RON_SELL_PRICE = 230;
const RON_ATTACK_SPEED = 8;
const HERMIONE_IMG_X_OFFSET = 20;
const HERMIONE_RANGE = 400;
const HERMIONE_COST_PRICE = 400;
const HERMIONE_SELL_PRICE = 310;
const HERMIONE_ATTACK_SPEED = 8;
const HARRY_IMG_X_OFFSET = 0;
const HARRY_RANGE = 500;
const HARRY_COST_PRICE = 500;
const HARRY_SELL_PRICE = 370;
const HARRY_ATTACK_SPEED = 12;
const ROUND_FINISH_REWARD = 300;

let enemySpawnInPlay = [
  [0, 0, 0, 0], //Level1
  [0, 0, 0, 0], //Level2
  [0, 0, 0, 0], //Level3
  [0, 0, 0, 0], //Level4
  [0, 0, 0, 0], //Level5
];
let startLevel = false;
let levelNum = 1;
let moneyAmount;
let healthAmount;
let harryPotterFont;
let enemies = [];
let stars = [];
let ghoulPics = [];
let spiderPics = [];
let goblinPics = [];
let dragonPics = [];
let ronIcon;
let ronIdle = [];
let ronAttack = [];
let barbarianIcon;
let barbarianIdle = [];
let barbarianAttack = [];
let wizardIcon;
let wizardIdle = [];
let wizardAttack = [];
let hermioneIcon;
let hermioneIdle = [];
let hermioneAttack = [];
let harryIcon;
let harryIdle = [];
let harryAttack = [];
let lockedIcon;
let hogwartsCastleImg;
let showInfoPanel;
let infoButtonImg;
let infoButtonHoverImg;
let infoPanelImg;
let infoPanelOkImg;
let infoPanelOkHoverImg;
let audioButtonImg;
let audioButtonHoverImg;
let audioButtonMuteImg;
let mainMenuMusic;
let inMainMenu;
let isAWeaponSelected;
let selectedWeaponIndex;
let rightPanelBGImg;
let weaponMenuBG;
let weaponBG;
let moneyIcon;
let healthIcon;
let goButtonImg;
let goButtonHoverImg;
let cancelBuyImg;
let levelMusic = [];
let bottomPanelBGImg;
let bottomPanelHomeImg;
let bottomPanelHomeHoverImg;
let showConfirmExitPanel;
let bottomPanelAudioImg;
let bottomPanelAudioHoverImg;
let bottomPanelAudioMuteImg;
let bottomPanelHomeConfirmDialogueImg;
let bottomPanelHomeConfirmOkImg;
let bottomPanelHomeConfirmOkHoverImg;
let bottomPanelHomeConfirmNoImg;
let bottomPanelHomeConfirmNoHoverImg;
let selectedWeapon;
let currentlyPlacedWeapons = [];
let validWeaponPosition;
let weaponInfoBG;
var path = [];
let levelBackground;
let pogUImg;
let totalEnemiesDead = 0;
let gameOverMusic;
let buttonHoverSound;
let hitAudio;
let winAudio;
let playInGameMusic = true;
let roundEnded = false;
let blackFade = 0.0;

function preload() {

  harryPotterFont = loadFont("fonts/HARRYP__.TTF");
  hogwartsCastleImg = loadImage("pics/hogwarts-castle-png-transparent.png");
  infoButtonImg = loadImage("pics/gui/buttons/Button_26.png");
  infoButtonHoverImg = loadImage("pics/gui/buttons/Button_27.png");
  infoPanelImg = loadImage("pics/gui/Windows_12.png");
  infoPanelOkImg = loadImage("pics/gui/buttons/Button_106.png");
  infoPanelOkHoverImg = loadImage("pics/gui/buttons/Button_107.png");
  audioButtonImg = loadImage("pics/gui/buttons/audio_01.png");
  audioButtonHoverImg = loadImage("pics/gui/buttons/audio_02.png");
  audioButtonMuteImg = loadImage("pics/gui/buttons/audio_04.png");
  mainMenuMusic = loadSound('audio/mainMenuMusic.wav');
  levelMusic[0] = loadSound('audio/theKissMusic.wav');
  levelMusic[1] = loadSound('audio/dumbledoresArmyMusic.wav');
  levelMusic[2] = loadSound('audio/FawkesIsRebornMusic.wav');
  levelMusic[3] = loadSound('audio/dumbledoresFarewellMusic.wav');
  levelMusic[4] = loadSound('audio/voldemortsEndMusic.mp3');
  gameOverMusic = loadSound('audio/gameOverMusic.mp3');
  hitAudio = loadSound('audio/hitSound.mp3');
  winAudio = loadSound('audio/wonMusic.mp3');
  buttonHoverSound = loadSound('audio/buttonHoverSound.mp3');
  pogUImg = loadImage("pics/PogU.png");
  levelBackground = loadImage("pics/game_background_2.png");
  moneyIcon = loadImage("pics/goldIcon.png");
  healthIcon = loadImage("pics/healthIcon.png");
  goButtonImg = loadImage("pics/gui/buttons/Button_05.png");
  goButtonHoverImg = loadImage("pics/gui/buttons/Button_06.png");
  cancelBuyImg = loadImage("pics/gui/buttons/Button_08.png");
  lockedIcon = loadImage("pics/lockedIcon.png");
  bottomPanelBGImg = loadImage("pics/gui/bottomPanelBG.png");
  bottomPanelHomeImg = loadImage("pics/gui/buttons/Button_18.png");
  bottomPanelHomeHoverImg = loadImage("pics/gui/buttons/Button_19.png");
  bottomPanelAudioImg = loadImage("pics/gui/buttons/audio_01.png");
  bottomPanelAudioHoverImg = loadImage("pics/gui/buttons/audio_02.png");
  bottomPanelAudioMuteImg = loadImage("pics/gui/buttons/audio_04.png");
  bottomPanelHomeConfirmDialogueImg = loadImage("pics/gui/Windows_12.png");
  bottomPanelHomeConfirmOkImg = loadImage("pics/gui/buttons/Button_106.png");
  bottomPanelHomeConfirmOkHoverImg = loadImage("pics/gui/buttons/Button_107.png");
  bottomPanelHomeConfirmNoImg = loadImage("pics/gui/buttons/Button_98.png");
  bottomPanelHomeConfirmNoHoverImg = loadImage("pics/gui/buttons/Button_99.png");
  rightPanelBGImg = loadImage("pics/gui/rightPanelBG.png");
  weaponBG = loadImage("pics/gui/weaponBG.png");
  weaponInfoBG = loadImage("pics/gui/Windows_03.png");
  //Iterate through all the images and add them to their respective arrays
  //Enemy Images
  for (let i = 0; i < 3; i++) {
    spiderPics[i] = loadImage("pics/spider" + (i + 1) + ".png");
  }
  for (let i = 0; i < 6; i++) {
    ghoulPics[i] = loadImage("pics/ghoul" + (i + 1) + ".png");
  }
  for (let i = 0; i < 7; i++) {
    goblinPics[i] = loadImage("pics/goblin/goblin_2_run_00" + (i + 1) + ".png");
  }

  for (let i = 0; i < 4; i++) {
    dragonPics[i] = loadImage("pics/dragon/dragon_1_fly_00" + (i + 1) + ".png");
  }
  //Weapon images
  barbarianIcon = loadImage("pics/barbarian/barbarianIcon.png");
  for (let i = 0; i < 3; i++) {
    barbarianAttack[i] = loadImage("pics/barbarian/barbarian_1_attack_00" + (i + 1) + ".png");
  }
  for (let i = 0; i < 4; i++) {
    barbarianIdle[i] = loadImage("pics/barbarian/barbarian_1_jump_00" + (i + 1) + ".png");
  }
  //Wizard images
  wizardIcon = loadImage("pics/wizard/wizardIcon.png");
  for (let i = 0; i < 4; i++) {
    wizardAttack[i] = loadImage("pics/wizard/attack_" + (i + 1) + ".png");
  }
  for (let i = 0; i < 4; i++) {
    wizardIdle[i] = loadImage("pics/wizard/idle_" + (i + 1) + ".png");
  }
  //Ron images
  ronIcon = loadImage("pics/ron/ronIcon.png");
  for (let i = 0; i < 3; i++) {
    ronIdle[i] = loadImage("pics/ron/ronIdle" + (i + 1) + ".png");
  }
  for (let i = 0; i < 2; i++) {
    ronAttack[i] = loadImage("pics/ron/ron" + (i + 1) + ".png");
  }
  //hermione images
  hermioneIcon = loadImage("pics/hermione/hermioneIcon.png");
  for (let i = 0; i < 4; i++) {
    hermioneIdle[i] = loadImage("pics/hermione/idle" + (i + 1) + ".png");
  }
  for (let i = 0; i < 3; i++) {
    hermioneAttack[i] = loadImage("pics/hermione/attack" + (i + 1) + ".png");
  }
  //Harry images
  harryIcon = loadImage("pics/harry/harryIcon.png");
  for (let i = 0; i < 4; i++) {
    harryIdle[i] = loadImage("pics/harry/idle" + (i + 1) + ".png");
  }
  for (let i = 0; i < 14; i++) {
    harryAttack[i] = loadImage("pics/harry/attack" + (i + 1) + ".png");
  }
}

function weaponClicked() {

  //Barbarian
  let d = dist(mouseX, mouseY, UNIT * 41.5, UNIT * 4);
  if (d < weaponBG.width / 2 && moneyAmount >= BARBARIAN_COST_PRICE && LEVEL_0_STATE.state === true) {
    selectedWeapon = 'BARBARIAN';
  }
  //Wizard
  let d1 = dist(mouseX, mouseY, UNIT * 43.5, UNIT * 4);
  if (d1 < weaponBG.width / 2 && moneyAmount >= WIZARD_COST_PRICE && LEVEL_1_STATE.state === true) {
    selectedWeapon = 'WIZARD';
  }
  //Ron
  let d2 = dist(mouseX, mouseY, UNIT * 41.5, UNIT * 7);
  if (d2 < weaponBG.width / 2 && moneyAmount >= RON_COST_PRICE && LEVEL_2_STATE.state === true) {
    selectedWeapon = 'RON';
  }
  //Hermione
  let d3 = dist(mouseX, mouseY, UNIT * 43.5, UNIT * 7);
  if (d3 < weaponBG.width / 2 && moneyAmount >= HERMIONE_COST_PRICE && LEVEL_3_STATE.state === true) {
    selectedWeapon = 'HERMIONE';
  }
  //Harry
  let d4 = dist(mouseX, mouseY, UNIT * 42.5, UNIT * 10);
  if (d4 < weaponBG.width / 2 && moneyAmount >= HARRY_COST_PRICE && LEVEL_4_STATE.state === true) {
    selectedWeapon = 'HARRY';
  }
}

function placeSpecificWeapon(weaponType, weaponObject, weaponCostPrice) {
  if (selectedWeapon === weaponType) {
    append(currentlyPlacedWeapons, weaponObject);
    moneyAmount -= weaponCostPrice;
    //Automatically deselect the weapon if the gold amount is too low
    if (moneyAmount < weaponCostPrice) {
      selectedWeapon = 'null';
      validWeaponPosition = false;
    }
  }
}

function weaponPlaced() {

  if (validWeaponPosition === true) {
    placeSpecificWeapon("BARBARIAN", new Barbarian(mouseX, mouseY), BARBARIAN_COST_PRICE);
    placeSpecificWeapon("WIZARD", new Wizard(mouseX, mouseY), WIZARD_COST_PRICE);
    placeSpecificWeapon("RON", new Ron(mouseX, mouseY), RON_COST_PRICE);
    placeSpecificWeapon("HERMIONE", new Hermione(mouseX, mouseY), HERMIONE_COST_PRICE);
    placeSpecificWeapon("HARRY", new Harry(mouseX, mouseY), HARRY_COST_PRICE);
  }
}

function goButtonClicked() {

  let d = dist(mouseX, mouseY, UNIT * 42.5, UNIT * 20);
  if (d < goButtonImg.width / 2) {
    startLevel = true;
  }
}

function weaponBuyCancelled() {
  let d = dist(mouseX, mouseY, UNIT * 42.5, UNIT * 23);
  if (d < cancelBuyImg.width / 2) {
    selectedWeapon = 'null';
  }
}

function resetGame() {

  levelMusic[levelNum - 1].stop();
  mainMenuMusic.play();
  showConfirmExitPanel = false;
  healthAmount = 200;
  moneyAmount = 650;
  startLevel = false;
  levelNum = 1;
  //Clear the data
  enemies = [];
  currentlyPlacedWeapons = [];
  showInfoPanel = false;
  selectedWeapon = 'null';
  validWeaponPosition = false;
  LEVEL_0_STATE.state = true;
  LEVEL_1_STATE.state = false;
  LEVEL_2_STATE.state = false;
  LEVEL_3_STATE.state = false;
  LEVEL_4_STATE.state = false;
  LEVEL_5_STATE.state = false;
  startLevel = false;
  playInGameMusic = true;
  roundEnded = false;
  blackFade = 0.0;
  totalEnemiesDead = 0;
  enemySpawnInPlay = [
    [0, 0, 0, 0], //Level1
    [0, 0, 0, 0], //Level2
    [0, 0, 0, 0], //Level3
    [0, 0, 0, 0], //Level4
    [0, 0, 0, 0], //Level5
  ];
  inMainMenu = true;
}

//Only trigger these event listeners if we're in the main menu
function mainMenuActionListeners() {

  //If play button is pressed
  let playButtonPos = createVector(UNIT * 40, UNIT * 10);
  let d = dist(mouseX, mouseY, playButtonPos.x, playButtonPos.y);
  if (d < goButtonImg.width / 2) {
    mainMenuMusic.stop();
    inMainMenu = false;
  }

  //If Music button is pressed
  let musicButtonPos = createVector(UNIT * 42.5, UNIT * 22);
  let d2 = dist(mouseX, mouseY, musicButtonPos.x, musicButtonPos.y);
  if (d2 < audioButtonImg.width / 2) {
    mainMenuMusic.isPlaying() === true ? mainMenuMusic.stop() : mainMenuMusic.play();
  }

  //If info button is pressed
  let infoButtonPos = createVector(UNIT * 39, UNIT * 22);
  let d3 = dist(mouseX, mouseY, infoButtonPos.x, infoButtonPos.y);
  if (d3 < infoButtonImg.width / 2) {
    showInfoPanel = true;
  }
  //If the info panel is showing we want to activate the event listeners for the button on it
  if (showInfoPanel === true) {
    let infoPanelOkButtonPos = createVector(width / 2, UNIT * 19.5);
    let d4 = dist(mouseX, mouseY, infoPanelOkButtonPos.x, infoPanelOkButtonPos.y);
    if (d4 < infoButtonHoverImg.width / 2) {
      //set the bool to false, therefore closing the info panel
      showInfoPanel = false;
    }
  }
}

function inGameActionListeners() {

  //Home button
  let homeButtonPos = createVector(UNIT * 38, height - UNIT * 1.5);
  let d5 = dist(mouseX, mouseY, homeButtonPos.x, homeButtonPos.y);
  if (d5 < bottomPanelHomeImg.width / 2) {
    showConfirmExitPanel = true;
  }

  //If Music button is pressed
  let bottomPanelMusicButtPos = createVector(UNIT * 35.5, height - UNIT * 1.5);
  let d2 = dist(mouseX, mouseY, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y);
  if (d2 < bottomPanelAudioImg.width / 2) {
    levelMusic[levelNum - 1].isPlaying() === true ? playInGameMusic = false : playInGameMusic = true
  }

  //If the confirm exit dialogue is open, activate the listeners
  if (showConfirmExitPanel === true) {
    //Confirm exit button
    let bottomPanelHomeConfirmOkPos = createVector(UNIT * 17, UNIT * 19.5);
    let d6 = dist(mouseX, mouseY, bottomPanelHomeConfirmOkPos.x, bottomPanelHomeConfirmOkPos.y);
    if (d6 < bottomPanelHomeConfirmOkImg.width / 2) {
      resetGame();
    }
    //Decline exit button
    let bottomPanelHomeConfirmNoPos = createVector(UNIT * 23, UNIT * 19.5);
    let d7 = dist(mouseX, mouseY, bottomPanelHomeConfirmNoPos.x, bottomPanelHomeConfirmNoPos.y);
    if (d7 < bottomPanelHomeConfirmNoImg.width / 2) {
      showConfirmExitPanel = false;
    }
  }

  //Draw sell button on the bottom panel
  let bottomPanelSellButtPos = createVector(UNIT * 31, height - UNIT * 1.5);
  //Iterate through the current weapons on the field and see if they're clicked
  for (let i = 0; i < currentlyPlacedWeapons.length; i++) {
    let d8 = dist(mouseX, mouseY, currentlyPlacedWeapons[i].pos.x, currentlyPlacedWeapons[i].pos.y);
    //If the mouse is within distance of a currently placed weapon or it's within distance of the sell button and a weapon is selected
    if (d8 < wizardIdle[0].width / 2 || (dist(mouseX, mouseY, bottomPanelSellButtPos.x, bottomPanelSellButtPos.y) < goButtonImg.width / 2 && isAWeaponSelected === true)) {
      isAWeaponSelected = true;
      selectedWeaponIndex = i;
      break;
    } else {
      isAWeaponSelected = false;
    }
  }

  //Player sells the weapon
  if (isAWeaponSelected === true) {
    let d88 = dist(mouseX, mouseY, bottomPanelSellButtPos.x, bottomPanelSellButtPos.y);
    if (d88 < goButtonImg.width / 2) {
      moneyAmount += currentlyPlacedWeapons[selectedWeaponIndex].sellPrice;
      currentlyPlacedWeapons.splice(selectedWeaponIndex, 1);
      isAWeaponSelected = false;
    }
  }

  function setupNextLevel(songIndex, level0StateBool, level1StateBool, level2StateBool, level3StateBool, level4StateBool, level5StateBool) {
    if (LEVEL_0_STATE.state === level0StateBool && LEVEL_1_STATE.state === level1StateBool &&
      LEVEL_2_STATE.state === level2StateBool && LEVEL_3_STATE.state === level3StateBool &&
      LEVEL_4_STATE.state === level4StateBool && LEVEL_5_STATE.state === level5StateBool &&
      roundEnded === true) {
      let levelCompleteDialogueOkButtPos = createVector(UNIT * 20, UNIT * 19.5);
      let d9 = dist(mouseX, mouseY, levelCompleteDialogueOkButtPos.x, levelCompleteDialogueOkButtPos.y);
      if (d9 < bottomPanelHomeConfirmOkImg.width / 2) {
        startLevel = false;
        levelMusic[songIndex].stop();
        moneyAmount += ROUND_FINISH_REWARD;
        totalEnemiesDead = 0;
        levelNum++;
        for (let i = 0; i < currentlyPlacedWeapons.length; i++) {
          currentlyPlacedWeapons[i].areWeAttacking = false;
        }
        roundEnded = false;
      }
    }
  }
  //Setup for level 2 after level 1. If level 0, 1 are won (true) and 3, 4 and 5 aren't won yet (false)
  setupNextLevel(0, true, true, false, false, false, false);
  //Setup for level 3 after level 2. If level 0, 1, 2 are won (true) and 4 and 5 aren't won yet (false)
  setupNextLevel(1, true, true, true, false, false, false);
  //Setup for level 4 after level 3. If level 0, 1, 2, 3 are won (true) and 4 and 5 aren't won yet (false)
  setupNextLevel(2, true, true, true, true, false, false);
  //Setup for level 5 after level 4. If level 0, 1, 2, 3, 4 are won (true) but 5 isn't won yet (false)
  setupNextLevel(3, true, true, true, true, true, false);
  //Implement end game screen

  //Game over
  if (healthAmount <= 0 || (LEVEL_0_STATE.state === true && LEVEL_1_STATE.state === true && LEVEL_2_STATE.state === true &&
      LEVEL_3_STATE.state === true && LEVEL_4_STATE.state === true && LEVEL_5_STATE.state === true)) {
    let gameOverHomeButtPos = createVector(UNIT * 20, UNIT * 19.5);
    let d10 = dist(mouseX, mouseY, gameOverHomeButtPos.x, gameOverHomeButtPos.y);
    if (d10 < bottomPanelHomeImg.width / 2) {

      if (gameOverMusic.isPlaying() === true) {
        gameOverMusic.stop();
      }
      if (winAudio.isPlaying() === true) {
        winAudio.stop();
      }
      resetGame();
    }
  }
}

function mousePressed() {

  if (inMainMenu === true) {
    mainMenuActionListeners();
  }
  //we're in game
  else if (inMainMenu === false) {
    goButtonClicked();
    weaponClicked();
    weaponBuyCancelled();
    weaponPlaced();
    inGameActionListeners();
  }
}

function showWeaponInfo(nameTitle, desc1, desc2, desc3) {

  image(weaponInfoBG, UNIT * 36, mouseY);
  textSize(25);
  text(nameTitle, UNIT * 34.25, mouseY - UNIT);
  text(desc1, UNIT * 34, mouseY - UNIT / 5);
  text(desc2, UNIT * 34, mouseY + 15);
  text(desc3, UNIT * 34, mouseY + 40);
}

function drawWeaponTile(tileX, tileY, levelUnlockEnum, imageName, nameCost, desc1, desc2, desc3) {
  //hover ron
  image(weaponBG, tileX, tileY);
  //Unlock ron after level 1
  if (levelUnlockEnum.state === true) {
    image(imageName, tileX, tileY);
    d = dist(mouseX, mouseY, tileX, tileY);
    if (d < weaponBG.width / 2) {
      showWeaponInfo(nameCost, desc1, desc2, desc3);
    }
  } else {
    image(lockedIcon, tileX, tileY);
  }
}

function drawRightPanel() {

  strokeWeight(5);
  image(rightPanelBGImg, UNIT * 40, 0);
  imageMode(CENTER);
  image(moneyIcon, UNIT * 41, UNIT);
  fill(0);
  stroke(255);
  strokeWeight(1.5);
  textSize(30);
  text(moneyAmount, UNIT * 42, UNIT * 1.3);
  image(healthIcon, UNIT * 41, UNIT * 2);
  text(healthAmount, UNIT * 42, UNIT * 2.3);

  //Hover go button
  let d = dist(mouseX, mouseY, UNIT * 42.5, UNIT * 20.6);
  textSize(60);
  if (d < goButtonImg.width / 2) {
    image(goButtonHoverImg, UNIT * 42.5, UNIT * 20);
    text("GO", UNIT * 41.6, UNIT * 20.6);
  } else {
    image(goButtonImg, UNIT * 42.5, UNIT * 20);
    text("GO", UNIT * 41.6, UNIT * 20.6);
  }

  //Draw wizard (weapon 1)
  drawWeaponTile(UNIT * 41.5, UNIT * 4, LEVEL_0_STATE, barbarianIcon, "Barbarian $" + BARBARIAN_COST_PRICE, "Melee range attacks", "for consistent and", "affordable damage.");
  //Draw ron (weapon 2)
  drawWeaponTile(UNIT * 43.5, UNIT * 4, LEVEL_1_STATE, wizardIcon, "Wizard $" + WIZARD_COST_PRICE, "Uses simple spells", "for consistent and", "affordable damage.");
  //Draw 3 (weapon 3)
  drawWeaponTile(UNIT * 41.5, UNIT * 7, LEVEL_2_STATE, ronIcon, "Ron $" + RON_COST_PRICE, "Faster casts but", "still affordable and", "worthy in battle.");
  //Draw 4 (weapon 4)
  drawWeaponTile(UNIT * 43.5, UNIT * 7, LEVEL_3_STATE, hermioneIcon, "Hermione $" + HERMIONE_COST_PRICE, "She comes with", "long range and", "fast attacks.");
  //Draw 5 (weapon 5)
  drawWeaponTile(UNIT * 42.5, UNIT * 10, LEVEL_4_STATE, harryIcon, "Harry $" + HARRY_COST_PRICE, "Long ranged attacks", "that hit hard but", "the price hits harder.");

  textSize(60);
  strokeWeight(1);
}

function setupPath() {

  for (let i = 0; i < 24; i++) {
    append(path, createVector(i * UNIT, UNIT * 12.5));
  }
  append(path, createVector(24 * UNIT, UNIT * 13));
  append(path, createVector(25 * UNIT, UNIT * 14));
  for (let i = 26; i < 31; i++) {
    append(path, createVector(i * UNIT, UNIT * 14.5));
  }
  append(path, createVector(31 * UNIT, UNIT * 14));
  append(path, createVector(32 * UNIT, UNIT * 13));
  append(path, createVector(32.5 * UNIT, UNIT * 12));
  append(path, createVector(33 * UNIT, UNIT * 11));
  append(path, createVector(33 * UNIT, UNIT * 10));
  append(path, createVector(33.5 * UNIT, UNIT * 9));
  append(path, createVector(34 * UNIT, UNIT * 8));
  append(path, createVector(35 * UNIT, UNIT * 7.5));

  for (let i = 39; i < 46; i++) {
    append(path, createVector((i - 3) * UNIT, UNIT * 7.5));
  }
}

function mainMenu() {

  background(0);
  //twinkle the stars and display them
  for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].display();
  }

  imageMode(CENTER);
  image(hogwartsCastleImg, hogwartsCastleImg.width / 2 - UNIT * 2, height - hogwartsCastleImg.height / 2 + UNIT);

  let playButtonPos = createVector(UNIT * 40, UNIT * 10);
  image(goButtonImg, playButtonPos.x, playButtonPos.y);
  //If button is hovered, give some feedback
  let d = dist(mouseX, mouseY, playButtonPos.x, playButtonPos.y);
  if (d < goButtonImg.width / 2) {
    if (buttonHoverSound.isPlaying() === false) {
      buttonHoverSound.play();
    }

    image(goButtonHoverImg, playButtonPos.x, playButtonPos.y);
  }
  strokeWeight(1);
  stroke(0);
  textSize(55);
  let myString = "Play";
  let myTextWidth = textWidth(myString);
  text(myString, playButtonPos.x - UNIT, playButtonPos.y + UNIT * 0.5);

  //Music button
  let musicButtonPos = createVector(UNIT * 42.5, UNIT * 22);
  //Ternary operator. if the music is playing show the audio image else show the muted image
  mainMenuMusic.isPlaying() === true ? image(audioButtonImg, musicButtonPos.x, musicButtonPos.y) : image(audioButtonMuteImg, musicButtonPos.x, musicButtonPos.y);
  //image(audioButtonImg, musicButtonPos.x, musicButtonPos.y);
  let d2 = dist(mouseX, mouseY, musicButtonPos.x, musicButtonPos.y);
  if (d2 < audioButtonImg.width / 2) {
    image(audioButtonHoverImg, musicButtonPos.x, musicButtonPos.y);
    if (buttonHoverSound.isPlaying() === false) {
      buttonHoverSound.play();
    }
  }

  //Info button
  let infoButtonPos = createVector(UNIT * 39, UNIT * 22);
  let d3 = dist(mouseX, mouseY, infoButtonPos.x, infoButtonPos.y);
  if (d3 < infoButtonImg.width / 2) {
    image(infoButtonHoverImg, infoButtonPos.x, infoButtonPos.y);
    if (buttonHoverSound.isPlaying() === false) {
      buttonHoverSound.play();
    }
  } else {
    image(infoButtonImg, infoButtonPos.x, infoButtonPos.y);
  }
  //Info panel
  if (showInfoPanel === true) {

    image(infoPanelImg, width / 2, height / 2);
    let infoPanelOkButtonPos = createVector(width / 2, UNIT * 19.5);
    let d4 = dist(mouseX, mouseY, infoPanelOkButtonPos.x, infoPanelOkButtonPos.y);
    if (d4 < infoButtonHoverImg.width / 2) {
      image(infoPanelOkHoverImg, infoPanelOkButtonPos.x, infoPanelOkButtonPos.y);
    } else {
      //Else we show the default button when not hovered
      image(infoPanelOkImg, infoPanelOkButtonPos.x, infoPanelOkButtonPos.y);
    }
    //set font to black
    fill(0);
    strokeWeight(2);
    stroke(255);
    textSize(60);
    myString = "Info";
    myTextWidth = textWidth(myString);
    text(myString, (width - myTextWidth) / 2, UNIT * 7);
    textSize(34);
    let myString1 = "Hogwarts tower defence is a wave based strategy"
    let myString2 = "game where you have to build and upgrade your"
    let myString3 = "wizarding army with new and previous existing";
    let myString4 = "characters from your favourite wizarding world to";
    let myString5 = "fight your way against the dark lord and his";
    let myString6 = "army of critters and followers.";
    text(myString1, UNIT * 15, UNIT * 10.25);
    text(myString2, UNIT * 15, UNIT * 11.25);
    text(myString3, UNIT * 15, UNIT * 12.25);
    text(myString4, UNIT * 15, UNIT * 13.25);
    text(myString5, UNIT * 15.5, UNIT * 14.25);
    text(myString6, UNIT * 17.5, UNIT * 15.25);
  }
  stroke(color('#74ee15'));
  strokeWeight(4);
  fill(255);
  textSize(175);
  myString = "Hogwarts Tower Defense";
  myTextWidth = textWidth(myString);
  text(myString, (width - myTextWidth) / 2, UNIT * 5);
}

function setup() {

  createCanvas(WIDTH * UNIT, HEIGHT * UNIT);
  inMainMenu = true;
  showInfoPanel = false;
  //Insert the stars into an array
  for (let i = 0; i < 1000; i++) {
    //place star into a random position, give it a random alpha, give it a random alpha decrement and a random bool, visible or not
    stars[i] = new Star(random(width), random(height), random(255), random(0.1, 3), random(1));
  }

  background(0);
  setupPath();
  textFont(harryPotterFont);
  mainMenuMusic.loop();
  mainMenuMusic.amp(0.05);
  mainMenuMusic.play();
  for (let i = 0; i < levelMusic.length; i++) {
    levelMusic[i].loop();
    levelMusic[i].amp(0.05);
    levelMusic[i].stop();
  }
  gameOverMusic.amp(0.05);
  selectedWeapon = 'null';
  moneyAmount = 650;
  healthAmount = 200;
  validWeaponPosition = false;
  showConfirmExitPanel = false;
  //Main menu buttons
  infoButtonImg.resize(infoButtonImg.width / 2, infoButtonImg.height / 2);
  infoButtonHoverImg.resize(infoButtonHoverImg.width / 2, infoButtonHoverImg.height / 2);
  infoPanelOkImg.resize(infoPanelOkImg.width / 2, infoPanelOkImg.height / 2);
  infoPanelOkHoverImg.resize(infoPanelOkHoverImg.width / 2, infoPanelOkHoverImg.height / 2);

  audioButtonImg.resize(audioButtonImg.width / 2, audioButtonImg.height / 2);
  audioButtonHoverImg.resize(audioButtonHoverImg.width / 2, audioButtonHoverImg.height / 2);
  audioButtonMuteImg.resize(audioButtonMuteImg.width / 2, audioButtonMuteImg.height / 2);
  lockedIcon.resize(lockedIcon.width / 5.5, lockedIcon.height / 5.5);

  //In game buttons
  levelBackground.resize(40 * UNIT, UNIT * 22);
  moneyIcon.resize(moneyIcon.width / 2, moneyIcon.height / 2);
  healthIcon.resize(healthIcon.width / 2, healthIcon.height / 2);

  //Bottom panel images
  bottomPanelHomeImg.resize(bottomPanelHomeImg.width / 2 - UNIT / 2, bottomPanelHomeImg.height / 2 - UNIT / 2);
  bottomPanelHomeHoverImg.resize(bottomPanelHomeHoverImg.width / 2 - UNIT / 2, bottomPanelHomeHoverImg.height / 2 - UNIT / 2);
  bottomPanelAudioImg.resize(bottomPanelAudioImg.width / 2 - UNIT / 2, bottomPanelAudioImg.height / 2 - UNIT / 2);
  bottomPanelAudioHoverImg.resize(bottomPanelAudioHoverImg.width / 2 - UNIT / 2, bottomPanelAudioHoverImg.height / 2 - UNIT / 2);
  bottomPanelAudioMuteImg.resize(bottomPanelAudioMuteImg.width / 2 - UNIT / 2, bottomPanelAudioMuteImg.height / 2 - UNIT / 2);

  //bottomPanelHomeConfirmDialogueImg.resize(bottomPanelHomeConfirmDialogueImg.width / 2, bottomPanelHomeConfirmDialogueImg.height / 2);
  bottomPanelHomeConfirmOkImg.resize(bottomPanelHomeConfirmOkImg.width / 2, bottomPanelHomeConfirmOkImg.height / 2);
  bottomPanelHomeConfirmOkHoverImg.resize(bottomPanelHomeConfirmOkHoverImg.width / 2, bottomPanelHomeConfirmOkHoverImg.height / 2);
  bottomPanelHomeConfirmNoImg.resize(bottomPanelHomeConfirmNoImg.width / 2, bottomPanelHomeConfirmNoImg.height / 2);
  bottomPanelHomeConfirmNoHoverImg.resize(bottomPanelHomeConfirmNoHoverImg.width / 2, bottomPanelHomeConfirmNoHoverImg.height / 2);

  weaponInfoBG.resize(weaponInfoBG.width / 5, weaponInfoBG.height / 5);
  weaponBG.resize(UNIT * 2, UNIT * 2);
  wizardIcon.resize((UNIT * 2) - 10, (UNIT * 2) - 10);

  goButtonImg.resize(UNIT * 5, UNIT * 2.5);
  goButtonHoverImg.resize(UNIT * 5, UNIT * 2.5);
  cancelBuyImg.resize(UNIT * 5, UNIT * 2.5);
  pogUImg.resize(pogUImg.width / 2.5, pogUImg.height / 2.5);

  for (let i = 0; i < 4; i++) {
    wizardIdle[i].resize(wizardIdle[i].width / 4, wizardIdle[i].height / 4);
  }
  for (let i = 0; i < 4; i++) {
    wizardAttack[i].resize(wizardAttack[i].width / 4, wizardAttack[i].height / 4);
  }

  for (let i = 0; i < 3; i++) {
    spiderPics[i].resize(spiderPics[i].width * 2, spiderPics[i].height * 2);
  }

  for (let i = 0; i < 6; i++) {
    ghoulPics[i].resize(ghoulPics[i].width * 2, ghoulPics[i].height * 2);
  }

  for (let i = 0; i < goblinPics.length; i++) {
    goblinPics[i].resize(goblinPics[i].width * 2, goblinPics[i].height * 2);
  }
  for (let i = 0; i < dragonPics.length; i++) {
    dragonPics[i].resize(dragonPics[i].width * 1.5, dragonPics[i].height * 1.5);
  }
  //Ron resize
  for (let i = 0; i < ronIdle.length; i++) {
    ronIdle[i].resize(ronIdle[i].width * 2, ronIdle[i].height * 2);
  }
  for (let i = 0; i < ronAttack.length; i++) {
    ronAttack[i].resize(ronAttack[i].width * 2, ronAttack[i].height * 2);
  }
  //Hermione resize
  for (let i = 0; i < hermioneIdle.length; i++) {
    hermioneIdle[i].resize(hermioneIdle[i].width * 2, hermioneIdle[i].height * 2);
  }
  for (let i = 0; i < hermioneAttack.length; i++) {
    hermioneAttack[i].resize(hermioneAttack[i].width * 2, hermioneAttack[i].height * 2);
  }
  //Harry resize
  for (let i = 0; i < harryIdle.length; i++) {
    harryIdle[i].resize(harryIdle[i].width * 3, harryIdle[i].height * 3);
  }
  for (let i = 0; i < harryAttack.length; i++) {
    harryAttack[i].resize(harryAttack[i].width * 3, harryAttack[i].height * 3);
  }
  //Barbarian resize
  for (let i = 0; i < barbarianIdle.length; i++) {
    barbarianIdle[i].resize(barbarianIdle[i].width * 2, barbarianIdle[i].height * 2);
  }
  for (let i = 0; i < barbarianAttack.length; i++) {
    barbarianAttack[i].resize(barbarianAttack[i].width * 2, barbarianAttack[i].height * 2);
  }
}

function drawBottomPanel() {

  image(bottomPanelBGImg, UNIT * 20, height - UNIT * 1.5);
  fill(255);
  stroke(0);
  strokeWeight(1.5);
  text("Level " + levelNum + " of 5", UNIT, height - UNIT);
  noStroke();
  //Draw home button on the bottom panel
  let bottomPanelHomePos = createVector(UNIT * 38, height - UNIT * 1.5);
  let d = dist(mouseX, mouseY, bottomPanelHomePos.x, bottomPanelHomePos.y);
  if (d < bottomPanelHomeImg.width / 2) {
    image(bottomPanelHomeHoverImg, bottomPanelHomePos.x, bottomPanelHomePos.y);
  } else {
    image(bottomPanelHomeImg, bottomPanelHomePos.x, bottomPanelHomePos.y);
  }
  //Draw audio button on the bottom panel
  let bottomPanelMusicButtPos = createVector(UNIT * 35.5, height - UNIT * 1.5);
  d = dist(mouseX, mouseY, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y);
  if (d < bottomPanelAudioImg.width / 2) {
    image(bottomPanelAudioHoverImg, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y);
  } else {
    image(bottomPanelAudioImg, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y);
    playInGameMusic === true ? image(bottomPanelAudioImg, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y) : image(bottomPanelAudioMuteImg, bottomPanelMusicButtPos.x, bottomPanelMusicButtPos.y);
  }

  if (showConfirmExitPanel === true) {

    image(bottomPanelHomeConfirmDialogueImg, UNIT * 40 / 2, height / 2);
    fill(0);
    stroke(255);
    let dialogueTitlePos = createVector(UNIT * 40 / 2 + UNIT, UNIT * 7);
    let myTitleString = "Exit";
    let myTitleTextWidth = textWidth(myTitleString);
    text(myTitleString, dialogueTitlePos.x - myTitleTextWidth, dialogueTitlePos.y);

    let myDialogueString = "Are you sure you'd like to";
    let myDialogueString2 = "exit the game?";
    let dialogueTextPos = createVector(UNIT * 13, UNIT * 12);
    text(myDialogueString, dialogueTextPos.x, dialogueTextPos.y);
    text(myDialogueString2, dialogueTextPos.x + UNIT * 3, dialogueTextPos.y + UNIT * 2);
    //Confirm exit button
    let bottomPanelHomeConfirmOkPos = createVector(UNIT * 17, UNIT * 19.5);
    let d2 = dist(mouseX, mouseY, bottomPanelHomeConfirmOkPos.x, bottomPanelHomeConfirmOkPos.y);
    if (d2 < bottomPanelHomeConfirmOkImg.width / 2) {
      image(bottomPanelHomeConfirmOkHoverImg, bottomPanelHomeConfirmOkPos.x, bottomPanelHomeConfirmOkPos.y);
    } else {
      image(bottomPanelHomeConfirmOkImg, bottomPanelHomeConfirmOkPos.x, bottomPanelHomeConfirmOkPos.y);
    }
    //Decline exit button
    let bottomPanelHomeConfirmNoPos = createVector(UNIT * 23, UNIT * 19.5);
    let d3 = dist(mouseX, mouseY, bottomPanelHomeConfirmNoPos.x, bottomPanelHomeConfirmNoPos.y);
    if (d3 < bottomPanelHomeConfirmOkImg.width / 2) {
      image(bottomPanelHomeConfirmNoHoverImg, bottomPanelHomeConfirmNoPos.x, bottomPanelHomeConfirmNoPos.y);
    } else {
      image(bottomPanelHomeConfirmNoImg, bottomPanelHomeConfirmNoPos.x, bottomPanelHomeConfirmNoPos.y);
    }
  }

  //Draw sell button
  if (isAWeaponSelected === true) {
    //Draw sell button on the bottom panel
    let bottomPanelSellButtPos = createVector(UNIT * 31, height - UNIT * 1.5);
    //If button is hovered display hover image else display normal image
    dist(mouseX, mouseY, bottomPanelSellButtPos.x, bottomPanelSellButtPos.y) < goButtonImg.width / 2 ? image(goButtonHoverImg, bottomPanelSellButtPos.x, bottomPanelSellButtPos.y) : image(goButtonImg, bottomPanelSellButtPos.x, bottomPanelSellButtPos.y);
    fill(0);
    textSize(35);
    text("SELL", bottomPanelSellButtPos.x - UNIT, bottomPanelSellButtPos.y);
    textSize(30);
    text(currentlyPlacedWeapons[selectedWeaponIndex].sellPrice, bottomPanelSellButtPos.x - UNIT * 0.75, bottomPanelSellButtPos.y + UNIT * 0.75);
  }
}

function keyPressed() {
  if (selectedWeapon != 'null') {
    //Cancel the weapon purchase with ESC
    if (keyCode === 27) {
      selectedWeapon = 'null';
      validWeaponPosition = false;
    }
  }
  //Q is pressed
  if (keyCode === 81 && moneyAmount >= BARBARIAN_COST_PRICE) {
    selectedWeapon = 'BARBARIAN';
  }
  //W is pressed
  if (keyCode === 87 && LEVEL_1_STATE.state === true && moneyAmount >= WIZARD_COST_PRICE) {
    selectedWeapon = 'WIZARD';
  }
  //E is pressed
  if (keyCode === 69 && LEVEL_2_STATE.state === true && moneyAmount >= RON_COST_PRICE) {
    selectedWeapon = 'RON';
  }
  //R is pressed
  if (keyCode === 82 && LEVEL_3_STATE.state === true && moneyAmount >= HERMIONE_COST_PRICE) {
    selectedWeapon = 'HERMIONE';
  }
  //T is pressed
  if (keyCode === 84 && LEVEL_4_STATE.state === true && moneyAmount >= HARRY_COST_PRICE) {
    selectedWeapon = 'HARRY';
  }
}

function levelHandler(levelNumInt, levelSpawnIndexInt, levelSpawnRateEnum, levelCompleteStateEnum, levelCompleteMsgString1, levelCompleteMsgString2, levelCompleteMsgString3) {

  if (levelNum === levelNumInt) {
    //Spawn a spider every 2 seconds (60 * 2) = 120, max 5 spiders
    if ((frameCount % 120) === 0 && enemySpawnInPlay[levelSpawnIndexInt][0] != levelSpawnRateEnum.SPIDERS) {
      append(enemies, new Spider());
      enemySpawnInPlay[levelSpawnIndexInt][0]++;
    }
    //If we've spawned all the spiders in, spawn the ghouls in
    else if ((enemySpawnInPlay[levelSpawnIndexInt][0] === levelSpawnRateEnum.SPIDERS) && ((frameCount % 120) === 0) && (enemySpawnInPlay[levelSpawnIndexInt][1] != levelSpawnRateEnum.GHOULS)) {
      append(enemies, new Ghoul());
      enemySpawnInPlay[levelSpawnIndexInt][1]++;
    }
    //If we've spawned all the spiders and ghouls in, spawn the goblins in
    else if ((enemySpawnInPlay[levelSpawnIndexInt][0] === levelSpawnRateEnum.SPIDERS) && (enemySpawnInPlay[levelSpawnIndexInt][1] === levelSpawnRateEnum.GHOULS) && ((frameCount % 120) === 0) && (enemySpawnInPlay[levelSpawnIndexInt][2] != levelSpawnRateEnum.GOBLINS)) {
      append(enemies, new Goblin());
      enemySpawnInPlay[levelSpawnIndexInt][2]++;
    }
    //If we've spawned all the spiders, ghouls and golbins in, spawn the dragons in
    else if ((enemySpawnInPlay[levelSpawnIndexInt][0] === levelSpawnRateEnum.SPIDERS) && (enemySpawnInPlay[levelSpawnIndexInt][1] === levelSpawnRateEnum.GHOULS) && (enemySpawnInPlay[levelSpawnIndexInt][2] === levelSpawnRateEnum.GOBLINS) && ((frameCount % 120) === 0) && (enemySpawnInPlay[levelSpawnIndexInt][3] != levelSpawnRateEnum.DRAGONS)) {
      append(enemies, new Dragon());
      enemySpawnInPlay[levelSpawnIndexInt][3]++;
    }
    //We know the round is complete when all the enemies have died or past
    if (totalEnemiesDead === levelSpawnRateEnum.TOTAL_ENEMIES) {
      //SET BOOL TO TRUE
      levelCompleteStateEnum.state = true;
      roundEnded = true;
    }

    if (levelCompleteStateEnum.state === true && levelNumInt != 5) {
      image(bottomPanelHomeConfirmDialogueImg, UNIT * 40 / 2, height / 2);
      fill(0);
      stroke(255);
      textSize(45);
      text(levelCompleteMsgString1, UNIT * 13, UNIT * 10.5);
      text(levelCompleteMsgString2, UNIT * 13.5, UNIT * 12);
      text(levelCompleteMsgString3, UNIT * 13.5, UNIT * 15);

      image(pogUImg, UNIT * 20, UNIT * 16.5);
      //Code to detect mouse hover and give feedback
      let levelCompleteDialogueOkButtPos = createVector(UNIT * 20, UNIT * 19.5);
      let d2 = dist(mouseX, mouseY, levelCompleteDialogueOkButtPos.x, levelCompleteDialogueOkButtPos.y);
      if (d2 < bottomPanelHomeConfirmOkImg.width / 2) {

        image(bottomPanelHomeConfirmOkHoverImg, levelCompleteDialogueOkButtPos.x, levelCompleteDialogueOkButtPos.y);
      } else {
        image(bottomPanelHomeConfirmOkImg, levelCompleteDialogueOkButtPos.x, levelCompleteDialogueOkButtPos.y);
      }
      noStroke();
    }
  }
}

/*Taken from the p5js 2dcollision library*/
function rectCircleCollision(rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx) {
    testX = rx // left edge
  } else if (cx > rx + rw) {
    testX = rx + rw
  } // right edge

  if (cy < ry) {
    testY = ry // top edge
  } else if (cy > ry + rh) {
    testY = ry + rh
  } // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx, cy, testX, testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter / 2) {
    return true;
  }
  return false;
}

function checkGameOver() {
  //Check if the game is over
  if (healthAmount <= 0 || (LEVEL_0_STATE.state === true && LEVEL_1_STATE.state === true &&
      LEVEL_2_STATE.state === true && LEVEL_3_STATE.state === true &&
      LEVEL_4_STATE.state === true && LEVEL_5_STATE.state === true)) {

    startLevel = false;
    levelMusic[levelNum - 1].stop();
    //Fade back canvas into black
    fill('rgba(0, 0, 0,' + blackFade + ')');
    if ((frameCount % 5) === 0 && blackFade <= 0.95) {
      blackFade += 0.05;
    }
    rect(0, 0, width, height);
    image(bottomPanelHomeConfirmDialogueImg, UNIT * 20, height / 2);
    //If button is hovered, display hover img else display normal img
    let gameOverHomeButtPos = createVector(UNIT * 20, UNIT * 19.5);
    let distTest = dist(mouseX, mouseY, gameOverHomeButtPos.x, gameOverHomeButtPos.y);
    distTest < bottomPanelHomeConfirmOkImg.width / 2 ? image(bottomPanelHomeHoverImg, gameOverHomeButtPos.x, gameOverHomeButtPos.y) : image(bottomPanelHomeImg, gameOverHomeButtPos.x, gameOverHomeButtPos.y);
  }
  if (healthAmount <= 0) {

    if (gameOverMusic.isPlaying() === false) {
      gameOverMusic.play();
    }
    fill(0);
    stroke(255);
    text("Game Over", UNIT * 17, UNIT * 7.25);
    textSize(45);
    text("You have failed. The Dark Lord's ", UNIT * 12.5, UNIT * 10.5);
    text("creatures have infiltrated Hogwarts!", UNIT * 12.5, UNIT * 12);
    text("Return home and try again!", UNIT * 14, UNIT * 13.5);
    noStroke();
  }
  //We passed all levels
  if (LEVEL_0_STATE.state === true && LEVEL_1_STATE.state === true && LEVEL_2_STATE.state === true &&
    LEVEL_3_STATE.state === true && LEVEL_4_STATE.state === true && LEVEL_5_STATE.state === true) {
    if (winAudio.isPlaying() === false) {
      winAudio.play();
    }
    fill(0);
    stroke(255);
    text("Game Won!", UNIT * 17, UNIT * 7.25);
    textSize(50);
    text("You have successfully fended off", UNIT * 12.5, UNIT * 10.5);
    text("The Dark Lord's creatures and", UNIT * 12.5, UNIT * 12.5);
    text("saved Hogwarts from intrusion.", UNIT * 12.5, UNIT * 14.5);
    text("We owe you a great deal!", UNIT * 13.5, UNIT * 16.5);
    noStroke();
  }
}

function weaponMovementAndDisplayHandler(currentIndex, weaponType, weaponTypeRange) {
  if (currentlyPlacedWeapons[currentIndex].type === weaponType) {
    currentlyPlacedWeapons[currentIndex].areWeAttacking = false
    for (let x = 0; x < enemies.length; x++) {
      if (enemies[x].pos.dist(currentlyPlacedWeapons[currentIndex].pos) <= weaponTypeRange) {
        currentlyPlacedWeapons[currentIndex].areWeAttacking = true;
        currentlyPlacedWeapons[currentIndex].attackMove();
        currentlyPlacedWeapons[currentIndex].attackDisplay();
      }
    }
  }
}

//Helper function to check whether or not the currently selected weapon is on top of
//a preexisting weapon
function collision() {
  for (let i = 0; i < currentlyPlacedWeapons.length; i++) {
    let d = dist(mouseX, mouseY, currentlyPlacedWeapons[i].pos.x, currentlyPlacedWeapons[i].pos.y);
    if (d < wizardIdle[0].width / 2) {
      return true;
    }
  }
  return false;
}

function draw() {

  if (inMainMenu === true) {
    mainMenu();
  }

  //Begin at the main menu, once they choose to get into a game the function will return false
  if (inMainMenu === false) {
    //If the music isn't playing and it's toggled on
    if (levelMusic[levelNum - 1].isPlaying() === false && playInGameMusic === true) {
      levelMusic[levelNum - 1].play();
    }
    //If the music is playing and it's toggled off
    else if (levelMusic[levelNum - 1].isPlaying() === true && playInGameMusic === false) {
      levelMusic[levelNum - 1].stop();
    }

    clear();
    background(0);
    imageMode(CORNER);
    image(levelBackground, 0, 0);
    drawRightPanel();
    drawBottomPanel();
    checkGameOver();

    if (startLevel === true) {

      levelHandler(1, 0, Level_1, LEVEL_1_STATE, "You have successfully passed the", "first level. Here's 500 gold.", "You've also unlocked a new unit, Wizard!");
      levelHandler(2, 1, Level_2, LEVEL_2_STATE, "You have successfully passed the", "second level. Here's 200 gold.", "You've also unlocked a new unit, Ron!");
      levelHandler(3, 2, Level_3, LEVEL_3_STATE, "You have successfully passed the", "third level. Here's 200 gold.", "You've also unlocked a new unit, Hermione!");
      levelHandler(4, 3, Level_4, LEVEL_4_STATE, "You have successfully passed the", "fourth level. Here's 200 gold.", "You've also unlocked a new Harry!");
      levelHandler(5, 4, Level_5, LEVEL_5_STATE, "You have successfully passed the", "fifth level. Here's 200 gold.", "You've also unlocked a new unit!");

      //start attacking when the enemies spawn
      if (enemySpawnInPlay[levelNum - 1][0] > 0) {
        for (let i = 0; i < currentlyPlacedWeapons.length; i++) {
          weaponMovementAndDisplayHandler(i, "BARBARIAN", BARBARIAN_RANGE);
          weaponMovementAndDisplayHandler(i, "WIZARD", WIZARD_RANGE);
          weaponMovementAndDisplayHandler(i, "RON", RON_RANGE);
          weaponMovementAndDisplayHandler(i, "HERMIONE", HERMIONE_RANGE);
          weaponMovementAndDisplayHandler(i, "HARRY", HARRY_RANGE);
        }
      }

      for (let i = 0; i < enemies.length; i++) {
        //if hasPassed is true, the enemy has reached the end without dying
        if (enemies[i].hasPassed === true) {
          //remove the enemny from the array
          enemies.splice(i, 1);
          //remove some hp
          healthAmount -= 20;
          totalEnemiesDead++;
          //go to the next iteration
          continue;
        }
        enemies[i].move();
        enemies[i].display();
      }
    }
    //The level hasn't started and we're idle
    if (isAWeaponSelected === true) {
      fill('rgba(0, 0, 0, 0.5)');
      if (currentlyPlacedWeapons[selectedWeaponIndex].type === "BARBARIAN") {
        circle(currentlyPlacedWeapons[selectedWeaponIndex].pos.x, currentlyPlacedWeapons[selectedWeaponIndex].pos.y, BARBARIAN_RANGE);
      } else if (currentlyPlacedWeapons[selectedWeaponIndex].type === "WIZARD") {
        circle(currentlyPlacedWeapons[selectedWeaponIndex].pos.x, currentlyPlacedWeapons[selectedWeaponIndex].pos.y, WIZARD_RANGE);
      } else if (currentlyPlacedWeapons[selectedWeaponIndex].type === "RON") {
        circle(currentlyPlacedWeapons[selectedWeaponIndex].pos.x, currentlyPlacedWeapons[selectedWeaponIndex].pos.y, RON_RANGE);
      } else if (currentlyPlacedWeapons[selectedWeaponIndex].type === "HERMIONE") {
        circle(currentlyPlacedWeapons[selectedWeaponIndex].pos.x, currentlyPlacedWeapons[selectedWeaponIndex].pos.y, HERMIONE_RANGE);
      } else if (currentlyPlacedWeapons[selectedWeaponIndex].type === "HARRY") {
        circle(currentlyPlacedWeapons[selectedWeaponIndex].pos.x, currentlyPlacedWeapons[selectedWeaponIndex].pos.y, HARRY_RANGE);
      }
    }

    //Draw the radius around the weapon of it's selected
    for (let i = 0; i < currentlyPlacedWeapons.length; i++) {
      //only draw the idle sprites when we aren't attacking and when the round ended dialogue isnt on screen and when the confirm exit screen isnt showing
      if (currentlyPlacedWeapons[i].areWeAttacking === false && roundEnded === false && showConfirmExitPanel === false) {

        currentlyPlacedWeapons[i].moveIdle();
        currentlyPlacedWeapons[i].displayIdle();
      }
    }

    if (selectedWeapon != 'null') {

      image(cancelBuyImg, UNIT * 42.5, UNIT * 23);
      fill(0);
      textSize(30);
      text("Cancel Buy", UNIT * 41, UNIT * 22.75);
      text("(ESC)", UNIT * 41.5, UNIT * 23.70);

      /* UNCOMMENT THIS TO SEE THE BOUNDARIES
      fill(0);
      rect(0, 0, UNIT * 31, UNIT * 11);
      rect(0, UNIT * 14, UNIT * 22, UNIT * 8);
      rect(UNIT * 22, UNIT * 16, UNIT * 18, UNIT * 6);
      rect(UNIT * 35, UNIT * 9, UNIT * 5, UNIT * 7);
      rect(UNIT * 31, 0, UNIT * 9, UNIT * 6);
      rect(UNIT * 26, UNIT * 10, UNIT * 5, UNIT * 2.5);
      */

      //Draw green radius because we can place
      if ((rectCircleCollision(0, 0, UNIT * 31, UNIT * 11, mouseX, mouseY + UNIT, 1) === true ||
          rectCircleCollision(0, UNIT * 14, UNIT * 22, UNIT * 8, mouseX, mouseY, 1) === true ||
          rectCircleCollision(UNIT * 22, UNIT * 16, UNIT * 18, UNIT * 6, mouseX, mouseY + UNIT, 1) === true ||
          rectCircleCollision(UNIT * 35, UNIT * 9, UNIT * 5, UNIT * 7, mouseX, mouseY + UNIT, 1) === true ||
          rectCircleCollision(UNIT * 31, 0, UNIT * 9, UNIT * 6, mouseX, mouseY + UNIT, 1) === true ||
          rectCircleCollision(UNIT * 26, UNIT * 10, UNIT * 5, UNIT * 2.5, mouseX, mouseY + UNIT, 1) === true) &&
        collision() === false) {
        validWeaponPosition = true;
        fill('rgba(0, 255, 0, 0.25)');
      }

      //Draw red radius because we can't place
      else {
        validWeaponPosition = false;
        fill('rgba(255, 0, 0, 0.25)');
      }
    }
    if (selectedWeapon === 'BARBARIAN') {
      circle(mouseX, mouseY, BARBARIAN_RANGE);
      image(barbarianIdle[0], mouseX, mouseY);
    } else if (selectedWeapon === 'WIZARD') {
      circle(mouseX, mouseY, WIZARD_RANGE);
      image(wizardIdle[0], mouseX + WIZARD_IMG_X_OFFSET, mouseY - WIZARD_IMG_Y_OFFSET);
    } else if (selectedWeapon === 'RON') {
      circle(mouseX, mouseY, RON_RANGE);
      image(ronIdle[0], mouseX + RON_IMG_X_OFFSET, mouseY);
    } else if (selectedWeapon === 'HERMIONE') {
      circle(mouseX, mouseY, HERMIONE_RANGE);
      image(hermioneIdle[0], mouseX + HERMIONE_IMG_X_OFFSET, mouseY);
    } else if (selectedWeapon === 'HARRY') {
      circle(mouseX, mouseY, HARRY_RANGE);
      image(harryIdle[0], mouseX + HARRY_IMG_X_OFFSET, mouseY);
    }
  }
}
