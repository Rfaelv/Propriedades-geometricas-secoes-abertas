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
    const tick = document.getElementsByClassName("t")

    var A = 0
    var wAcumulado = 0
    var w1 = [0]
    var Ix1 = 0
    var Iy1 = 0
    var Iw1 = 0
    var Ixx1 = 0
    var Iyy1 = 0
    var Iww1 = 0
    var Ixy1 = 0
    var Ixw1 = 0
    var Iyw1 = 0
    var B = [0, 0]

    for (let i = 1; i < x.length; i++) {

        wAcumulado += calculeArea([parseFloat(x[i-1].value), parseFloat(y[i-1].value), 0], [parseFloat(x[i].value), parseFloat(y[i].value), 0])
        w1.push(wAcumulado)

        const b = ((parseFloat(x[i].value) - parseFloat(x[i-1].value))**2 + (parseFloat(y[i].value) - parseFloat(y[i-1].value))**2)**(1/2)

        const t = parseFloat(tick[i-1].value)
        const yi = parseFloat(y[i-1].value)
        const yj = parseFloat(y[i].value)
        const xi = parseFloat(x[i-1].value)
        const xj = parseFloat(x[i].value)
        const wi = w1[i-1]
        const wj = w1[i]

        A += ((parseFloat(x[i].value) - parseFloat(x[i-1].value))**2 + (parseFloat(y[i].value) - parseFloat(y[i-1].value))**2)**(1/2)*parseFloat(tick[i-1].value)

        Ix1 += b*t/2*(yi + yj)
        Iy1 += b*t/2*(xi + xj)
        Iw1 += b*t/2*(wi + wj)

        console.log("Iw1 = " + b + "*" + t + "/2*(" + wi +"+" + wj +")")
        console.log(Iw1)


        Ixx1 += b*t/3*(yi**2 + yj**2 + yi*yj)
        Iyy1 += b*t/3*(xi**2 + xj**2 + xi*xj)
        Iww1 += b*t/3*(wi**2 + wj**2 + wi*wj)

        Ixy1 += b*t/3*(xi*yi + xj*yj + xi*yj/2 + xj*yi/2)
        Ixw1 += b*t/3*(xi*wi + xj*wj + xi*wj/2 + xj*wi/2)
        Iyw1 += b*t/3*(yi*wi + yj*wj + yi*wj/2 + yj*wi/2)
        
    }

    console.log("Iww1 = " + Iww1)
    
    const x01 = Iy1/A
    const y01 = Ix1/A
    const w01 = Iw1/A

    // console.log("w0 = " +  w01)
    // console.log(y01)

    var Ix2 = 0
    var Iy2 = 0
    var Iw2 = 0
    var Ixx2 = 0
    var Iyy2 = 0
    var Iww2 = 0
    var Ixy2 = 0
    var Ixw2 = 0
    var Iyw2 = 0
    B = [B[0]-x01, B[1]-y01]

    for (let i = 1; i < x.length; i++) {

        const b = ((parseFloat(x[i].value) - parseFloat(x[i-1].value))**2 + (parseFloat(y[i].value) - parseFloat(y[i-1].value))**2)**(1/2)

        const t = parseFloat(tick[i-1].value)
        const yi = parseFloat(y[i-1].value) - y01
        const yj = parseFloat(y[i].value) - y01
        const xi = parseFloat(x[i-1].value) - x01
        const xj = parseFloat(x[i].value) - x01
        const wi = w1[i-1] - w01
        const wj = w1[i] - w01

        console.log("wi = " + wi)
        console.log("wj = " + wj)

        Ix2 += b*t/2*(yi + yj)
        Iy2 += b*t/2*(xi + xj)
        Iw2 += b*t/2*(wi + wj)

        // console.log(Ix2)

        Ixx2 += b*t/3*(yi**2 + yj**2 + yi*yj)
        Iyy2 += b*t/3*(xi**2 + xj**2 + xi*xj)
        Iww2 += b*t/3*(wi**2 + wj**2 + wi*wj)

        // console.log(b + "*" + t + "/3*(" + yi + "**2 + " + yj + "**2 + " + yi + "*" +yj)
        // console.log(Ixx2)

        Ixy2 += b*t/3*(xi*yi + xj*yj + xi*yj/2 + xj*yi/2)
        Ixw2 += b*t/3*(xi*wi + xj*wj + xi*wj/2 + xj*wi/2)
        Iyw2 += b*t/3*(yi*wi + yj*wj + yi*wj/2 + yj*wi/2)
        
    }

    console.log("Iww2 =" + Iww2)

    const fi = Math.atan(2*Ixy2/(Ixx2-Iyy2))/2
    const deltax = (Ixw2*Iyy2-Iyw2*Ixy2)/(Ixx2*Iyy2-Ixy2**2) 
    const deltay = (Ixw2*Ixy2-Iyw2*Ixx2)/(Ixx2*Iyy2-Ixy2**2) 

    console.log('deltax = ' + deltax)
    console.log(Ixw2/Ixx2)
    console.log('deltay = ' + deltay)

    const Ixx3 = (Ixx2 + Iyy2)/2 + 1/2*((Ixx2 - Iyy2)**2 + 4*Ixy2)**(1/2)
    const Iyy3 = (Ixx2 + Iyy2)/2 - 1/2*((Ixx2 - Iyy2)**2 + 4*Ixy2)**(1/2)
    const Iww3 = Iww2 + deltay*Iyw2 - deltax*Ixw2

    const CCx2 = deltax + B[0] 
    const CCy2 = deltay + B[1] 

    const CCx3 = Math.cos(fi)*CCx2 + Math.sin(fi)*CCy2
    const CCy3 = - Math.sin(fi)*CCx2 + Math.cos(fi)*CCy2


    console.log("xg = " + x01)
    console.log("yg = " + y01)
    console.log("Ix = " + Ixx3)
    console.log("Iy = " + Iyy3)
    console.log("Cw = " + Iww3)
    console.log("C.C = " + CCx3 + ", " + CCy3)
    console.log("fi = "+fi)
})

function calculeArea(v1, v2) {
    const v1xv2 = [ v1[1]*v2[2] - v1[2]*v2[1],
                    v1[2]*v2[0] - v1[0]*v2[2],
                    v1[0]*v2[1] - v1[1]*v2[0] ]
    
    return (v1xv2[0]**2 + v1xv2[1]**2 + v1xv2[2]**2)**(1/2)*v1xv2[2]/Math.abs(v1xv2[2])
}