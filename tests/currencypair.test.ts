import { TestFixture, Test, Expect } from "alsatian";

import Currency from "src/currency";
import CurrencyPair from "src/currencypair";

@TestFixture("Currency Pair")
export default class CurrencyPairTest {
    @Test("it converts to JSON")
    public itConvertsToJson() {
        const expectedJson = '{"baseCurrency":"EUR","counterCurrency":"USD","ratio":1.25}';

        const pair = new CurrencyPair(new Currency("EUR"), new Currency("USD"), 1.25);
        const actualJson = JSON.stringify(pair);

        Expect(actualJson).toBe(expectedJson);
    }
}