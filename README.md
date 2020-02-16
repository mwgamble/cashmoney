# CashMoney

CashMoney assists you in the handling of monetary values to ensure you avoid awkward
rounding errors in your business logic.

This package started as a part of the [MoneyPHP](https://github.com/moneyphp/money) library,
but has since diverged to utilise some different concepts. Most importantly, CashMoney
differentiates between "precise money" and "rounded money".

> "If I had a dime for every time I've seen someone use FLOAT to store currency, I'd have $999.997634" -- [Bill Karwin](https://twitter.com/billkarwin/status/347561901460447232)

As mentioned by the MoneyPHP library, you shouldn't represent monetary values with
floating point numbers. Instead, a dedicated money object should be used instead.
This library uses a "big number" implementation (powered by [bignumber.js](https://mikemcl.github.io/bignumber.js/)
to truly support numbers of artbitrary precision.

## Features

- Precise money, to avoid rounding errors entirely
- Rounded money, for when you need to work with money in a similar manner to cash
- Money formatting using built-in JS Intl functionality
- Money exchange (conversion rates must be supplied manually)
- JSON serialization

## Install

With yarn:

```bash
$ yarn add @cashmoney/core
```

Or with npm:

```bash
$ npm add @cashmoney/core
```

## Example usage

### Money

There are two types of money: Precise and Rouned. Which one you want depends
on what you plan to do with the relevant amount(s).

#### Precise Money

Precise Money objects accept values of any precision, as strings or numbers.

```typescript
import { PreciseMoney, Currency, PreciseMoneyFactory } from "@cashmoney/core";
const { AUD } = PreciseMoneyFactory;

const currency = new Currency("AUD");
const fiveAud = new PreciseMoney(5, currency);
const tenAud = fiveAud.add(fiveAud);
const sevenPointFiveAud = new PreciseMoney("7.5", currency);

// Alternatively:
const fiveAudAlt = AUD(5);
const tenAudAlt = AUD(10);
const sevenPointFiveAud = AUD(7.5);

assert(tenAud.subtract(fiveAud).equals(fiveAud));
assert(tenAud.subtract(new PreciseMoney("2.5", currency)).equals(sevenPointFiveAud);
```

#### Rounded Money

Rounded Money objects require that the expected precision of the currency is supplied.

```typescript
import { RoundedMoney, Currency, RoundedMoneyFactory } from "@cashmoney/core";

// AUD uses 2 decimal places
const fiveAud = new RoundedMoney("5.00", 2, new Currency("AUD"));
const tenAud = fiveAud.add(fiveAud);

const [part1, part2, part3] = tenAud.allocate([1, 1, 1]);
assert(part1.equals(AUD("3.34")));
assert(part2.equals(AUD("3.33")));
assert(part3.equals(AUD("3.33")));
```

If you use the factory functions, they supply the precision for you.

```typescript
import { RoundedMoney, Currency, RoundedMoneyFactory } from "@cashmoney/core";
const { AUD } = RoundedMoneyFactory;

const fiveAud = new RoundedMoney("1.23", 2, new Currency("AUD"));
const fiveAudAlt = AUD("1.23");
assert(fiveAud.equals(fiveAudAlt));
```

#### Converting between Precise and Rounded

You can convert a Precise Money object to a Rounded Money object, but there
is no automated translation going back the other way. This is supposed to be
indicative of the idea that once you've disposed of the precision provided by
the Precise Money class, you can never get it back.

The Precise Money class has a method for converting to Rounded Money objects. 

```typescript
import { PreciseMoney, RoundedMoney, Currency } from "@cashmoney/core";

const currency = new Currency("AUD");
const fivePreciseAud = new PreciseMoney(5, currency);
const fiveRoundedAud = fivePreciseAud.roundToDecimalPlaces(2);
const fiveRoundedAudAlt = new RoundedMoney(5, 2, currency);
assert(fiveRoundedAud.equals(fiveRoundedAudAlt));
```

However, this requires that you always know the precision of every currency
you're dealing with, everywhere that you want to do this in your code. That
doesn't scale very well, so there's a dedicated Money Rounder class you can
use to generalise this process.

```typescript
import { PreciseMoneyFactory, RoundedMoneyFactory, CustomCurrencyList, MoneyRounder } from "@cashmoney/core";
const { AUD: PAUD } = PreciseMoneyFactory;
const { AUD: RAUD } = RoundedMoneyFactory;

const currencies = new CustomCurrencyList({ AUD: 2 });
const rounder = new MoneyRounder(currencies);

const pMoney = PAUD("1.50");
const pMoneyMultiplied = PAUD(1.25); // equals "1.875"
const rMoney = rounder.round(pMoney);
assert(rMoney.equals(RAUD("1.88")));
```

CashMoney defaults to [Banker's Rounding](https://en.wikipedia.org/wiki/Banker's_rounding),
which is actually "round half to even". You can change the rounding method
used for any given rounding.

```typescript
import { RoundingMode } from "@cashmoney/core";

const customRounder = new MoneyRounder(currencies, RoundingMode.ROUND_HALF_UP);
const rMoneyHalfUp = rounder.round(pMoneyMultiplied); // equals "1.88"
const rMoneyHalfDown = rounder.round(pMoneyMultiplied, RoundingMode.ROUND_HALF_DOWN); // equals "1.87"
```

### Parsing

All parsers return instances of ``PreciseMoney``.

#### ISO Code parser

The ISO Code parser parses strings of the form ``"AUD 1.23"`` and "AUD 100".

```typescript
import { PreciseMoneyFactory, ISOCodeMoneyParser } from "@cashmoney/core";
const { AUD } = PreciseMoneyFactory;

const parser = new ISOCodeMoneyParser();

const fiveAud = parser.parse("AUD 5.00");
assert(fiveAud.equals(AUD(5)));

const fiftyAud = parser.parse("AUD 50");
assert(fiftyAud.equals(AUD(50)));
```

It can also handle strings formatted for different regions.

```typescript
const fiveAudAlt = parser.parse("5.00 AUD");
assert(fiveAudAlt.equals(AUD(5)));

const fiftyAudAlt = parser.parse("5,00 AUD");
assert(fiftyAudAlt.equals(AUD(50)));
```

If you supply it with a list of valid currencies, it will validate the currency code it finds.
An exception will be thrown if the currency code isn't in the list.

```typescript
import { CustomCurrencyList, ISOCodeMoneyParser } from "@cashmoney/core";

const currencies = new CustomCurrencyList({ AUD: 2 });
const parser = new ISOCodeMoneyParser(currencies);

const twentyZzz = parser.parse("ZZZ 20"); // throws Error("Unknown currency code.")
```

#### Symbol parser

TODO: Write this section

### Formatting

TODO: Rewrite this section to use rounded money

```typescript
import { MoneyFactory, CustomCurrencyList, IntlMoneyFormatter } from "@cashmoney/core";
const { AUD, EUR, USD } = MoneyFactory;

const currencies = new CustomCurrencyList({ AUD: 2, EUR: 2, USD: 2 });
const fiveAud = AUD(500);
const fiveEur = EUR(500);
const fiveUsd = USD(500);

const auFormatter = new IntlMoneyFormatter(currencies, { locales: "en-AU", style: "currency" });
console.log(auFormatter.format(fiveAud)); // outputs '$5.00'
console.log(auFormatter.format(fiveEur)); // outputs 'EUR 5.00'
console.log(auFormatter.format(fiveUsd)); // outputs 'USD 5.00'

const euFormatter = new IntlMoneyFormatter(currencies, { locales: "es-ES", style: "currency" });
console.log(euFormatter.format(fiveAud)); // outputs '5,00 AUD'
console.log(euFormatter.format(fiveEur)); // outputs '5,00 €'
console.log(euFormatter.format(fiveUsd)); // outputs '5,00 US$'

const usFormatter = new IntlMoneyFormatter(currencies, { locales: "en-US", style: "currency" });
console.log(usFormatter.format(fiveAud)); // outputs 'A$5.00'
console.log(usFormatter.format(fiveEur)); // outputs '€5.00'
console.log(usFormatter.format(fiveUsd)); // outputs '$5.00'
```

## Tests

To run the test suite, run ``yarn run test`` in the root of the repository.

## License

This library is made available under the MIT License (MIT). Please see the [license file](LICENSE.txt)
for more information.

## Acknowledgements

This library started as a direct port of [MoneyPHP](https://github.com/moneyphp/money). If you
ever need to work with monetary values in PHP, I highly recommend it.

By extension, this library is inspired by [Martin Fowler's Money pattern](https://martinfowler.com/eaaCatalog/money.html).

This library was later transformed into what it is today, with the distinction between
"precise" and "rounded" money objects, as a direct inspiration from this blog post
by Mathias Verraes:

http://verraes.net/2016/02/type-safety-and-money/
