
# nck-pascal

> The **nck-pascal** library is the result of a personal investigation of **Pascal's triangle** that began in college and lasted for a few years. I was pleased when **all the rules** defining the criteria for **visiting Pascal's triangle** were implemented.
>
> This library allows calculating **combinations of N variables in arrays of K elements**, with the possibility of choosing to start with the elements at the beginning or at the end of the array; since the solution is symmetric.
>
> It started with a recursive implementation, but for **N greater than 1500** it gave an error, so an array of states was created that is used in a while loop.
>
> If you like this library, if it helps you solve a problem, and you have the possibility, **[offer a coffee](https://donate.stripe.com/7sIfZ5f36doAe9a8wx "pjsr coffee")**.
>
> You can see a test page at **[https://pjsr1980.github.io/nck-pascal](https://pjsr1980.github.io/nck-pascal)**

To use the library it is necessary to create a **nckVisitor** with the following functions:

```ts
interface nckVisitor {
    onResult(nckd: nckData): void;      // If a new combination is calculated
    goFalse(nckd: nckData): boolean;    // Investigate solutions where the current variable is False
    goTrue(nckd: nckData): boolean;     // Investigate solutions where the current variable is True
}
```

Where the **nckData** type is defined as follows:

```ts
type nckData = {
    result: BitVec;     // current result vector
    pascal?: Pascal;    // Pascal's Triangle, it's optional
    row?: bigint;       // the solution line number, present only if pascal is given
    tr: number;         // Current line number of Pascal's triangle
    tc: number;         // Current column number of Pascal's triangle
    rv: number;         // Current position of the current variable
    l1: boolean;        // flag that indicates whether the solution starts with the variables on the left
};
```

#### As an example, to print all combinations for an N=6 and a K=2, we can write:

```js
import * as nCk from "nck-pascal";

let pascal = new nCk.Pascal();

let visitor = {
    onResult: function(nckd) {
        console.log(nckd.row.toString() + " : " + nckd.result.toString());
	},
    goFalse: function(nckd) {
	    return true;
	},
    goTrue: function(nckd) {
		return true;
	}
}

nCk.VisitL1(visitor, 6, 2, pascal)
```

#### And the result will be:

```txt
* VisitL1 *         * VisitL0 *      
1  : 110000         1  : 000011
2  : 101000         2  : 000101
3  : 100100         3  : 000110
4  : 100010         4  : 001001
5  : 100001         5  : 001010
6  : 011000         6  : 001100
7  : 010100         7  : 010001
8  : 010010         8  : 010010
9  : 010001         9  : 010100
10 : 001100         10 : 011000
11 : 001010         11 : 100001
12 : 001001         12 : 100010
13 : 000110         13 : 100100
14 : 000101         14 : 101000
15 : 000011         15 : 110000
```

If you don't need the result row value, simply don't provide a Pascal's Triangle:

```js
...
nCk.VisitL1(visitor, 6, 2)
nCk.VisitL0(visitor, 6, 2)
```

Having a **combination**, one can find out the **solution line number** using one of the following functions:

(If Pascal's Triangle is not given, one is created, as this is needed for the calculation)

```ts
function RowL1(vec: BitVec, pascal?: Pascal): bigint;
function RowL0(vec: BitVec, pascal?: Pascal): bigint;
```

The inverse operation can also be done, that is, having the **solution line number**, the **N** and the **K**, the **combination** can be calculated using one of the following functions:

(If Pascal's Triangle is not given, one is created, as this is needed for the calculation)

```ts
function VecL1(row: bigint, n: number, k: number, pascal?: Pascal): BitVec;
function VecL0(row: bigint, n: number, k: number, pascal?: Pascal): BitVec;
```

#### The BitVec solution vector has the following specification:

```ts
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
```