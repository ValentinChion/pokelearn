const showMultiplicationTableInputs = [2, 6, 9, 7];
const showMultiplicationTableOutputs = [
    `2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
2 x 6 = 12
2 x 7 = 14
2 x 8 = 16
2 x 9 = 18
2 x 10 = 20`,
    `6 x 1 = 6
6 x 2 = 12
6 x 3 = 18
6 x 4 = 24
6 x 5 = 30
6 x 6 = 36
6 x 7 = 42
6 x 8 = 48
6 x 9 = 54
6 x 10 = 60`,
    `9 x 1 = 9
9 x 2 = 18
9 x 3 = 27
9 x 4 = 36
9 x 5 = 45
9 x 6 = 54
9 x 7 = 63
9 x 8 = 72
9 x 9 = 81
9 x 10 = 90`,
    `7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70`,
];

const toSnakeCaseInputs = [
    "Hello World",
    "This is a test",
    "AnotherExampleThatIs tricky",
];

const toSnakeCaseOutputs = [
    "hello_world",
    "this_is_a_test",
    "anotherexamplethatis_tricky",
];

const sumPairsAndOddsInputs = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 3, 5, 7, 9],
    [2, 4, 6, 8, 10],
    [1, 7, 5, 8, 10, 16, 17, 25, 26, 37, 48, 49, 1, 2, 4, 6, 7, 5],
];

const getSumPairsOuput = (numbers: number[]) => {
    const pairs = numbers.filter((number) => number % 2 === 0);
    const odds = numbers.filter((number) => number % 2 !== 0);
    return [pairs.reduce((a, b) => a + b, 0), odds.reduce((a, b) => a + b, 0)];
};

const sumPairsAndOddsOutputs = sumPairsAndOddsInputs.map(getSumPairsOuput);

const combineInputs: { [key: string]: number }[][] = [
    [
        { a: 1, b: 8, d: 12 },
        { b: 10, c: 6, d: 7 },
    ],
    [
        { age: 42, weight: 68, location: 92 },
        { age: 36, weight: 20, location: 81 },
    ],
    [
        { age: 42, weight: 68, location: 92 },
        { age: 36, weight: 20, location: 81 },
    ],
    [
        { l: 99, z: 82, x: 63, a: 53, f: 59 },
        { w: 24, q: 53, r: 19, f: 80, v: 5, n: 6, b: 22, k: 7, m: 50, x: 64 },
    ],
];

const getCombineOuputs = (
    objA: { [key: string]: number },
    objB: { [key: string]: number },
) => {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);
    const result: { [key: string]: number } = {};

    entriesA.map(([key, value]) => {
        if (objB[key]) {
            result[key] = value + objB[key];
        } else {
            result[key] = value;
        }
    });
    entriesB.map(([key, value]) => {
        if (!objA[key]) {
            result[key] = value;
        }
    });

    return result;
};

const combineOutputs = combineInputs.map(([objA, objB]) =>
    getCombineOuputs(objA, objB),
);

const isStrongPasswordInputs = [
    "Psw1!",
    "Password123!",
    "password12345",
    "Passwordtreslong",
    "anotherTypeWorking1#",
    "pO12#^!%8$",
    "looooooooooooooooooooooNg12#!",
];

const isStrongPasswordOutputs = [
    "Invalide",
    "Valide",
    "Invalide",
    "Invalide",
    "Valide",
    "Valide",
    "Invalide",
];

module.exports = {
    showMultiplicationTableInputs,
    showMultiplicationTableOutputs,
    toSnakeCaseInputs,
    toSnakeCaseOutputs,
    sumPairsAndOddsInputs,
    sumPairsAndOddsOutputs,
    combineInputs,
    combineOutputs,
    isStrongPasswordInputs,
    isStrongPasswordOutputs,
};
