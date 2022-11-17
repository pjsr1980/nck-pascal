
export class Pascal
{
    private _n: number = 0;
    private _buf: bigint[] = [];

    constructor(n? : number ) {
        if(n) { 
            this._bufferFill(n); 
        }
    }

    get N() : number { return this._n; }
    set N(n: number) { this._bufferFill(n); }

    nCk(n: number, k: number) : bigint {
        if(n > this._n || k > n || this._n <= 0) {
            return 0n;
        }
        return this._buf[this._bufferPos(n, k)];
    }

    reset() {
        this._n = 0;
        this._buf = [];
    }

    map(n: number, k: number) : number {
        return n * (n + 1) + k;
    }

    unmap(p: number) : {n: number, k: number} {
        let b = (Math.sqrt(4 * p + 1) - 1) >> 1;
        return {
            n: b,
            k: p - (b + b * b)
        }
    }

    private _bufferPos(n: number, k: number) : number {
        let n1 = n >> 1;
        let n2 = (n + 1) >> 1;
        if(k > n1) {
            k = n - k;
        }
        return ((n1 * (n1 + 1) + n2 * (n2 + 1)) >> 1) + k;
    }

    private _bufferFill(n: number) : void {
        if(n <= this._n) {
            return;
        }
        let i = this._n < 2 ? 2 : this._n + 1;
        let cnt = this._bufferPos(n + 1, 0);
        
        if(this._n < 2) {
            this._buf[0] = 1n;
            this._buf[1] = 1n;
        }
        this._n = n;
        for(; i <= n; i++) {
            let k = i >> 1;
            this._buf[ this._bufferPos(i, 0) ] = 1n;
            for(let j=1; j <= k; j++) {
                this._buf[this._bufferPos(i, j)] =
                    this._buf[this._bufferPos(i-1, j-1)] + 
                    this._buf[this._bufferPos(i-1, j)]; 
            }
        }
    }

}