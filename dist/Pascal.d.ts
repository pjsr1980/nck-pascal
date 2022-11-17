export declare class Pascal {
    private _n;
    private _buf;
    constructor(n?: number);
    get N(): number;
    set N(n: number);
    nCk(n: number, k: number): bigint;
    reset(): void;
    map(n: number, k: number): number;
    unmap(p: number): {
        n: number;
        k: number;
    };
    private _bufferPos;
    private _bufferFill;
}
