function NB2SZ(nb) {
    return (((nb) + 7) >> 3);
}
const bitmask_lhs = [0xFF, 0xFE, 0xFC, 0xF8, 0xF0, 0xE0, 0xC0, 0x80];
const bitmask_rhs = [0xFF, 0x01, 0x03, 0x07, 0x0F, 0x1F, 0x3F, 0x7F];
export class BitVec {
    constructor(nbits) {
        this._nbits = nbits;
        this._data = new Uint8Array(NB2SZ(nbits));
    }
    clone() {
        let res = new BitVec(this._nbits);
        res._data = new Uint8Array(this._data);
        return res;
    }
    get nbits() { return this._nbits; }
    get nbytes() { return NB2SZ(this._nbits); }
    setAll(value) {
        if (value) {
            this._data.fill(0xFF);
        }
        else {
            this._data.fill(0);
        }
    }
    get(pos) {
        let res = false;
        if (pos >= 0 && pos < this._nbits) {
            res = (this._data[pos >> 3] & (1 << (pos & 0x07))) != 0;
        }
        return res;
    }
    set(pos, val) {
        if (pos >= 0 && pos < this._nbits) {
            if (val) {
                this._data[pos >> 3] |= 1 << (pos & 0x07);
            }
            else {
                this._data[pos >> 3] &= ~(1 << (pos & 0x07));
            }
        }
    }
    countTrue() {
        let res = 0;
        let cur = 0;
        let bits = this._nbits;
        while (bits >= 8) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < 8; bit++) {
                if (tmp & (1 << bit)) {
                    res++;
                }
            }
            bits -= 8;
            cur++;
        }
        if (bits > 0) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < bits; bit++) {
                if (tmp & (1 << bit)) {
                    res++;
                }
            }
        }
        return res;
    }
    countFalse() {
        return this._nbits - this.countTrue();
    }
    getTrue() {
        let res = [];
        let cur = 0;
        let bits = this._nbits;
        while (bits >= 8) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < 8; bit++) {
                if (tmp & (1 << bit)) {
                    res.push(cur * 8 + bit);
                }
            }
            bits -= 8;
            cur++;
        }
        if (bits > 0) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < bits; bit++) {
                if (tmp & (1 << bit)) {
                    res.push(cur * 8 + bit);
                }
            }
        }
        return res;
    }
    getFalse() {
        let res = [];
        let cur = 0;
        let bits = this._nbits;
        while (bits >= 8) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < 8; bit++) {
                if (!(tmp & (1 << bit))) {
                    res.push(cur * 8 + bit);
                }
            }
            bits -= 8;
            cur++;
        }
        if (bits > 0) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < bits; bit++) {
                if (!(tmp & (1 << bit))) {
                    res.push(cur * 8 + bit);
                }
            }
        }
        return res;
    }
    toString() {
        let res = [];
        let cur = 0;
        let bits = this._nbits;
        while (bits >= 8) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < 8; bit++) {
                if (tmp & (1 << bit)) {
                    res.push('1');
                }
                else {
                    res.push('0');
                }
            }
            bits -= 8;
            cur++;
        }
        if (bits > 0) {
            let tmp = this._data[cur];
            for (let bit = 0; bit < bits; bit++) {
                if (tmp & (1 << bit)) {
                    res.push('1');
                }
                else {
                    res.push('0');
                }
            }
        }
        return res.join('');
    }
    equal(o) {
        if (this._nbits != o._nbits) {
            return false;
        }
        if (this._nbits == 0) {
            return true;
        }
        let boffset = NB2SZ(this._nbits) - 1;
        for (let i = 0; i < boffset; i++) {
            if (this._data[i] != o._data[i]) {
                return false;
            }
        }
        let bmask = bitmask_rhs[this._nbits & 0x07];
        if ((this._data[boffset] & bmask) != (o._data[boffset] & bmask)) {
            return false;
        }
        return true;
    }
}
