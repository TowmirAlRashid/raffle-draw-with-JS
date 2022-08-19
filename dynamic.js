const input = document.getElementById('input')
const nameList = document.getElementById('name-list')
const display = document.getElementById('display')
const giveATry = document.getElementById("give-a-try");
const firstPosition = document.getElementById('first-position')
const secondPosition = document.getElementById('second-position')
const thirdPosition = document.getElementById('third-position')

// extract text from text-area and put it in an array
const participantNames = []

input.addEventListener('keypress', function(event) {
  if (event.key == "Enter") {
    let newNames = event.target.value.split(', ')
    if (newNames[0] !== '') {
      newNames.forEach(name => {
        participantNames.push(name)
        let item = createListItem(name)
        nameList.appendChild(item)
        event.target.value = ''
      })
    }
  }
})



// render the names extracted from text area
const createListItem = (name) => {
  let li = document.createElement('li')
  li.className = 'list-group-item'
  li.innerHTML = name
  return li;
}

// shuffle the names array, pick a random name and remove the name from names array, then display the picked name as selected winner

giveATry.addEventListener('click', () => {
  if (participantNames.length === 0) {
    alert("You didn't enter names to show!")
  } else {
    let shuffledNames = arrayShuffle(participantNames)

    for (let i = 0; i < shuffledNames.length; i++) {
      (function(i, count) {
        setTimeout(() => {
          let rand = Math.floor(Math.random() * shuffledNames.length)

          display.innerHTML = shuffledNames[rand];

          if (count === shuffledNames.length - 1) {
            if (
              firstPosition.innerHTML &&
              secondPosition.innerHTML &&
              thirdPosition.innerHTML
            ) {
              giveATry.disabled = true;
            } else {
              if (!firstPosition.innerHTML) {
                firstPosition.innerHTML = shuffledNames[rand];

                let index = participantNames.indexOf(shuffledNames[rand]);

                participantNames.splice(index, 1);
              } else if (!secondPosition.innerHTML) {
                secondPosition.innerHTML = shuffledNames[rand];

                let index = participantNames.indexOf(shuffledNames[rand]);

                participantNames.splice(index, 1);
              } else if (!thirdPosition.innerHTML) {
                thirdPosition.innerHTML = shuffledNames[rand];

                let index = participantNames.indexOf(shuffledNames[rand]);

                participantNames.splice(index, 1);
              }
            }
          }
        }, i)
      })(i * 100, i)
    }
  }
})

let arrayShuffle = (array) => {
  let shuffledArray = [...array]
  // using the Array Shuffle Fisher-Yates Method

  // start from the last element and gradually move down
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = (Math.floor(Math.random() * (i + 1)))
    
    // swap
    let temp = shuffledArray[j]
    shuffledArray[j] = shuffledArray[i]
    shuffledArray[i] = temp
  }

  return shuffledArray;
}
