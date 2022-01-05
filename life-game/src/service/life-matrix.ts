export default class LifeMatrix {

    constructor(private _matrix: number[][]) {}

    nextStep(): number[][] {
        this._matrix = this.getNextMatrix(this._matrix.length, this._matrix[0].length);
        return this._matrix;
    }

    get matrix() {
        return this._matrix;
    }

    getNextMatrix(nRows: number, nCols: number) {
        const newMatrix = new Array<number[]>();
        if (nRows < 0 || nCols < 0) {
            throw Error('Number of rows or columns cannot be negative');
        }
        for (let i = 0; i < nRows; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < nCols; j++) {
                const initState = !!this._matrix[i][j];
                newMatrix[i][j] = +this.isAlive(initState, this.getNeighbourNum(i, j));
            }
        }
        return newMatrix;
    }

    getNeighbourNum(row: number, col: number): number {
        let res = 0;
        for (let i = row - 1; i < row + 2; i++) {
            if (this._matrix[i] !== undefined) {
                for (let j = col - 1; j < col + 2; j++) {
                    res += this._matrix[i][j] === undefined ? 0 : this._matrix[i][j];
                }
            }
        }
        res -= this._matrix[row][col];
        return res;
    }

    isAlive(initState: boolean, neighbourNum: number): boolean {
        let res = initState;
        if (initState === false && neighbourNum === 3) {
            res = true;
        }
        else if (neighbourNum < 2 || neighbourNum > 3) {
            res = false;
        }
        return res;
    }
}