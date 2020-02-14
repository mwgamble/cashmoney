import fs from "fs";
import path from "path";
import Currency from "../src/currency";
import ISOCurrencyList from "../src/currencylists/iso";
import BitcoinCurrencyList from "../src/currencylists/bitcoin";
import AggregateCurrencyList from "../src/currencylists/aggregate";

const warning = `// IMPORTANT:
// This file is autogenerated by generate-money-factories.ts
// DO NOT modify directly as your changes will be overwritten`;

let preciseCode = `${warning}

import { numeric } from "@cashmoney/number";
import PreciseMoney from "./precisemoney";
import Currency from "./currency";

function moneyFactory(amount: numeric, currencyCode: string): PreciseMoney {
    return new PreciseMoney(amount, new Currency(currencyCode));
}

`;

let roundedCode = `${warning}

import { numeric } from "@cashmoney/number";
import RoundedMoney from "./roundedmoney";
import Currency from "./currency";

function moneyFactory(amount: numeric, subunit: number, currencyCode: string): RoundedMoney {
    return new RoundedMoney(amount, subunit, new Currency(currencyCode));
}

`;

const isoCurrenciesJson = fs.readFileSync(process.argv[2], "utf8");
const isoCurrenciesData = JSON.parse(isoCurrenciesJson);
const isoCurrencyList = new ISOCurrencyList(isoCurrenciesData);

const bitcoinCurrencyList = new BitcoinCurrencyList();
const currencyList = new AggregateCurrencyList([
    isoCurrencyList,
    bitcoinCurrencyList,
]);

const currencies: Currency[] = Array.from(currencyList);
currencies.sort();

for (const currency of currencies) {
    preciseCode += "export const " + currency.code + " = (amount: number) => moneyFactory(amount, '" + currency.code + "'); // " + currencyList.nameFor(currency) + "\n";
    roundedCode += "export const " + currency.code + " = (amount: number) => moneyFactory(amount, " + currencyList.subunitFor(currency) + ", '" + currency.code + "'); //" + currencyList.nameFor(currency) + "\n";
}

fs.writeFileSync(path.join(__dirname, "..", "src", "precisefactory.ts"), preciseCode);
fs.writeFileSync(path.join(__dirname, "..", "src", "roundedfactory.ts"), roundedCode);
