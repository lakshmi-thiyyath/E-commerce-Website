import formatCurrency from "../../js/utils/money.js";


describe('Test Suite: formatCurrency',()=>{
    it('Converts Cents into Dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Work With 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Round up to the nearest cents',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});

//formatCurrency(2000.5)==='20.01'