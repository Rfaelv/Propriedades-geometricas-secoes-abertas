const buttonAdd = document.querySelector("#add")
const buttonDelete = document.querySelector("#delete")
const buttonCalc = document.querySelector("#Calc")

buttonAdd.addEventListener('click', () => {
    const newSction = document.createElement('section')
    const inputX = document.createElement('input')
    inputX.type = 'text'
    inputX.className = 'x'

    const inputY = document.createElement('input')
    inputX.type = 'text'
    inputX.className = 'y'

    const inputT = document.createElement('input')
    inputX.type = 'text'
    inputX.className = 't'

    newSction.appendChild(inputX)
    newSction.appendChild(inputY)
    newSction.appendChild(inputT)

    document.querySelector("#input").appendChild(newSction)
})

buttonDelete.addEventListener('click', () => {
    if (document.querySelector("#input").children.length > 2) {
        document.querySelector("#input").lastChild.remove()
    }
})

buttonCalc.addEventListener('click', () => {
    const x = document.getElementsByClassName("x")
    const y = document.getElementsByClassName("y")
    const t = document.getElementsByClassName("t")

    var A = 0
    var wAcumulado = 0
    w1 = []

    for (let i = 1; i < x.length; i++) {
        A += ((x[i].value - x[i-1].value)**2 + (y[i].value - y[i-1].value)**2)**(1/2)*t[i-1].value

        wAcumulado += calculeArea([x[i-1], y[i-1], 0], [x[i], y[i], 0])
        w1.push(wAcumulado)
    }
    
    const B = [0, 0]
})

function calculeArea(v1, v2) {
    return 0
}