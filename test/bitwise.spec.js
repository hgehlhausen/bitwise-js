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
        it('Instantiate given a String');
        it('Instantiate given an Array');
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
            expect(bits.bitsOn(0,1,2,3,4,5,6,7)).to.equal(true);
            expect(bits.bitsOn(8,9,10,11,12,13,14,15)).to.equal(false);
            expect(bits.bitsOn(16,17,18,19,20,21,22,23)).to.equal(false);
            expect(bits.bitsOn(24,25,26,27,28,29,30,31)).to.equal(false);
        });
        it('get value => integer');
        it('get state => string');
        it('get bitarray => array of 1s and 0s');
        it('toString => [object Bitwise] ...');
        it('iteration');
    });
    describe('Static Functions', () => {
        it('bit flip constants');
        it('eq equality');
        it('and');
        it('or');
        it('xor');
    });

});