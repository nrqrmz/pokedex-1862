const cardTemplate = document.getElementById('cardTemplate')
const cardsContainer = document.getElementById('cardsContainer')
const infoTemplate = document.getElementById('infoTemplate')
const infoContainer = document.getElementById('infoContainer')

fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then((pokedata) => {
          const cardClone = cardTemplate.content.cloneNode(true)

          cardClone.querySelector("img").src = pokedata.sprites.front_default
          cardClone.querySelector("h2").textContent = pokedata.name
          cardClone.querySelector("p").textContent = pokedata.types
            .map((t) => t.type.name )
            .join("/")
            cardClone.querySelector("a").addEventListener("click", (event) => {
              event.preventDefault()

              infoContainer.innerHTML = ""

              const infoClone = infoTemplate.content.cloneNode(true)

              infoClone.querySelector("img").src = pokedata.sprites.front_default
              infoClone.querySelector("h2").textContent = pokedata.name
              infoClone.querySelector("p").textContent = pokedata.types
                .map((t) => t.type.name )
                .join("/")

              infoContainer.appendChild(infoClone)
          })

          cardsContainer.appendChild(cardClone)
        })
    })
  })
