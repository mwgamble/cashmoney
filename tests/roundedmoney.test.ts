/// <reference path="../src/alsatian-ambient.d.ts" />
import { TestFixture, Test, TestCases, Expect } from "alsatian";

import RoundedMoney from "src/roundedmoney";
import Currency from "src/currency";
import { numeric } from "@cashmoney/number";

@TestFixture("Rounded Money")
export default class RoundedMoneyTest {
    @TestCases(RoundedMoneyTest.inaccurateSubunitExamples)
    @Test("it throws an error when subunit is not accurate")
    public itThrowsWhenSubunitIsNotAccurate(amount: string, subunit: number) {
        const throwFn = () => new RoundedMoney(amount, subunit, new Currency("EUR"));
        Expect(throwFn).toThrowError(Error, "Amount was not properly rounded.");
    }

    public static inaccurateSubunitExamples() {
        return [
            ["100.1", 0],
            ["100.10", 0],
            ["100.12", 0],
            ["100.34", 1],
            ["100.100", 0],
            ["100.120", 0],
            ["100.120", 1],
            ["100.123", 0],
            ["100.456", 1],
            ["100.789", 2],
            ["100.1230", 0],
            ["100.4560", 1],
            ["100.7890", 2],
        ];
    }

    @TestCases(RoundedMoneyTest.equalityExamples)
    @Test("it equals to another money")
    public itEqualsToAnotherMoney(amount: numeric, subunit: number, currency: Currency, equality: boolean) {
        const money = new RoundedMoney(100, subunit, new Currency("EUR"));

        const compareTo = new RoundedMoney(amount, subunit, currency);
        Expect(money.equals(compareTo)).toBe(equality);
        Expect(money.equalTo(compareTo)).toBe(equality);
        Expect(money.equalsTo(compareTo)).toBe(equality);
        Expect(money.isEqualTo(compareTo)).toBe(equality);
    }

    public static equalityExamples() {
        return [
            [100, 2, new Currency("EUR"), true],
            [101, 2, new Currency("EUR"), false],
            [100, 2, new Currency("USD"), false],
            [101, 2, new Currency("AUD"), false],
            ["100", 2, new Currency("EUR"), true],
            ["100.00", 2, new Currency("EUR"), true],
            ["100.01", 2, new Currency("EUR"), false],
            ["100", 2, new Currency("USD"), false],
            ["100.00", 2, new Currency("USD"), false],
        ];
    }

    @TestCases(RoundedMoneyTest.comparisonExamples)
    @Test("it compares two amounts")
    public itComparesTwoAmounts(otherAmount: number, result: 0 | 1 | -1) {
        const money = new RoundedMoney(10, 2, new Currency("EUR"));
        const other = new RoundedMoney(otherAmount, 2, new Currency("EUR"));

        Expect(money.compare(other)).toBe(result);
        Expect(money.greaterThan(other)).toBe(result === 1);
        Expect(money.isGreaterThan(other)).toBe(result === 1);
        Expect(money.greaterThanOrEqual(other)).toBe(result >= 0);
        Expect(money.isGreaterThanOrEqualTo(other)).toBe(result >= 0);
        Expect(money.lessThan(other)).toBe(result === -1);
        Expect(money.isLessThan(other)).toBe(result === -1);
        Expect(money.lessThanOrEqual(other)).toBe(result <= 0);
        Expect(money.isLessThanOrEqualTo(other)).toBe(result <= 0);

        if (result === 0) {
            Expect(money).toBe(other);
        } else {
            Expect(money).not.toBe(other);
        }
    }

    public static comparisonExamples() {
        return [
            [10, 0],
            ["10.00", 0],
            ["9.99", 1],
            [9, 1],
            [8, 1],
            [1, 1],
            [-1, 1],
            [11, -1],
            [12, -1],
            [50, -1],
            ["10.01", -1],
        ];
    }

    @TestCases(RoundedMoneyTest.addExamples)
    @Test("it adds one or more amounts")
    public itAddsAmounts(addendAmounts: string[], expected: string) {
        const currency = new Currency("EUR");
        const money = new RoundedMoney(100, 2, currency);

        const addendMonies = addendAmounts.map(amount => new RoundedMoney(amount, 2, currency));
        const addResult = money.add(...addendMonies);

        Expect(addResult instanceof RoundedMoney).toBeTruthy();
        Expect(addResult).toBe(new RoundedMoney(expected, 2, currency));
        Expect(addResult.amount).toBe(expected);

        const plusResult = money.plus(...addendMonies);
        Expect(plusResult).toBe(addResult);
    }

