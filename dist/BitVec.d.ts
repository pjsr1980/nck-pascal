export declare class BitVec {
    private _nbits;
    private _data;
    constructor(nbits: number);
    clone(): BitVec;
    get nbits(): number;
    get nbytes(): number;
    setAll(value: boolean): void;
    get(pos: number): boolean;
    set(pos: number, val: boolean): void;
    countTrue(): number;
    countFalse(): number;
    getTrue(): number[];
    getFalse(): number[];
    toString(): string;
    equal(o: BitVec): boolean;
}
