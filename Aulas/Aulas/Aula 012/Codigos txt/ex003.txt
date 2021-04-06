var exp = 25
var cal = exp % 2
switch (exp) {
    case 78:
        console.log(`O resultado é 78, um numero par`)
        break
    case 25:
        console.log(`O resultado é 25, um numero impar`)
        break
    case 26:
        console.log(`O resultado é 26, um numero par`)
        break
    default:
        if (cal == 0) {
            console.log(`O resultado é ${exp}, um numero par`)
        } else {
            console.log(`O resultado é ${exp}, um numero impar`)
        }
}