    public static addExamples() {
        return [
            [["10"], "110.00"],
            [["10", "10"], "120.00"],
            [["100"], "200.00"],
            [["-10"], "90.00"],
            [["0"], "100.00"],
            [["-100"], "0.00"],
            [["5", "10", "15"], "130.00"],
            [["2.5"], "102.50"],
            [["0.1", "0.2"], "100.30"],
            [["0.1", "0.2", "0.3"], "100.60"],
            [["-0.5", "-1.5"], "98.00"],
            [["-2", "2"], "100.00"],
            [["1.3", "4.9"], "106.20"],
            [["99.99"], "199.99"],
        ];
    }

    @TestCases(RoundedMoneyTest.diffCurrencyRefusalExamples)
    @Test("it refuses to add amounts of different currencies")
    public itRefusesToAddAmountsOfDifferentCurrencies(addendMonies: RoundedMoney[]) {
        const currency = new Currency("EUR");
        const money = new RoundedMoney("100.00", 2, currency);

        const throwFn = () => money.add(...addendMonies);

        Expect(throwFn).toThrow();
    }

    @TestCases(RoundedMoneyTest.subtractExamples)
    @Test("it subtracts one or more amounts")
    public itSubtractsAmounts(subtrahendAmounts: string[], expected: string) {
        const currency = new Currency("EUR");
        const money = new RoundedMoney(100, 2, currency);

        const subtrahendMonies = subtrahendAmounts.map(amount => new RoundedMoney(amount, 2, currency));
        const subtractResult = money.subtract(...subtrahendMonies);

        Expect(subtractResult instanceof RoundedMoney).toBeTruthy();
        Expect(subtractResult).toBe(new RoundedMoney(expected, 2, currency));
        Expect(subtractResult.amount).toBe(expected);

        const minusResult = money.minus(...subtrahendMonies);
        Expect(minusResult).toBe(subtractResult);
    }

    public static subtractExamples() {
        return [
            [["10"], "90.00"],
            [["10", "10"], "80.00"],
            [["100"], "0.00"],
            [["75", "125"], "-100.00"],
            [["75", "-125"], "150.00"],
            [["-10"], "110.00"],
            [["0"], "100.00"],
            [["-100"], "200.00"],
            [["5", "5", "5"], "85.00"],
            [["5", "-10", "15"], "90.00"],
            [["2.5"], "97.50"],
            [["0.1", "0.2"], "99.70"],
            [["0.1", "0.2", "0.3"], "99.40"],
            [["-0.5", "-1.5"], "102.00"],
            [["-2", "2"], "100.00"],
            [["1.3", "4.9"], "93.80"],
            [["99.99"], "0.01"],
        ];
    }

    @TestCases(RoundedMoneyTest.diffCurrencyRefusalExamples)
    @Test("it refuses to subtract amounts of different currencies")
    public itRefusesToSubtractAmountsOfDifferentCurrencies(subtrahendMonies: RoundedMoney[]) {
        const currency = new Currency("EUR");
        const money = new RoundedMoney("100.00", 2, currency);

        const throwFn = () => money.subtract(...subtrahendMonies);

        Expect(throwFn).toThrow();
    }

    @TestCases(RoundedMoneyTest.allocationExamples)
    @Test("it allocates amount")
    public itAllocatesAmount(money: RoundedMoney, ratios: number[], results: string[]) {
        const allocated = money.allocate(ratios);

        for (const [key, allocatedMoney] of allocated.entries()) {
            const compareTo = new RoundedMoney(results[key], money.subunit, money.currency);
            Expect(allocatedMoney).toBe(compareTo);
        }
    }

