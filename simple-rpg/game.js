const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement("button");
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if(nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange place and see a jar of blue go near you.",
        options: [
            {
                text: 'Take goo',
                setState: { blueGoo: true},
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answers to where you are when you come across a merchant.",
        options: [
            {
                text: "Trade the goo for a sword",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: "Trade the goo for a shield",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3
            },
            {
                text: "Ignore the Merchant",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "after leaving the merhchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
        options: [
            {
                text: "Explore the castle",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 4
            },
            {
                text: "find a room to sleep at in the town.",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 5
            },
            {
                text: "find some hay in a stable to sleep in.",
                nextText: 6
            }
        ]
    }, 
    {
        id: 4,
        text: "Your are tired that you fall asleep while exploring the castle  and are killed by some terrible monster in your sleep",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()
