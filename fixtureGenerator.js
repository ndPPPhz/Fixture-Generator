const { 
    findPermutations,
    getRandomInt,
    factorial
} = require('./math')

/* 
    Given an array as input, it returns an 2xM Matrix
    where M = Int(array.length / 2). Array must contain
    an even number of elements.
    [1,2,3,4] => [[1,2], [3,4]]
*/
function generate2NMatrix(array) {
    if (array.length % 2) {
        throw 'Array should contain an even number of elements'
    }

    if (array.length <= 2) {
        return [array]
    }
    // A matrix aka array of array. 
    let matrix = []
    // Determine how many rows are needed to store the array as a 2xN Matrix
    const rows = Math.round(array.length / 2)
    // Generate the empty array for each row
    for (let index = 0; index < rows; index++) {
        matrix[index] = []
    }

    // Fill the matrix with the value from array
    array.forEach((value, index) => {
        // The element with index 3 (hence the forth)  must go in the second row as second element
        // Row is retrieved by taking the integer part of index / 2. 3/2 = 1.5 => 1. Row Index 1
        // Column is retrieved by taking the modulo of index % 2. 3 % 2 = 1 => 1. Column Index 1
        let row = Math.floor(index / 2)
        let column = index % 2
        matrix[row][column] = value
    })
    return matrix
}

/* 
    Given a 2xM Matrix, it returns the latter 
    with the elements rotades clockwise
    around the pivot (first element)
*/
function rotateAroundPivot(matrix) {
    const rows = matrix.length
    const height = rows

    if (rows < 2) {
        return matrix
    }

    const neededRotationCount = rows * 2 - 1
    // In order to swap each element with the next one
    // we need one tmp variable
    let tmp

    // Starting index
    let currentIndex = {
        row: 0,
        column: 1
    }

    for (let i = 0; i < neededRotationCount; i++) {
        // Retrieve the first next index
        const nIndex = nextIndex(currentIndex.row, currentIndex.column, height)

        // First rotation
        if (typeof tmp === 'undefined') {
            // Save the value stored in the next index
            tmp = matrix[nIndex.row][nIndex.column]
            // Set the value in the current index at the next index position
            matrix[nIndex.row][nIndex.column] = matrix[currentIndex.row][currentIndex.column]
            // Set the current index for the next loop
            currentIndex = nIndex
        } else {
            const nextIndexValue = matrix[nIndex.row][nIndex.column]
            // Put the tmp value at the nextIndex place
            matrix[nIndex.row][nIndex.column] = tmp
            // Save the nextIndexValue in the tmp variable
            tmp = nextIndexValue
            // Set the current index for the next loop
            currentIndex = nIndex
        }
    }
}

/*
    Given an index of a 2xMatrixHeight matrix, it returns the next one in clockwise order
*/
function nextIndex(row, column, matrixHeight) {
    if (row >= matrixHeight) {
       throw 'Row index must be less than matrix height - 1'
    }

    // If we are at the bottom
    if (row === matrixHeight - 1) {
        // Left item
        if (column === 0) {
            // Egde case for the 2x2 matrix scenario.
            // The first element of the last row
            // has to be moved diagonally rather than upwards since it's the element
            // beneath the pivot. 
            if (matrixHeight === 2) {
                return {
                    row: 0,
                    column: 1
                }
            } else  {
                // Move upwards
                return {
                    row: row - 1,
                    column: 0
                }
            } 
        } else {
            // Right item
            // Move leftwards
            return {
                row: row,
                column: 0
            }
        }
    } else if (row === 0) {
        // If we are at the top
        if (column === 0) {
            throw 'Invalid index. Index 0-0 is reserved for the pivot'
        }
        // If we are at the item next to the pivot, move downwards
        return {
            row: 1,
            column: 1
        }
    } else if (row === 1 && column === 0) {
        // If we are at the item just below the pivot
        return {
            row: 0,
            column: 1
        }
    } else {
        // We are in the middle
        if (column == 0) {
            // Since we are rotating clockwise, all elements on the left side
            // should move upwards
            return {
                row: row - 1,
                column: column
            }
        } else {
            // Those on the right side move downwards
            return {
                row: row + 1,
                column: column
            }
        }
    }
}

function turnIntoMatchDay(matrix) {
    return matrix.map((match) => {
        return {
            teamA: match[0],
            teamB: match[1]
        }
    })
}


function createFixture(array) {
    let matches = []
    const matchesCount = array.length - 1

    const matrix = generate2NMatrix(array)

    for (let day = 0; day < matchesCount; day++) {
        const matchDay = turnIntoMatchDay(matrix)
        matches.push({ 
            name: `MatchDay ${day+1}`,
            value: matchDay
        })
        rotateAroundPivot(matrix)
    }
    return matches
}

/*
    Given an array containing an even number of elements,
    the function returns N random fixtures with the elements
    of the array.
    NB: This function randomly fetches N fixtures from an
    array containing ALL the possible permutations that can
    be generated with the elements contained in the array.
    The number of permutations of n distinct objects is n factorial!!!!
*/
function generateRandomFixtureFromAllPermutations(array, n) {
    if (factorial(array.length) < n) {
        throw 'n must be lower than the factorial(array.lenght)'
    }
    // Find all the permutations of the elements of the array
    // [a,b,c] => [[a, b, c], [a,c,b], [b,a,c], [b,c,a], [c,a,b], [c,b,a]]
    const permutations = findPermutations(array)
    let fixtures = []

    for (let count = 0; count < n; count++) {
        // Randomly pick a random index between 1 and the number of permutations
        const randomIndex = getRandomInt(permutations.length)
        // Fetch the element
        const randomPermutation = permutations[randomIndex]
        // Remove from the available permutations
        permutations.splice(randomIndex, 1)
        // Create a fixture with that permutation as input array
        const randomFixture = createFixture(randomPermutation)
        // Save
        fixtures.push(randomFixture)
    }
    return fixtures
}

/*
    Given an array containing an even number of elements,
    the function returns a random fixture with the elements
    of the array.
*/
function generateRandomFixture(array) {
    let sortedArray = array.sort(() => Math.random() - 0.5)
    // Create a fixture with that permutation as input array
    const randomFixture = createFixture(sortedArray)
    return randomFixture
}

exports.generateRandomFixtureFromAllPermutations = generateRandomFixtureFromAllPermutations
exports.generateRandomFixture = generateRandomFixture