    public static allocationExamples() {
        const EUR = new Currency("EUR");
        const JPY = new Currency("JPY");

        return [
            [new RoundedMoney("100.00", 2, EUR), [1, 1, 1], ["33.34", "33.33", "33.33"]],
            [new RoundedMoney("101.00", 2, EUR), [1, 1, 1], ["33.67", "33.67", "33.66"]],
            [new RoundedMoney("100.01", 2, EUR), [1, 1, 1], ["33.34", "33.34", "33.33"]],
            [new RoundedMoney("100.00", 2, EUR), [1, 1], ["50.00", "50.00"]],
            [new RoundedMoney("101.00", 2, EUR), [1, 1], ["50.50", "50.50"]],
            [new RoundedMoney("5.00", 2, EUR), [3, 7], ["1.50", "3.50"]],
            [new RoundedMoney("0.05", 2, EUR), [3, 7], ["0.02", "0.03"]],
            [new RoundedMoney("5.00", 2, EUR), [7, 3], ["3.50", "1.50"]],
            [new RoundedMoney("0.05", 2, EUR), [7, 3], ["0.04", "0.01"]],
            [new RoundedMoney("5.00", 2, EUR), [7, 3, 0], ["3.50", "1.50", "0.00"]],
            [new RoundedMoney("0.05", 2, EUR), [7, 3, 0], ["0.04", "0.01", "0.00"]],
            [new RoundedMoney("-5.00", 2, EUR), [3, 7], ["-1.50", "-3.50"]],
            [new RoundedMoney("-0.05", 2, EUR), [3, 7], ["-0.01", "-0.04"]],
            [new RoundedMoney("-5.00", 2, EUR), [7, 3], ["-3.50", "-1.50"]],
            [new RoundedMoney("-0.05", 2, EUR), [7, 3], ["-0.03", "-0.02"]],
            [new RoundedMoney("5.00", 2, EUR), [0, 7, 3], ["0.00", "3.50", "1.50"]],
            [new RoundedMoney("0.05", 2, EUR), [0, 7, 3], ["0.00", "0.04", "0.01"]],
            [new RoundedMoney("5.00", 2, EUR), [7, 0, 3], ["3.50", "0.00", "1.50"]],
            [new RoundedMoney("0.05", 2, EUR), [7, 0, 3], ["0.04", "0.00", "0.01"]],
            [new RoundedMoney("5.00", 2, EUR), [0, 0, 1], ["0.00", "0.00", "5.00"]],
            [new RoundedMoney("0.05", 2, EUR), [0, 0, 1], ["0.00", "0.00", "0.05"]],
            [new RoundedMoney("5.00", 2, EUR), [0, 0, 100], ["0.00", "0.00", "5.00"]],
            [new RoundedMoney("0.05", 2, EUR), [0, 0, 100], ["0.00", "0.00", "0.05"]],
            [new RoundedMoney("5.00", 2, EUR), [0, 3, 7], ["0.00", "1.50", "3.50"]],
            [new RoundedMoney("0.05", 2, EUR), [0, 3, 7], ["0.00", "0.02", "0.03"]],
            [new RoundedMoney("5.00", 2, EUR), [3, 0, 7], ["1.50", "0.00", "3.50"]],
            [new RoundedMoney("0.05", 2, EUR), [3, 0, 7], ["0.02", "0.00", "0.03"]],
            [new RoundedMoney("0.00", 2, EUR), [0, 0, 1], ["0.00", "0.00", "0.00"]],
            [new RoundedMoney("0.00", 2, EUR), [1, 0, 0], ["0.00", "0.00", "0.00"]],
            [new RoundedMoney("0.00", 2, EUR), [2, 3, 4], ["0.00", "0.00", "0.00"]],
            [new RoundedMoney("2.00", 2, EUR), [1, 1, 1], ["0.67", "0.67", "0.66"]],
            [new RoundedMoney("0.02", 2, EUR), [1, 1, 1], ["0.01", "0.01", "0.00"]],
            [new RoundedMoney("0.02", 2, EUR), [2, 2, 2], ["0.01", "0.01", "0.00"]],
            [new RoundedMoney("1.00", 2, EUR), [1, 1], ["0.50", "0.50"]],
            [new RoundedMoney("1.00", 2, EUR), [1, 1, 1], ["0.34", "0.33", "0.33"]],
            [new RoundedMoney("0.01", 2, EUR), [1, 1], ["0.01", "0.00"]],
            [new RoundedMoney("1.00", 2, EUR), [0.33, 0.66], ["0.33", "0.67"]],
            [new RoundedMoney("0.01", 2, EUR), [0.33, 0.66], ["0.00", "0.01"]],
            [new RoundedMoney("1.01", 2, EUR), [3, 7], ["0.30", "0.71"]],
            [new RoundedMoney("1.01", 2, EUR), [7, 3], ["0.71", "0.30"]],
            [new RoundedMoney("5.00", 2, EUR), [1, 1, 1], ["1.67", "1.67", "1.66"]],
            [new RoundedMoney("10.00", 2, EUR), [1, 1, 1], ["3.34", "3.33", "3.33"]],
            [new RoundedMoney("100", 0, JPY), [1, 1, 1], ["34", "33", "33"]],
            [new RoundedMoney("101", 0, JPY), [1, 1, 1], ["34", "34", "33"]],
            [new RoundedMoney("100", 0, JPY), [1, 1], ["50", "50"]],
            [new RoundedMoney("101", 0, JPY), [1, 1], ["51", "50"]],
            [new RoundedMoney("5", 0, JPY), [3, 7], ["2", "3"]],
            [new RoundedMoney("5", 0, JPY), [7, 3], ["4", "1"]],
            [new RoundedMoney("5", 0, JPY), [7, 3, 0], ["4", "1", "0"]],
            [new RoundedMoney("-5", 0, JPY), [3, 7], ["-1", "-4"]],
            [new RoundedMoney("-5", 0, JPY), [7, 3], ["-3", "-2"]],
            [new RoundedMoney("5", 0, JPY), [0, 7, 3], ["0", "4", "1"]],
            [new RoundedMoney("5", 0, JPY), [7, 0, 3], ["4", "0", "1"]],
            [new RoundedMoney("5", 0, JPY), [0, 0, 1], ["0", "0", "5"]],
            [new RoundedMoney("5", 0, JPY), [0, 0, 100], ["0", "0", "5"]],
            [new RoundedMoney("5", 0, JPY), [0, 3, 7], ["0", "2", "3"]],
            [new RoundedMoney("5", 0, JPY), [3, 0, 7], ["2", "0", "3"]],
            [new RoundedMoney("0", 0, JPY), [0, 0, 1], ["0", "0", "0"]],
            [new RoundedMoney("0", 0, JPY), [1, 0, 0], ["0", "0", "0"]],
            [new RoundedMoney("0", 0, JPY), [2, 3, 4], ["0", "0", "0"]],
            [new RoundedMoney("200", 0, JPY), [1, 1, 1], ["67", "67", "66"]],
            [new RoundedMoney("2", 0, JPY), [1, 1, 1], ["1", "1", "0"]],
            [new RoundedMoney("2", 0, JPY), [2, 2, 2], ["1", "1", "0"]],
            [new RoundedMoney("1", 0, JPY), [1, 1], ["1", "0"]],
            [new RoundedMoney("1", 0, JPY), [1, 1, 1], ["1", "0", "0"]],
            [new RoundedMoney("1", 0, JPY), [1, 2], ["0", "1"]],
            [new RoundedMoney("1", 0, JPY), [2, 1], ["1", "0"]],
            [new RoundedMoney("1", 0, JPY), [0.33, 0.66], ["0", "1"]],
            [new RoundedMoney("499", 0, JPY), [1, 1, 1], ["167", "166", "166"]],
            [new RoundedMoney("500", 0, JPY), [1, 1, 1], ["167", "167", "166"]],
            [new RoundedMoney("501", 0, JPY), [1, 1, 1], ["167", "167", "167"]],
            [new RoundedMoney("999", 0, JPY), [1, 1, 1], ["333", "333", "333"]],
            [new RoundedMoney("1000", 0, JPY), [1, 1, 1], ["334", "333", "333"]],
        ];
    }

