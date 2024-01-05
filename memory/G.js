document.addEventListener("DOMContentLoaded",function(){NiceSelect.bind(document.getElementById("time-select"))})

const timeSelect = document.getElementById("time-select")

const createTimeDropdown = function() {
    const defaultOption = document.createElement("option")

    const timeOptions = ["15", "30", "60"]

    defaultOption.selected = true
    defaultOption.disabled = true
    defaultOption.value = ""
    defaultOption.textContent = "Välj Tid:"

    timeSelect.insertBefore(defaultOption, timeSelect.firstChild)

    for (let currentIndex = 0; currentIndex < timeOptions.length; currentIndex++) {
        const options = document.createElement("option")
        const values = timeOptions[currentIndex]

        options.textContent = `${values}s`
        options.value = values

        timeSelect.appendChild(options)
    }

    return timeSelect
}

const timeDropdown = createTimeDropdown()

const flipCard = function() {
    const frontImg = this.querySelector(".img-front")
    const backImg = this.querySelector(".img-back")

    frontImg.classList.toggle("hidden")
    backImg.classList.toggle("hidden")
    this.classList.add("flip")

    if (lockGame) return

    if (this === firstCard) return

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this

        return
    }

    secondCard = this
    isCardsMatched()

    flipCount++
    updateFlipsCounter()
}