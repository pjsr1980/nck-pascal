
import { BitVec } from "./BitVec.js";
import { Pascal } from "./Pascal.js";

export { BitVec }
export { Pascal }

export type nckData = {
    result: BitVec,
    pascal?: Pascal,
    row?: bigint,
    tr: number,
    tc: number,
    rv: number,
    l1: boolean
}

export interface nckVisitor {
    onResult(nckd: nckData) : void;
    goFalse(nckd: nckData) : boolean;
    goTrue(nckd: nckData) : boolean;
}

export function VisitL1(v: nckVisitor, n: number, k: number, pascal?: Pascal) : void 
{
	if(n < 0 || k < 0 || k > n) {
		return;
	}
	
    let d : nckData = {
        result: new BitVec(n),
        tr: 0,
        tc: 0,
        rv: 0,
        l1: true
    }
    d.result.setAll(false);
    if(pascal) {
        d.pascal = pascal;
        pascal.N = n;
        d.row = 1n;
    }

    let stk = new Stack(n + 1);
    let stk_up = false;
    let stk_pos = 0;
    let sta = stk.at(stk_pos);
    sta.il = true;
    sta.st = 0;
    sta.tr = n;
    sta.tc = k;
    sta.rv = -1;

	if(k == 0) {
		v.onResult(d);
		return;
	}

    while(stk_pos >= 0) 
    {
        if (stk_up) {
			stk_pos -= 1;
			stk_up = false;
		}
		else 
		{
			sta = stk.at(stk_pos);
			if (sta.il)	// is left
			{
				if (sta.st == 0) {
					if (sta.tc == 0 || sta.tr == 0) {
						stk_up = true;
					}
					else {
						sta.st = 1;
						sta.tr -= 1;
						sta.tc -= 1;
						sta.rv += 1;
					}
				}
				else if (sta.st == 1) {
					sta.st = 2;
					d.tr = sta.tr;
					d.tc = sta.tc;
					d.rv = sta.rv;
                    d.result.set(d.rv, true);
					if (v.goTrue(d)) {
						if (sta.tc == 0) {
							v.onResult(d);
						}
						else {
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = true;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
					}
				}
				else if (sta.st == 2) {
					sta.st = 3;
                    d.result.set(sta.rv, false);
					if (sta.tr > sta.tc) {
						d.tr = sta.tr;
						d.tc = sta.tc;
						d.rv = sta.rv;
						if (v.goFalse(d)) {
                            if(pascal && d.row) {
                                d.row += pascal.nCk(sta.tr, sta.tc);
                            }
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = false;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
						else {
							stk_up = true;
						}
					}
					else {
						stk_up = true;
					}
				}
				else {
					if (pascal && d.row) {
                        d.row -= pascal.nCk(sta.tr, sta.tc);
					}
					stk_up = true;
				}
			}
			else {		// is rigth
				if (sta.st == 0) {
					if (sta.tr == 0) {
						stk_up = true;
					}
					else {
						sta.st = 1;
						sta.tr -= 1;
						sta.rv += 1;
					}
				}
				else if (sta.st == 1) {
					sta.st = 2;
					d.tr = sta.tr;
					d.tc = sta.tc;
					d.rv = sta.rv;
                    d.result.set(d.rv, true);
					if (v.goTrue(d)) {
						if (sta.tc == 0) {
							v.onResult(d);
						}
						else {
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = true;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
					}
				}
				else if (sta.st == 2) {
					sta.st = 3;
                    d.result.set(sta.rv, false);
					if (sta.tr > sta.tc) {
						d.tr = sta.tr;
						d.tc = sta.tc;
						d.rv = sta.rv;
						if (v.goFalse(d)) {
                            if(pascal && d.row) {
                                d.row += pascal.nCk(sta.tr, sta.tc);
                            }
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = false;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
						else {
							stk_up = true;
						}
					}
					else {
						stk_up = true;
					}
				}
				else {
                    if(pascal && d.row) {
                        d.row -= pascal.nCk(sta.tr, sta.tc);
                    }
					stk_up = true;
				}
			}
		}
    }
}

export function VisitL0(v: nckVisitor, n: number, k: number, pascal?: Pascal) : void 
{
	if(n < 0 || k > n) {
		return;
	}

    let d : nckData = {
        result: new BitVec(n),
        tr: 0,
        tc: 0,
        rv: 0,
        l1: false
    }
    d.result.setAll(true);
    if(pascal) {
        d.pascal = pascal;
        pascal.N = n;
        d.row = 1n;
    }

    let stk = new Stack(n + 1);
    let stk_up = false;
    let stk_pos = 0;
    let sta = stk.at(stk_pos);
    sta.il = false;
    sta.st = 0;
    sta.tr = n;
    sta.tc = k;
    sta.rv = -1;

	if(n == k) {
		v.onResult(d);
		return;
	}

    while(stk_pos >= 0) 
    {
        if (stk_up) {
			stk_pos -= 1;
			stk_up = false;
		}
		else
		{
			sta = stk.at(stk_pos);

			if (sta.il)	// is left
			{
				if (sta.st == 0) {
					if (sta.tc == 0 || sta.tr == 0) {
						stk_up = true;
					}
					else {
						sta.st = 1;
						sta.tr -= 1;
						sta.tc -= 1;
						sta.rv += 1;
					}
				}
				else if (sta.st == 1) {
					sta.st = 2;
					d.tr = sta.tr;
					d.tc = sta.tc;
					d.rv = sta.rv;
                    d.result.set(d.rv, false);
					if (v.goFalse(d)) {
						if (sta.tc == sta.tr) {
							v.onResult(d);
						}
						else {
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = false;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
					}
				}
				else if (sta.st == 2) {
					sta.st = 3;
                    d.result.set(sta.rv, true);
					if (sta.tr >= sta.tc) {
						d.tr = sta.tr;
						d.tc = sta.tc;
						d.rv = sta.rv;
						if (v.goTrue(d)) {
                            if(pascal && d.row) {
                                d.row += pascal.nCk(sta.tr, sta.tc);
                            }
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = true;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
						else {
							stk_up = true;
						}
					}
					else {
						stk_up = true;
					}
				}
				else {
                    if(pascal && d.row) {
                        d.row -= pascal.nCk(sta.tr, sta.tc);
                    }
					stk_up = true;
				}
			}
			else {		// is rigth
				if (sta.st == 0) {
					if (sta.tr == 0) {
						stk_up = true;
					}
					else {
						sta.st = 1;
						sta.tr -= 1;
						sta.rv += 1;
					}
				}
				else if (sta.st == 1) {
					sta.st = 2;
					d.tr = sta.tr;
					d.tc = sta.tc;
					d.rv = sta.rv;
                    d.result.set(d.rv, false);
					if (v.goFalse(d)) {
						if (sta.tc == sta.tr) {
							v.onResult(d);
						}
						else {
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = false;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
					}
				}
				else if (sta.st == 2) {
					sta.st = 3;
                    d.result.set(sta.rv, true);
					if (sta.tr >= sta.tc) {
						d.tr = sta.tr;
						d.tc = sta.tc;
						d.rv = sta.rv;
						if (v.goTrue(d)) {
                            if(pascal && d.row) {
                                d.row += pascal.nCk(sta.tr, sta.tc);
                            }
							stk_pos++;
							let tmp = stk.at(stk_pos);
							tmp.st = 0;
							tmp.il = true;
							tmp.rv = sta.rv;
							tmp.tc = sta.tc;
							tmp.tr = sta.tr;
						}
						else {
							stk_up = true;
						}
					}
					else {
						stk_up = true;
					}
				}
				else {
                    if(pascal && d.row) {
                        d.row -= pascal.nCk(sta.tr, sta.tc);
                    }
					stk_up = true;
				}
			}
		}
    }
}

class nckRow implements nckVisitor {

	vec: BitVec;
	row: bigint;

	constructor(vec: BitVec) {
		this.vec = vec;
		this.row = -1n;
	}

	onResult(nckd: nckData): void {
		if(this.vec.equal(nckd.result) && nckd.row) {
			this.row = nckd.row;
		}
	}

	goFalse(nckd: nckData): boolean {
		return !this.vec.get(nckd.rv);
	}

	goTrue(nckd: nckData): boolean {
		return this.vec.get(nckd.rv);
	}
}

export function RowL1(vec: BitVec, pascal?: Pascal) : bigint {
	let visitor = new nckRow(vec);
	if(!pascal) { pascal = new Pascal(vec.nbits); }
	VisitL1(visitor, vec.nbits, vec.countTrue(), pascal);
	return visitor.row;
}

export function RowL0(vec: BitVec, pascal?: Pascal) : bigint {
	let visitor = new nckRow(vec);
	if(!pascal) { pascal = new Pascal(vec.nbits); }
	VisitL0(visitor, vec.nbits, vec.countTrue(), pascal);
	return visitor.row;
}

class nckVec implements nckVisitor {

	row: bigint;
	vec: BitVec;

	constructor(row: bigint) {
		this.row = row;
		this.vec = new BitVec(0);
	}

	onResult(nckd: nckData): void {
		if(this.row == nckd.row) {
			this.vec = nckd.result.clone();
		}
	}

	goFalse(nckd: nckData): boolean {
		if(nckd.pascal && nckd.row) {
			let aux = nckd.row + nckd.pascal.nCk(nckd.tr, nckd.tc);
			return nckd.l1 ? this.row >= aux : this.row < aux;
		}
		return false;
	}

	goTrue(nckd: nckData): boolean {
		if(nckd.pascal && nckd.row) {
			let aux = nckd.row + nckd.pascal.nCk(nckd.tr, nckd.tc);
			return nckd.l1 ? this.row < aux : this.row >= aux;
		}
		return false;
	}
}

export function VecL1(row: bigint, n: number, k: number, pascal?: Pascal) : BitVec {
	let visitor = new nckVec(row);
	if(!pascal) { pascal = new Pascal(n); }
	VisitL1(visitor, n, k, pascal);
	return visitor.vec;
}

export function VecL0(row: bigint, n: number, k: number, pascal?: Pascal) : BitVec {
	let visitor = new nckVec(row);
	if(!pascal) { pascal = new Pascal(n); }
	VisitL0(visitor, n, k, pascal);
	return visitor.vec;
}

type State = {
    st: number,     // state
    il: boolean,    // is left
    rv: number,     // variable
    tr: number,     // triangle row
    tc: number      // triangle column
}

const MAX_STK = 6;

class Stack {
    private _n: number;
    private _cnt: number;
    private _stk: State[][];

    constructor(n: number) {
        let c = n >> MAX_STK;
        let r = n - c * (1 << MAX_STK);

        this._n = n;
        this._cnt = (r > 0 ? c + 1 : c);
        this._stk = new Array(this._cnt);

        let j = this._cnt - 1;
        for(let i=0; i < j; i++) {
            this._stk[i] = new Array<State>(1 << MAX_STK);
            for(let p=0; p < 1 << MAX_STK; p++) {
                this._stk[i][p] = {
                    st: 0, il: false, rv: 0, tr: 0, tc: 0
                }
            }
        }
        this._stk[j] = new Array<State>(r > 0 ? r : 1 << MAX_STK);
        for(let p=0; p < this._stk[j].length; p++) {
            this._stk[j][p] = {
                st: 0, il: false, rv: 0, tr: 0, tc: 0
            }
        }
    }

    at(pos: number) : State {
        let c = pos >> MAX_STK;
        let r = pos - c * (1 << MAX_STK);
        return this._stk[c][r];
    }
}

