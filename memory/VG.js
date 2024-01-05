let lockGame = true
let hasFlippedCard = false
let startTheTimer = false
let gameOver = false
let gameWon = false
let timerCountdown = null
let matchedPairs = 0
let flipCount = 0
let totalTime = 0
let firstCard
let secondCard

const gameContainer = document.querySelector(".wrapper")
const cardDeckContainer = document.querySelector(".cards")
const resetButton = document.querySelector(".reset-button")
const timer = document.getElementById("timer")

const cardDeck = [
    { id: "ronaldo", img: "img/img1.jpg" },
    { id: "ronaldo", img: "img/img1.jpg" },
    { id: "messi",   img: "img/img2.jpg" },
    { id: "messi",   img: "img/img2.jpg" },
    { id: "crosby",  img: "img/img3.jpg" },
    { id: "crosby",  img: "img/img3.jpg" },
    { id: "bedard",  img: "img/img4.jpg" },
    { id: "bedard",  img: "img/img4.jpg" },
    { id: "cena",    img: "img/img5.jpg" },
    { id: "cena",    img: "img/img5.jpg" },
    { id: "johnson", img: "img/img6.jpg" },
    { id: "johnson", img: "img/img6.jpg" }
]

const shuffleCardDeck = function(cardDeck) {
    for (let currentIndex = cardDeck.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
        const temporaryValue = cardDeck[currentIndex]

        cardDeck[currentIndex] = cardDeck[randomIndex]
        cardDeck[randomIndex] = temporaryValue
    }

    return cardDeck
}

const createCard = function(cardDeck) {
    const cardContainer = document.createElement("li")
    const frontImg = document.createElement("img")
    const backImg = document.createElement("img")

    cardContainer.className = "card"
    frontImg.className = "img-front"
    backImg.className = "img-back hidden"

    frontImg.src = cardDeck.img
    backImg.src = "img/qmark.png"

    frontImg.alt = "card-img"
    backImg.alt = "icon"

    cardContainer.setAttribute("data-id", cardDeck.id)

    cardContainer.appendChild(frontImg)
    cardContainer.appendChild(backImg)

    return cardContainer
}

const updateFlipsCounter = function() {
    const flipsCounter = document.getElementById("flips")

    flipsCounter.textContent = flipCount
}

const isCardsMatched = function() {
    const firstCardFrontImg = firstCard.querySelector(".img-front")
    const secondCardFrontImg = secondCard.querySelector(".img-front")
    const cardsMatched = firstCard.dataset.id === secondCard.dataset.id

    if (cardsMatched) hideMatchedCards()

    else unflipCards(firstCardFrontImg, secondCardFrontImg)
}

const hideMatchedCards = function() {
    setTimeout(function() {
        firstCard.style.visibility = "hidden"
        secondCard.style.visibility = "hidden"

        matchedPairs++
        resetGameState()

        if (matchedPairs === cardDeck.length / 2) displayGameWon()

    }, 600)
}

const unflipCards = function(firstCardFrontImg, secondCardFrontImg) {
    lockGame = true

    setTimeout(function() {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        firstCardFrontImg.classList.remove("hidden")
        secondCardFrontImg.classList.remove("hidden")

        resetGameState()

    }, 1000)
}

const startTimer = function() {
    if (startTheTimer && totalTime > 0 && !gameWon) {
        lockGame = false

        function updateTimer() {
            timer.textContent = totalTime + "s"

            if (totalTime <= 0 && !gameOver) {
                gameOver = true

                displayGameOver()
                clearInterval(timerCountdown)
            } else if (totalTime > 0 && !gameWon) totalTime--

            else clearInterval(timerCountdown)
        }

        timerCountdown = setInterval(updateTimer, 1000)
    }
}

const displayGameOver = function() {
    const gameOverText = document.createElement("p")

    gameOverText.textContent = "GAME OVER"

    gameOverText.className = "game-over-paragraph"

    gameContainer.appendChild(gameOverText)

    gameOver = true
}

const displayGameWon = function() {
    const gameWonText = document.createElement("p")

    gameWonText.textContent = "YOU WIN"

    gameWonText.className = "game-won-paragraph"

    gameContainer.appendChild(gameWonText)

    gameWon = true
    clearInterval(timerCountdown)
}

const resetGameState = function() {
    firstCard = null
    secondCard = null
    hasFlippedCard = false
    lockGame = false
}

const resetGame = function() {
    const gameWonText = document.querySelector(".game-won-paragraph")
    const gameOverText = document.querySelector(".game-over-paragraph")

    cardDeckContainer.innerHTML = ""
    timer.textContent = ""

    totalTime = parseInt(timeSelect.value)
    lockGame = true
    hasFlippedCard = false
    gameWon = false
    gameOver = false
    startTheTimer = false
    firstCard = null
    secondCard = null
    matchedPairs = 0
    flipCount = 0

    if (gameOverText) gameOverText.remove()

    if (gameWonText) gameWonText.remove()

    for (let currentIndex = 0; currentIndex < shuffledCardDeck.length; currentIndex++) {
        const card = createCard(shuffledCardDeck[currentIndex])

        cardDeckContainer.appendChild(card)
    }

    updateFlipsCounter()
    clearInterval(timerCountdown)
}

cardDeckContainer.addEventListener("click", function(event) {
    const clickedCard = event.target.closest(".card")

    if (!timeSelect.value || lockGame) {
        timeSelect.selectedIndex = 0

        return
    }

    if (!clickedCard) return

    flipCard.call(clickedCard)
})

resetButton.addEventListener("click", function() {
    resetGame()
})

timeSelect.addEventListener("change", function() {
    resetGame()
    
    totalTime = parseInt(timeSelect.value)
    startTheTimer = true
    lockGame = false

    startTimer()
})

const shuffledCardDeck = shuffleCardDeck(cardDeck)
for (let currentIndex = 0; currentIndex < shuffledCardDeck.length; currentIndex++) {
    const placeCards = createCard(shuffledCardDeck[currentIndex])

    cardDeckContainer.appendChild(placeCards)
}