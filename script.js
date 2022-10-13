const startButton = document.querySelector(".startButton")
const questionNumber = document.querySelector(".number")
const text = document.querySelector(".text")
const image = document.querySelector(".image")
const popUp = document.querySelector(".popUp")
const start = document.querySelector(".start")
const game = document.querySelector(".game")
const final = document.querySelector(".final")
const againButton = document.querySelector(".againButton")
const homeButton = document.querySelector(".homeButton")
const clickSound = document.getElementById("click")

let totalQuestion;
let current;
let answer;
let currentSound;
let animalSounds = [];
let play;
let computerInput;
let playerInput;

let animal = [
    {name: "Cat", image:"./img/catInBarn.png", help:"./img/cat.png"},
    {name: "Chicken", image:"./img/chickenInBarn.png", help:"./img/chicken.png"},
    {name: "Dog", image:"./img/dogInBarn.png", help:"./img/dog.png"},
    {name: "Donkey", image:"./img/donkeyInBarn.png", help:"./img/donkey.png"},
    {name: "Duck", image:"./img/duckInBarn.png", help:"./img/duck.png"},
    {name: "Pig", image:"./img/pigInBarn.png", help:"./img/pig.png"},
    {name: "Horse", image:"./img/horseInBarn.png", help:"./img/horse.png"},
    {name: "Cow", image:"./img/cowInBarn.png", help:"./img/cow.png"}
]

startButton.addEventListener("click", () => {
    playClickSound()
    current = 0
    totalQuestion = Math.floor(Math.random() * 5) + 5;
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
        Question()
      }, 200);
})

againButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        final.classList.add("hide")
        start.classList.remove("hide")
      }, 200);
})

homeButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        location.assign('https://gimme.sg/activations/dementia/');
      }, 200);
})

    for(let x = 1; x < 5; x ++){
        let selectedClass = "btn" + x
        let selectedBtn = document.querySelector(`.${selectedClass}`)
        
        selectedBtn.addEventListener("click", () => {
            if(play == false){
                playClickSound()
                let data = selectedBtn.getAttribute("data")
                if(data == answer.name){
                    console.log("S")
                    play = true
                    selectedBtn.src = answer.image
                    playAnimalSound(selectedBtn, data, x)
                      return
                }
                else{
                    popUp.classList.remove("hide")
                    let delay = setTimeout(() => {
                        currentSound = 1
                        popUp.classList.add("hide")
                        play = true
                        PlaySound()
                      }, 1000);
                }
            }
        })
    }

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function Question(){
    if(current == totalQuestion){
        game.classList.add("hide")
        final.classList.remove("hide");
        return
    }

    play = true
    choice = 0
    currentSound = 1
    current +=1
    questionNumber.innerHTML = current + "/" + totalQuestion;

    let tempoArray = [];

    for(let x = 0; x < (animal.length - 2); x++){
        tempoArray.push(animal[x])
    }
    console.log(tempoArray)

    qIndex = Math.floor(Math.random() * animal.length);
    
    answer = animal[qIndex]
    if(qIndex < 6){
        tempoArray.splice(qIndex, 1)
    }
    text.innerHTML = `Where is the ${answer.name}?`
    image.src = answer.help

    console.log(tempoArray.length)

    animalSounds = [];

    for(let x=1; x < 4; x++){
        let currentClass = "btn" + x
        let currentBtn = document.querySelector(`.${currentClass}`)
        
        let randomFood = Math.floor(Math.random() * tempoArray.length);
        console.log(randomFood)

        currentBtn.setAttribute("data", tempoArray[randomFood].name)
        animalSounds.push(tempoArray[randomFood])
        tempoArray.splice(randomFood, 1)
        console.log(tempoArray)
    }

    value = Math.random() > 0.5 ? 6 : 7
    let btn = document.querySelector(`.btn4`)
    console.log(animal[value])
    btn.setAttribute("data", animal[value].name)
    animalSounds.push(animal[value])

    console.log(animalSounds)
    let integer
    if(qIndex < 6){
        integer = Math.floor(Math.random() * 3)
    }
    if(qIndex > 5){
        integer = 3
    }
    let randomClass = "btn" + (integer  + 1);
    let randomBtn = document.querySelector(`.${randomClass}`)
    randomBtn.setAttribute("data", answer.name)
    if(integer < 3){
        animalSounds.splice(integer, 1, answer)
    }
    let delay = setTimeout(() => {
        PlaySound()
      }, 700);
}

function PlaySound(){
    if(currentSound > animalSounds.length){
        play = false
        return
    }

    console.log(animalSounds)
    let currentspot = document.querySelector(`.btn${currentSound}`)
    console.log(currentspot)
    let element = currentspot.getAttribute("data")
    let delay = setTimeout(() => {
        play = true
        playNote(currentspot,element)
      }, 200);
}

function playNote(key, element) {
      const noteAudio = document.getElementById(element)
      console.log(noteAudio)
      noteAudio.currentTime = 0
      noteAudio.play()
      if(currentSound == 4){
        key.src = "./img/musicInBarn2.png"
      }
      else{
        key.src = "./img/musicInBarn.png"
      }
      noteAudio.addEventListener('ended', () => {
        if(currentSound == 4 ){
            key.src = "./img/closeDoor.png"
        }
        else{
            key.src = "./img/closeWindow.png"
        }
        currentSound+=1
        PlaySound()
      },{once: true})
    }

  function playAnimalSound(selectedBtn, element, x) {
      const noteAudio = document.getElementById(element)
      noteAudio.currentTime = 0
      noteAudio.play()
      noteAudio.addEventListener('ended', () => {
        if(x == 4){
            selectedBtn.src = "./img/closeDoor.png"
        }
        if(x < 4){
            selectedBtn.src = "./img/closeWindow.png"
        }
        Question()
    },{once: true})
  }