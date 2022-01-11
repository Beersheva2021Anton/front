export function getRandomInteger(min, max) {

    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.round(min + (max - min) * Math.random());
}

export function getRandomElement(array) {

    return array[getRandomInteger(0, array.length - 1)];
}

export function getRandomDate(minYear, maxYear) {

    let day = getRandomInteger(1, 28);
    let month = getRandomInteger(1, 12);
    let year = getRandomInteger(minYear, maxYear);
    return new Date(`${month}/${day}/${year}`);
}