# Fixture-Generator
![foot-ball-icons](https://user-images.githubusercontent.com/6486741/107073907-dabb2d80-67df-11eb-8382-30d4431732b5.png)

The matches **calendar generator** you have been looking for

## Overview
Fixture-Generator is a fancy, quick and random generator of matches you can import in your JS code to create a football league, basketball tournament or any other sport in which all the partecipants have to challenge each other. 

Under the hood is driven by the [Round-robin](https://en.wikipedia.org/wiki/Round-robin_tournament) alghorithm which guarantees thah each contestant meets all other contestants in turn.

## Usage

### NPM
- Package page [fixture-generator](https://www.npmjs.com/package/fixture-generator)
-  Run the command
```
    npm install fixture-generator
```


### Manual integration
- Download the source code [from Github](https://github.com/ndPPPhz/Fixture-Generator/archive/main.zip)
- Import it into your project

### Implementation
There are actually two ways for generating fixtures:
1. Using `generateRandomFixture`. It will return only one random fixture

```javascript
const { generateRandomFixture } = require('.fixtureGenerator.js')

/*
    @param  {Array}     array   The array containing all the attendees
*/
const tournaments = generateRandomFixture([1,2,3,4])

console.log(tournaments)

/*
    [
        {
          name: "MatchDay 1",
          value: [
            {
              teamA: 1,
              teamB: 3,
            },
            {
              teamA: 2,
              teamB: 4,
            },
          ],
        },
        {
          name: "MatchDay 2",
          value: [
            {
              teamA: 1,
              teamB: 2,
            },
            {
              teamA: 4,
              teamB: 3,
            },
          ],
        },
        {
          name: "MatchDay 3",
          value: [
            {
              teamA: 1,
              teamB: 4,
            },
            {
              teamA: 3,
              teamB: 2,
            },
          ],
        }
    ]
*/

```

2. `generateRandomFixtureFromAllPermutations` takes as argument the number of fixtures you want to generate. 
```javascript
const { generateRandomFixtureFromAllPermutations } = require('.fixtureGenerator.js')

/*
    @param  {Array}     array   The array containing all the attendees
    @param  {Number}    n       The number of tournaments that needs to be randomly generated 
*/
const tournaments = generateRandomFixtureFromAllPermutations([1,2,3,4], 2)

console.log(tournaments)

/*
    // First calendar
    [.....],
    // Second calendar
    [
        {
          name: "MatchDay 1",
          value: [
            {
              teamA: 1,
              teamB: 3,
            },
            {
              teamA: 2,
              teamB: 4,
            },
          ],
        },
        {
          name: "MatchDay 2",
          value: [
            {
              teamA: 1,
              teamB: 2,
            },
            {
              teamA: 4,
              teamB: 3,
            },
          ],
        },
        {
          name: "MatchDay 3",
          value: [
            {
              teamA: 1,
              teamB: 4,
            },
            {
              teamA: 3,
              teamB: 2,
            },
          ],
        }
    ]
*/
```

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © Annino De Petra
