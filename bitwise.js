/**
 * This creates a "register" in javascript that contains multiple boolean values
 * - This isn't as performant as writing directly where needed - use for testing only
 * - Indexes are 0 based and are right-to-left, as is with numbers
 */
class Bitwise {
    constructor(value = 0) {
        this.value = value;
    }

    set value(value) {
        const MAX_INT32 = 2147483648;
        if (value > MAX_INT32) {
            throw new Error("Max Value Exceeded")
        }
        this._value = value | 0;

    }

    get value() {
        return this._value;
    }

    [Symbol.iterator]() {
        return {
            items: this.state.split(''),
            next() {
                return {
                    done: this.items.length === 0,
                    value: this.items.pop()
                };
            }
        };
    }

    /**
     * flips the nth bit from the right-side
     * @param nthBit
     */
    flip(nthBit) {
        let bits = this.state.split('').reverse();
        bits[nthBit] = bits[nthBit] ? 0 : 1;
        this.value = parseInt(bits.reverse().join(''), 2);
    }

    bitsOn(...bits) {
        let value = this.value;
        return bits.reduce((result, item) => result && !!(value & Bitwise.bit[item]), true);
    }

    /**
     * visualizes binary bits
     * @returns {string}
     */
    get state() {
        return this._value.toString(2).padStart(32, '0');
    }

    get bitarray() {
        return this.state.split('');
    }

    toString() {
        return '[object BitwiseState] ' + this.state;
    }

    static eq(bitwise, bitwise2) {
        let v1 = bitwise;
        let v2 = bitwise2;
        if (bitwise instanceof Bitwise) {
            v1 = bitwise.value;
        }
        if (bitwise2 instanceof Bitwise) {
            v2 = bitwise2.value;
        }
        return Bitwise.and(v1,v2);
    }

    static or(...values) {
        let initial = values.shift();
        return values.reduce((result, value) => result | value, initial);
    }

    static xor(...values) {
        let initial = values.shift();
        return values.reduce((result, value) => result ^ value, initial);
    }

    static and(...values) {
        let initial = values.shift();
        return values.reduce((result, value) => result & value, initial);
    }

    static fromArray(...bits) {
        let tmp = new Bitwise(0);
        [...new Set(bits)].forEach(bit => tmp.value |= (Bitwise.bit[bit] ? 1 : 0));
        return tmp;
    }

    static fromString(binaryString) {
        return Bitwise.fromArray(binaryString.split(''));
    }

    static get bit() {
        if (!Bitwise._bits) {
            Bitwise._bits = new Array(31);
            for (let i = 0; i < 31; i++) {
                Bitwise._bits[i] = Math.pow(2, i);
            }
        }
        return Bitwise._bits;
    }
}

module.exports = Bitwise;