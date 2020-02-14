/// <reference path="../src/alsatian-ambient.d.ts" />
import { TestFixture, Test, TestCases, Expect } from "alsatian";

import PreciseMoney from "src/precisemoney";
import Currency from "src/currency";
import { Num, numeric } from "@cashmoney/number";

import { sumExamples, minExamples, maxExamples, avgExamples } from "fixtures/aggregate";

const AMOUNT = 10;
const CURRENCY = "EUR";
const OTHER_CURRENCY = "USD";

@TestFixture("Precise Money")
export default class PreciseMoneyTest {
    @TestCases(PreciseMoneyTest.equalityExamples)
    @Test("it equals to another money")
    public itEqualsToAnotherMoney(amount: number, currency: Currency, equality: boolean) {
        const money = new PreciseMoney(AMOUNT, new Currency(CURRENCY));

        const compareTo = new PreciseMoney(amount, currency);
        Expect(money.equals(compareTo)).toBe(equality);
        Expect(money.equalTo(compareTo)).toBe(equality);
        Expect(money.equalsTo(compareTo)).toBe(equality);
        Expect(money.isEqualTo(compareTo)).toBe(equality);
    }

    public static equalityExamples() {
        return [
            [AMOUNT, new Currency(CURRENCY), true],
            [AMOUNT + 1, new Currency(CURRENCY), false],
            [AMOUNT, new Currency(OTHER_CURRENCY), false],
            [AMOUNT + 1, new Currency(OTHER_CURRENCY), false],
            [String(AMOUNT), new Currency(CURRENCY), true],
            [String(AMOUNT) + ".000", new Currency(CURRENCY), true],
            [String(AMOUNT), new Currency(OTHER_CURRENCY), false],
            [String(AMOUNT) + ".000", new Currency(OTHER_CURRENCY), false],
        ];
    }

