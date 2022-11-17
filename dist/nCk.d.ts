import { BitVec } from "./BitVec.js";
import { Pascal } from "./Pascal.js";
export { BitVec };
export { Pascal };
export declare type nckData = {
    result: BitVec;
    pascal?: Pascal;
    row?: bigint;
    tr: number;
    tc: number;
    rv: number;
    l1: boolean;
};
export interface nckVisitor {
    onResult(nckd: nckData): void;
    goFalse(nckd: nckData): boolean;
    goTrue(nckd: nckData): boolean;
}
export declare function VisitL1(v: nckVisitor, n: number, k: number, pascal?: Pascal): void;
export declare function VisitL0(v: nckVisitor, n: number, k: number, pascal?: Pascal): void;
export declare function RowL1(vec: BitVec, pascal?: Pascal): bigint;
export declare function RowL0(vec: BitVec, pascal?: Pascal): bigint;
export declare function VecL1(row: bigint, n: number, k: number, pascal?: Pascal): BitVec;
export declare function VecL0(row: bigint, n: number, k: number, pascal?: Pascal): BitVec;