    @Test("it converts to JSON")
    public itConvertsToJson() {
        const money = new RoundedMoney(350, 2, new Currency("EUR"));

        const jsonStringifyOutput = JSON.stringify(money);
        Expect(jsonStringifyOutput).toBe('{"amount":"350.00","subunit":2,"currency":"EUR"}');

        const toJsonOutput = money.toJSON();
        Expect(toJsonOutput).toEqual({"amount": "350.00", "subunit": 2, "currency": "EUR"});
    }

    @Test("it converts to a string")
    public itConvertsToString() {
        const intMoney = new RoundedMoney(100, 2, new Currency("AUD"));
        const intMoneyStr = intMoney.toString();
        Expect(intMoneyStr).toBe("AUD 100.00");
        Expect(String(intMoney)).toBe(intMoneyStr);

        const decimalMoney = new RoundedMoney("123.45", 2, new Currency("USD"));
        const decimalMoneyStr = decimalMoney.toString();
        Expect(decimalMoneyStr).toBe("USD 123.45");
        Expect(String(decimalMoney)).toBe(decimalMoneyStr);

        const zeroSubunitMoney = new RoundedMoney("789", 0, new Currency("JPY"));
        const zeroSubunitMoneyStr = zeroSubunitMoney.toString();
        Expect(zeroSubunitMoneyStr).toBe("JPY 789");
        Expect(String(zeroSubunitMoney)).toBe(zeroSubunitMoneyStr);
    }

    public static diffCurrencyRefusalExamples() {
        const currency = new Currency("EUR");
        const otherCurrency = new Currency("AUD");
        return [
            [
                new RoundedMoney(10, 2, otherCurrency),
            ],
            [
                new RoundedMoney(11, 2, otherCurrency),
                new RoundedMoney("12.00", 2, otherCurrency),
            ],
            [
                new RoundedMoney("13.5", 2, otherCurrency),
                new RoundedMoney("14.99", 2, otherCurrency),
                new RoundedMoney("16", 2, otherCurrency),
            ],
            [
                new RoundedMoney(20, 2, currency),
                new RoundedMoney(21, 2, otherCurrency),
            ],
            [
                new RoundedMoney(22, 2, otherCurrency),
                new RoundedMoney(23, 2, currency),
            ],
        ];
    }
}