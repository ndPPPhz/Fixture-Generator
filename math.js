function findPermutations(array) {
    if (!array || typeof array !== "object"){
      throw 'Argument 1 must be an array'
    } else if (array.length < 2 ){
      return array
    }

    let permutationsArray = [] 
     
    for (let i = 0; i < array.length; i++){
      let element = [array[i]]
  
      let remainingObjects = [...array.slice(0, i), ...array.slice(i + 1, array.length)]
      
      for (let permutation of findPermutations(remainingObjects)){
        permutationsArray.push(element.concat(permutation))
      }
    }
    return permutationsArray
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function factorial(n) {
  if (n === 1) {
      return n
  }
  return n * factorial(n-1)
}

exports.findPermutations = findPermutations
exports.getRandomInt = getRandomInt
exports.factorial = factorial