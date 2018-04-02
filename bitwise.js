/**
 * This creates a "register" in javascript that contains multiple boolean values
 * - This isn't as performant as writing directly where needed - use for testing only
 * - Indexes are 0 based and are right-to-left, as is with numbers
 */
class Bitwise extends Number {

    constructor (value) {
        super();
        this.value = value;
    }

    set value (value) {
        this._value = value|0;
    }

    get value () {
        return this._value|0;
    }

    valueOf() {
        return this._value|0;
    }

    get safe () {
        return this < 2147483648;
    }

    [Symbol.iterator]() {
        return {
            items: this.state.split('').map(bit => bit|0).reverse(),
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
        this._value = parseInt(bits.reverse().join(''), 2);
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
        return this.state.split('').map(bit => bit|0).reverse();
    }

    toString() {
        return '[object Bitwise] ' + this.state;
    }

    static eq(bitwise, bitwise2) {
        return bitwise.valueOf() === bitwise2.valueOf();
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

    static fromArray(bits) {
        return new Bitwise(parseInt(bits.reverse().join('').padStart(32,'0'),2));
    }

    static fromString(binaryString) {
        return new Bitwise(parseInt(binaryString,2));
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