    @TestCases(PreciseMoneyTest.comparisonExamples)
    @Test("it compares two amounts")
    public itComparesTwoAmounts(otherAmount: number, result: 0 | 1 | -1) {
        const money = new PreciseMoney(AMOUNT, new Currency(CURRENCY));
        const other = new PreciseMoney(otherAmount, new Currency(CURRENCY));

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
            [AMOUNT, 0],
            [AMOUNT - 1, 1],
            [AMOUNT + 1, -1],
        ];
    }

    @TestCases(PreciseMoneyTest.addExamples)
    @Test("it adds one or more amounts")
    public itAddsAmounts(addendAmounts: string[], expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(AMOUNT, currency);

        const addendMonies = addendAmounts.map(amount => new PreciseMoney(amount, currency));
        const addResult = money.add(...addendMonies);

        Expect(addResult instanceof PreciseMoney).toBeTruthy();
        Expect(addResult).toBe(new PreciseMoney(expected, currency));
        Expect(addResult.amount).toBe(expected);

        const plusResult = money.plus(...addendMonies);
        Expect(plusResult).toBe(addResult);
    }

    public static addExamples() {
        return [
            [["10"], "20"],
            [["10", "10"], "30"],
            [["100"], "110"],
            [["-10"], "0"],
            [["0"], "10"],
            [["-100"], "-90"],
            [["5", "5", "5"], "25"],
            [["2.5"], "12.5"],
            [["0.1", "0.2", "0.3"], "10.6"],
            [["-0.5", "-1.5"], "8"],
            [["-2", "2"], "10"],
            [["1.3", "4.9"], "16.2"],
            [["99.99"], "109.99"],
        ];
    }

    @TestCases(PreciseMoneyTest.diffCurrencyRefusalExamples)
    @Test("it refuses to add amounts of different currencies")
    public itRefusesToAddAmountsOfDifferentCurrencies(addendMonies: PreciseMoney[]) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(AMOUNT, currency);

        const throwFn = () => money.add(...addendMonies);

        Expect(throwFn).toThrow();
    }

    @TestCases(PreciseMoneyTest.subtractExamples)
    @Test("it subtracts one or more amounts")
    public itSubtractsAmounts(subtrahendAmounts: string[], expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(AMOUNT, currency);

        const subtrahendMonies = subtrahendAmounts.map(amount => new PreciseMoney(amount, currency));
        const subtractResult = money.subtract(...subtrahendMonies);

        Expect(subtractResult instanceof PreciseMoney).toBeTruthy();
        Expect(subtractResult).toBe(new PreciseMoney(expected, currency));
        Expect(subtractResult.amount).toBe(expected);

        const minusResult = money.minus(...subtrahendMonies);
        Expect(minusResult).toBe(subtractResult);
    }

    public static subtractExamples() {
        return [
            [["10"], "0"],
            [["10", "10"], "-10"],
            [["100"], "-90"],
            [["-10"], "20"],
            [["0"], "10"],
            [["-100"], "110"],
            [["5", "5", "5"], "-5"],
            [["2.5"], "7.5"],
            [["0.1", "0.2", "0.3"], "9.4"],
            [["-0.5", "-1.5"], "12"],
            [["-2", "2"], "10"],
            [["1.3", "4.9"], "3.8"],
            [["99.99"], "-89.99"],
        ];
    }

    @TestCases(PreciseMoneyTest.diffCurrencyRefusalExamples)
    @Test("it refuses to subtract amounts of different currencies")
    public itRefusesToSubtrahendAmountsOfDifferentCurrencies(subtrahendMonies: PreciseMoney[]) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(AMOUNT, currency);

        const throwFn = () => money.subtract(...subtrahendMonies);

        Expect(throwFn).toThrow();
    }

    @TestCases(PreciseMoneyTest.multiplyExamples)
    @Test("it multiplies the amount")
    public itMultipliesTheAmount(multiplier: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(1, currency);
        const multiplyMoney = money.multiply(multiplier);

        Expect(multiplyMoney instanceof PreciseMoney).toBeTruthy();
        Expect(multiplyMoney).toBe(new PreciseMoney(multiplier, currency));
        Expect(multiplyMoney.amount).toBe(multiplier);

        const timesMoney = money.times(multiplier);
        Expect(timesMoney).toBe(multiplyMoney);

        const multipliedByMoney = money.multipliedBy(multiplier);
        Expect(multipliedByMoney).toBe(multiplyMoney);
    }

    @TestCases(PreciseMoneyTest.multiplyExamples)
    @Test("multiplying by zero always gives zero")
    public multiplyingByZeroAlwaysGivesZero(amount: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(amount, currency);
        const multipliedMoney = money.multiply(0);

        Expect(multipliedMoney instanceof PreciseMoney).toBeTruthy();
        Expect(multipliedMoney).toBe(new PreciseMoney(0, currency));
        Expect(multipliedMoney.amount).toBe("0");
    }

    @TestCases(PreciseMoneyTest.multiplyExamples)
    @Test("multiplying by one gives same amount")
    public multiplyingByOneGivesSameAmount(amount: string) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));
        const multipliedMoney = money.multiply(1);

        Expect(multipliedMoney instanceof PreciseMoney).toBeTruthy();
        Expect(multipliedMoney).toBe(money);
        Expect(multipliedMoney.amount).toBe(amount);
    }

    public static multiplyExamples() {
        const numbers = ['1', '0.1', '0.5', '2', '10', '10.5', '100', '0', '-0.1', '-0.5', '-1', '-2', '-10', '-15.8', '-100'];
        return numbers.map(num => [num]);
    }

    @TestCases(PreciseMoneyTest.invalidOperandExamples)
    @Test("it throws an exception when operand is invalid during multiplication")
    public itThrowsAnExceptionWhenOperandIsInvalidDuringMultiplication(operand: any) {
        const money = new PreciseMoney(1, new Currency(CURRENCY));
        const throwFn = () => money.multiply(operand as numeric);
        Expect(throwFn).toThrow();
    }

    @TestCases(PreciseMoneyTest.divideExamples)
    @Test("it divides the amount")
    public itDividesTheAmount(divisor: string, expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(AMOUNT, currency);
        const dividedMoney = money.divide(divisor);

        Expect(dividedMoney instanceof PreciseMoney).toBeTruthy();
        Expect(dividedMoney).toBe(new PreciseMoney(expected, currency));
        Expect(dividedMoney.amount).toBe(expected);
    }

    @TestCases(PreciseMoneyTest.divideExamples)
    @Test("dividing by one gives same amount")
    public dividingByOneGivesSameAmount(amount: string) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));
        const dividedMoney = money.divide(1);

        Expect(dividedMoney instanceof PreciseMoney).toBeTruthy();
        Expect(dividedMoney).toEqual(money);
        Expect(dividedMoney.amount).toBe(amount);
    }

    public static divideExamples() {
        return [
            ["2", "5"],
            ["5", "2"],
            ["3", "3.33333333333333333333"],
            ["2.5", "4"],
            ["1", "10"],
            ["0.5", "20"],
            ["0.25", "40"],
            ["0.2", "50"],
        ];
    }

    @TestCases(PreciseMoneyTest.invalidOperandExamples)
    @Test("it throws an exception when operand is invalid during division")
    public itThrowsAnExceptionWhenOperandIsInvalidDuringDivision(operand: any) {
        const money = new PreciseMoney(1, new Currency(CURRENCY));
        const throwFn = () => money.divide(operand as numeric);
        Expect(throwFn).toThrow();
    }

    /*
    @TestCases(PreciseMoneyTest.allocationExamples)
    @Test("it allocates amount")
    public itAllocatesAmount(amount: number, ratios: number[], results: number[]) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));
        const allocated = money.allocate(ratios);

        for (const [key, money] of allocated.entries()) {
            const compareTo = new PreciseMoney(results[key], money.currency);
            Expect(money).toBe(compareTo);
        }
    }

    public static allocationExamples() {
        return [
            [100, [1, 1, 1], [34, 33, 33]],
            [101, [1, 1, 1], [34, 34, 33]],
            [5, [3, 7], [2, 3]],
            [5, [7, 3], [4, 1]],
            [5, [7, 3, 0], [4, 1, 0]],
            [-5, [7, 3], [-3, -2]],
            [5, [0, 7, 3], [0, 4, 1]],
            [5, [7, 0, 3], [4, 0, 1]],
            [5, [0, 0, 1], [0, 0, 5]],
            [5, [0, 3, 7], [0, 2, 3]],
            [0, [0, 0, 1], [0, 0, 0]],
            [2, [1, 1, 1], [1, 1, 0]],
            [1, [1, 1], [1, 0]],
            [1, [0.33, 0.66], [0, 1]],
            [101, [3, 7], [30, 71]],
            [101, [7, 3], [71, 30]],
            [500, [1, 1, 1], [167, 167, 166]],
            [1000, [1, 1, 1], [334, 333, 333]],
        ];
    }

    @TestCases(PreciseMoneyTest.allocationNamedExamples)
    @Test("it allocates named amounts")
    public itAllocatesNamedAmounts(amount: number, ratios: { [name: string]: number }, results: { [name: string]: number }) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));
        const allocated = money.allocateNamed(ratios);

        for (const [key, money] of Object.entries(allocated)) {
            const compareTo = new PreciseMoney(results[key], money.currency);
            Expect(money).toBe(compareTo);
        }
    }

    public static allocationNamedExamples() {
        return [
            [101, {'foo': 7, 'bar': 3}, {'foo': 71, 'bar': 30}],
        ];
    }

    @TestCases(PreciseMoneyTest.allocationTargetExamples)
    @Test("it allocates amount to N targets")
    public itAllocatesAmountToNTargets(amount: number, target: number, results: number[]) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));
        const allocated = money.allocateTo(target);

        for (const [key, money] of allocated.entries()) {
            const compareTo = new PreciseMoney(results[key], money.currency);
            Expect(compareTo).toBe(money);
        }
    }

    public static allocationTargetExamples() {
        return [
            [15, 2, [8, 7]],
            [10, 2, [5, 5]],
            [15, 3, [5, 5, 5]],
            [10, 3, [4, 3, 3]],
        ];
    }
   */

    @TestCases(PreciseMoneyTest.comparatorExamples)
    @Test("it has comparators")
    public itHasComparators(amount: numeric, isZero: boolean, isPositive: boolean, isNegative: boolean) {
        const money = new PreciseMoney(amount, new Currency(CURRENCY));

        Expect(money.isZero).toBe(isZero);
        Expect(money.isPositive).toBe(isPositive);
        Expect(money.isNegative).toBe(isNegative);
    }

    public static comparatorExamples() {
        return [
            [1, false, true, false],
            [0, true, false, false],
            [-1, false, false, true],
            ['1', false, true, false],
            ['0', true, false, false],
            ['-1', false, false, true],
        ];
    }

    @TestCases(PreciseMoneyTest.absoluteExamples)
    @Test("it calculates the absolute amount")
    public itCalculatesTheAbsoluteAmount(amount: numeric, expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(amount, currency);

        const absoluteMoney = money.absolute();
        Expect(absoluteMoney instanceof PreciseMoney).toBeTruthy();
        Expect(absoluteMoney).toBe(new PreciseMoney(expected, currency));
        Expect(absoluteMoney.amount).toBe(expected);

        const absMoney = money.abs();
        Expect(absMoney).toBe(absoluteMoney);
    }

    public static absoluteExamples() {
        return [
            [1, '1'],
            [0, '0'],
            [-1, '1'],
            ['1', '1'],
            ['0', '0'],
            ['-1', '1'],
        ];
    }

    @TestCases(PreciseMoneyTest.negativeExamples)
    @Test("it calculates the negative amount")
    public itCalculatesTheNegativeAmount(amount: numeric, expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(amount, currency);

        const negativeMoney = money.negative();
        Expect(negativeMoney instanceof PreciseMoney).toBeTruthy();
        Expect(negativeMoney).toBe(new PreciseMoney(expected, currency));
        Expect(negativeMoney.amount).toBe(expected);

        const negateMoney = money.negate();
        Expect(negateMoney).toBe(negativeMoney);

        const negatedMoney = money.negated();
        Expect(negatedMoney).toBe(negatedMoney);
    }

    public static negativeExamples() {
        return [
            [1, '-1'],
            [0, '0'],
            [-1, '1'],
            ['1', '-1'],
            ['0', '0'],
            ['-1', '1'],
        ];
    }

    @TestCases(PreciseMoneyTest.modExamples)
    @Test("it calculates the modulus of an amount")
    public itCalculatesTheModulusOfAnAmount(left: number, right: number, expected: string) {
        const currency = new Currency(CURRENCY);
        const leftMoney = new PreciseMoney(left, currency);
        const rightMoney = new PreciseMoney(right, currency);

        const modMoney = leftMoney.mod(rightMoney);
        Expect(modMoney instanceof PreciseMoney).toBeTruthy();
        Expect(modMoney).toBe(new PreciseMoney(expected, currency));
        Expect(modMoney.amount).toBe(expected);

        const moduloMoney = leftMoney.modulo(rightMoney);
        Expect(moduloMoney).toBe(modMoney);
    }

    public static modExamples() {
        return [
            [11, 5, '1'],
            [9, 3, '0'],
            [1006, 10, '6'],
            [1007, 10, '7'],
        ];
    }

    @Test("it refuses to calculate the modulus of amounts with different currencies")
    public itRefusesToCalculateTheModulusOfAmountsWithDifferentCurrencies() {
        const money = new PreciseMoney(AMOUNT, new Currency(CURRENCY));
        const divisor = new PreciseMoney(AMOUNT, new Currency(OTHER_CURRENCY));

        const throwFn = () => money.mod(divisor);

        Expect(throwFn).toThrow();
    }

    @TestCases(PreciseMoneyTest.percentageExamples)
    @Test("it calculates percentages")
    public itCalculatesPercentages(amount: number, percent: number, expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(amount, currency);
        const smallerMoney = money.percentage(percent);

        Expect(smallerMoney instanceof PreciseMoney).toBeTruthy();
        Expect(smallerMoney).toBe(new PreciseMoney(expected, currency));
        Expect(smallerMoney.amount).toBe(expected);
        Expect(smallerMoney).toBeLessThanOrEqual(money);
    }

    public static percentageExamples() {
        return [
            [350, 0, '0'],
            [350, 100, '350'],
            [350, 50, '175'],
            [10, 100, '10'],
            [10, 30, '3'],
            [10, 25, '2.5'],
            [10, 24, '2.4'],
            [100, 25, '25'],
            [100, 25, '25'],
            [1, 20, '0.2'],
        ];
    }

    @TestCases(PreciseMoneyTest.subtractPercentageExamples)
    @Test("it subtracts a percentage")
    public itSubtractsAPercentage(amount: number, percent: number, expected: string) {
        const currency = new Currency(CURRENCY);
        const money = new PreciseMoney(amount, currency);
        const smallerMoney = money.subtractPercentage(percent);

        Expect(smallerMoney instanceof PreciseMoney).toBeTruthy();
        Expect(smallerMoney).toBe(new PreciseMoney(expected, currency));
        Expect(smallerMoney.amount).toBe(expected);
        Expect(smallerMoney).toBeLessThanOrEqual(money);
    }

    public static subtractPercentageExamples() {
        return [
            [100, 25, '75'],
            [80, 25, '60'],
            [80, 75, '20'],
            [60, 70, '18'],
            [9999, 15, '8499.15'],
            [50, 0, '50'],
            [250, 100, '0'],
        ];
    }

    @TestCases(PreciseMoneyTest.invalidPercentageExamples)
    @Test("it throws for invalid percentages")
    public itThrowsForInvalidPercentages(percent: number) {
        const money = new PreciseMoney(AMOUNT, new Currency(CURRENCY));

        const percentageThrowFn = () => money.percentage(percent);
        Expect(percentageThrowFn).toThrowError(RangeError, "Percentage values must be between 0 and 100.");

        const subtractPercentageThrowFn = () => money.subtractPercentage(percent);
        Expect(subtractPercentageThrowFn).toThrowError(RangeError, "Percentage values must be between 0 and 100.");
    }

    public static invalidPercentageExamples() {
        return [
            [100.01],
            [101],
            [1000],
            [-0.01],
            [-1],
            [-101],
        ];
    }

    @Test("it converts to JSON")
    public itConvertsToJson() {
        const money = new PreciseMoney(350, new Currency("EUR"));

        const jsonStringifyOutput = JSON.stringify(money);
        Expect(jsonStringifyOutput).toBe('{"amount":"350","currency":"EUR"}');

        const toJsonOutput = money.toJSON();
        Expect(toJsonOutput).toEqual({"amount": "350", "currency": "EUR"});
    }

    @Test("it supports max safe integer")
    public itSupportsMaxSafeInteger() {
        const currency = new Currency(CURRENCY);

        const one = new PreciseMoney(1, new Currency(CURRENCY));

        const maxInt = new PreciseMoney(Number.MAX_SAFE_INTEGER, currency);
        const maxIntPlusOne = (new PreciseMoney(Number.MAX_SAFE_INTEGER, currency)).add(one);
        const maxIntMinusOne = (new PreciseMoney(Number.MAX_SAFE_INTEGER, currency)).subtract(one);

        Expect(maxInt instanceof PreciseMoney).toBeTruthy();
        Expect(maxIntPlusOne instanceof PreciseMoney).toBeTruthy();
        Expect(maxIntMinusOne instanceof PreciseMoney).toBeTruthy();
    }

    // TODO: Consider only allowing ratios of roundedmoney
    @Test("it returns ratio of")
    public itReturnsRatioOf() {
        const currency = new Currency(CURRENCY);

        const zero = new PreciseMoney(0, currency);
        const three = new PreciseMoney(3, currency);
        const six = new PreciseMoney(6, currency);

        Expect(zero.ratioOf(six)).toBe(new Num("0"));
        Expect(three.ratioOf(six)).toBe(new Num("0.5"));
        Expect(three.ratioOf(three)).toBe(new Num("1"));
        Expect(six.ratioOf(three)).toBe(new Num("2"));
    }

    @Test("it throws when calculating ratio of zero")
    public itThrowsWhenCalculatingRatioOfZero() {
        const currency = new Currency(CURRENCY);

        const zero = new PreciseMoney(0, currency);
        const six = new PreciseMoney(6, currency);

        const throwFn = () => six.ratioOf(zero);

        Expect(throwFn).toThrow();
    }

    @TestCases(sumExamples)
    @Test("it calculates sum")
    public itCalculatesSum(values: PreciseMoney[], sum: PreciseMoney) {
        Expect(PreciseMoney.sum(...values)).toBe(sum);
    }

    @TestCases(minExamples)
    @Test("it calculates min")
    public itCalculatesMin(values: PreciseMoney[], min: PreciseMoney) {
        Expect(PreciseMoney.min(...values)).toBe(min);
    }

    @TestCases(maxExamples)
    @Test("it calculates max")
    public itCalculatesMax(values: PreciseMoney[], max: PreciseMoney) {
        Expect(PreciseMoney.max(...values)).toBe(max);
    }

    @TestCases(avgExamples)
    @Test("it calculates avg")
    public itCalculatesAvg(values: PreciseMoney[], avg: PreciseMoney) {
        Expect(PreciseMoney.avg(...values)).toBe(avg);
    }

    public static invalidOperandExamples() {
        return [
            [[]],
            [false],
            ['operand'],
            [null],
            [{}],
        ];
    }

    public static diffCurrencyRefusalExamples() {
        const currency = new Currency(CURRENCY);
        const otherCurrency = new Currency(OTHER_CURRENCY);
        return [
            [
                new PreciseMoney(AMOUNT, otherCurrency),
            ],
            [
                new PreciseMoney(AMOUNT, otherCurrency),
                new PreciseMoney(AMOUNT, otherCurrency),
            ],
            [
                new PreciseMoney(AMOUNT, otherCurrency),
                new PreciseMoney(AMOUNT, otherCurrency),
                new PreciseMoney(AMOUNT, otherCurrency),
            ],
            [
                new PreciseMoney(AMOUNT, currency),
                new PreciseMoney(AMOUNT, otherCurrency),
            ],
            [
                new PreciseMoney(AMOUNT, otherCurrency),
                new PreciseMoney(AMOUNT, currency),
            ],
        ];
    }
}
