let playerCount;
let players = [];
let currentPlayer = 0;
let currentTurnScore = 0; // Pelaajan nykyisen vuoron pisteet

function updateCurrentPlayer() {
    document.getElementById("currentPlayer").textContent = ` ${players[currentPlayer].name}`;
}

function initializeGame() {
    // Tarkistetaan, onko peli jo käynnissä
    if (players.length > 0) {
        let confirmRestart = confirm("Haluatko aloittaa uuden pelin? Nykyinen peli nollataan.");
        if (!confirmRestart) {
            return; // Peliä ei aloiteta uudestaan
        }
    }

    playerCount = parseInt(document.getElementById("playerCount").value);

    if (playerCount < 2 || playerCount > 4) {
        alert("Pelaajien määrän tulee olla 2-4.");
        return;
    }

    // Tyhjennä pelaajalista ja aloita uusi peli
    players = [];
    currentPlayer = 0;
    currentTurnScore = 0;

    for (let i = 0; i < playerCount; i++) {
        let playerName = prompt(`Anna pelaaja ${i + 1} nimi:`);
        players.push({ name: playerName, score: 0 });
    }

    updatePlayerList();
    document.getElementById("game").style.display = "block";
    updateCurrentPlayer();
}


function updatePlayerList() {
    let playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    players.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.name}: ${player.score} pistettä`;
        playerList.appendChild(li);
    });
}

function rollDie() {
    // Tarkista, onko peli jo päättynyt
    if (document.querySelector("button").disabled) {
        return;
    }
    let resultElement = document.getElementById("result");
    let roll = Math.floor(Math.random() * 6) + 1;
    noppaImage.src = `img/noppa${roll}.gif`;

    if (roll === 1) {
        resultElement.textContent = `${players[currentPlayer].name} heitti 1 ja menetti ${currentTurnScore} pistettä.`;
        currentTurnScore = 0; // Nollataan vuoron pisteet
        endTurn(); // Siirry seuraavalle pelaajalle
    } else {
        currentTurnScore += roll;
        resultElement.textContent = `${players[currentPlayer].name} heitti ${roll}, ja vuoron pisteet ovat nyt ${currentTurnScore}.`;
    }
}

function endTurn() {
    players[currentPlayer].score += currentTurnScore;
    currentTurnScore = 0; // Nollataan vuoron pisteet

    if (players[currentPlayer].score >= 100) {
        document.getElementById("result").textContent = `${players[currentPlayer].name} voitti! Onneksi olkoon!`;
        document.querySelector("button").disabled = true; // Estä heittämisen lopettaminen voiton jälkeen
        updatePlayerList(); // Päivitä pelaajien pisteet
    } else {
        currentPlayer = (currentPlayer + 1) % playerCount; // Siirry seuraavaan pelaajaan
        updatePlayerList(); // Päivitä pelaajien pisteet
        updateCurrentPlayer(); // Päivitä vuorossa olevan pelaaja
    }
    // Poista "Heitä noppaa" -nappula käytöstä pelin päättyessä
    if (document.querySelector("button").disabled) {
        document.querySelector("button").disabled = true;
    }
    
}
function startNewGame() {
    playerCount = 0;
    players = [];
    currentPlayer = 0;
    currentTurnScore = 0;

    // Tyhjennä pelaajalista ja nollaa vuorossa oleva pelaaja
    let playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    document.getElementById("currentPlayer").textContent = "";

    // Nollaa tulostaulu ja aktivoi "Aloita peli" -nappula
    document.getElementById("result").textContent = "";
    document.querySelector("button").disabled = false;

    // Piilota noppakuva ja näytä pelaajien lukumäärän valinta
    document.getElementById("game").style.display = "none";
}
