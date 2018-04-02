let expect = require('chai').expect;
let Bitwise = require('../bitwise');

describe('Bitwise', () => {

    describe('Intantiation', () => {
        it('Basic Instantiation', () => {
            let bits = new Bitwise();
            expect(bits.value).to.equal(0);
        });
        it('Basic Instantiation with value', () => {
            let bits = new Bitwise(255);
            expect(bits.value).to.equal(255);
        });
        it('Instantiate given a String', () => {
            let bits = Bitwise.fromString('00000000000000000000000011111111');
            expect(bits.value).to.equal(255);
            expect(bits.state).to.equal('00000000000000000000000011111111');
        });
        it('Instantiate given an Array', () => {
            let bits = Bitwise.fromArray([1, 1, 1, 1, 1, 1, 1, 1]);
            console.log(bits);
            expect(bits.value).to.equal(255);
            expect(bits.state).to.equal('00000000000000000000000011111111');
        });
    });
    describe('Methods', () => {
        it('flip(nthBit)', () => {
            let bits = new Bitwise(255);
            bits.flip(0);
            expect(bits.value).to.equal(254);
            bits.value = 255;
            bits.flip(7);
            expect(bits.value).to.equal(127);
        });
        it('bitsOn(nthBit)', () => {
            let bits = new Bitwise(255);
            expect(bits.bitsOn(0, 1, 2, 3, 4, 5, 6, 7)).to.equal(true);
            expect(bits.bitsOn(8, 9, 10, 11, 12, 13, 14, 15)).to.equal(false);
            expect(bits.bitsOn(16, 17, 18, 19, 20, 21, 22, 23)).to.equal(false);
            expect(bits.bitsOn(24, 25, 26, 27, 28, 29, 30, 31)).to.equal(false);
        });
        it('get value => integer', () => {
            expect(new Bitwise(1)).to.not.be.greaterThan(1);
            expect(new Bitwise(1)).to.not.be.lessThan(1);
        });
        it('get state => string', () => {
            expect((new Bitwise(255)).state).to.be.string;
        });
        it('get bitarray => array of 1s and 0s', () => {
            let bits = new Bitwise(381351);
            expect(bits.bitarray).to.include.members([0, 1]);
        });
        it('toString => [object Bitwise] ...', () => {
            let bits = new Bitwise(381351);
            expect(bits.toString()).to.equal('[object Bitwise] 00000000000001011101000110100111')
        });
        it('iteration', () => {
            for (let bit of new Bitwise(381351)) {
                expect(bit).to.satisfy(value => (value === 0 || value === 1));
            }
        });
    });
    describe('Static Functions', () => {
        let bit1;
        let bit2;
        let bit3;
        let bit4;
        beforeEach(() => {
            bit1 = new Bitwise(63);
            bit2 = new Bitwise(192);
            bit3 = new Bitwise(192);
            bit4 = new Bitwise(16);
        });
        it('bit flip constants', () => {
            let exponent = 0;
            for (let bit of Bitwise.bit) {
                expect(bit).to.equal(Math.pow(2,exponent));
                exponent++;
            }
            expect(Bitwise.bit.length).to.equal(31);
        });
        it('eq equality',() => {
            expect(Bitwise.eq(bit1,bit2)).to.equal(false);
            expect(Bitwise.eq(bit3,bit2)).to.equal(true);
        });
        it('and', () => {
            expect(Bitwise.and(bit2,bit3)).to.equal(bit2.valueOf());
            expect(Bitwise.and(bit1,bit2)).to.equal(0);
            expect(Bitwise.and(bit1,bit4)).to.equal(16);
        });
        it('or', () => {
            expect(Bitwise.or(bit1,bit2)).to.equal(255);
            expect(Bitwise.or(bit1,bit4)).to.equal(63);
        });
        it('xor', () => {
            expect(Bitwise.xor(bit1,bit2)).to.equal(255);
            expect(Bitwise.xor(bit3,bit2)).to.equal(0);
            expect(Bitwise.xor(bit3,bit4)).to.equal(208);
            expect(Bitwise.xor(bit1,bit4)).to.equal(47);
        });
    });

});