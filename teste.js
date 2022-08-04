function calculeArea(v1, v2) {
    const v1xv2 = [ v1[1]*v2[2] - v1[2]*v2[1],
                    v1[2]*v2[0] - v1[0]*v2[2],
                    v1[0]*v2[1] - v1[1]*v2[0] ]
    
    return (v1xv2[0]**2 + v1xv2[1]**2 + v1xv2[2]**2)**(1/2)*v1xv2[2]/Math.abs(v1xv2[2])
}

console.log([2,4]-[1,3])