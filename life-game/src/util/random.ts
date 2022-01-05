export function getRandomNumber(min: number, max: number): number {
    if (max < min) {
        [min, max] = [max, min];
    }
    return Math.round(min + Math.random() * (max - min));
}

export function getRandomMatrix(minVal: number, maxVal: number, nRows: number, nCols: number): 
    number[][] {

    const res = new Array<number[]>();
    if (nRows < 0 || nCols < 0) {
        throw Error('Number of rows or columns cannot be negative');
    }
    for (let i = 0; i < nRows; i++) {
        res[i] = [];
        for (let j = 0; j < nCols; j++) {
            res[i][j] = getRandomNumber(minVal, maxVal);
        }
    }
    return res;
}