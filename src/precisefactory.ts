// IMPORTANT:
// This file is autogenerated by generate-money-factories.ts
// DO NOT modify directly as your changes will be overwritten

import { numeric } from "@cashmoney/number";
import PreciseMoney from "./precisemoney";
import Currency from "./currency";

function moneyFactory(amount: numeric, currencyCode: string): PreciseMoney {
    return new PreciseMoney(amount, new Currency(currencyCode));
}

export const AED = (amount: number) => moneyFactory(amount, 'AED'); // UAE Dirham
export const AFN = (amount: number) => moneyFactory(amount, 'AFN'); // Afghani
export const ALL = (amount: number) => moneyFactory(amount, 'ALL'); // Lek
export const AMD = (amount: number) => moneyFactory(amount, 'AMD'); // Armenian Dram
export const ANG = (amount: number) => moneyFactory(amount, 'ANG'); // Netherlands Antillean Guilder
export const AOA = (amount: number) => moneyFactory(amount, 'AOA'); // Kwanza
export const ARS = (amount: number) => moneyFactory(amount, 'ARS'); // Argentine Peso
export const AUD = (amount: number) => moneyFactory(amount, 'AUD'); // Australian Dollar
export const AWG = (amount: number) => moneyFactory(amount, 'AWG'); // Aruban Florin
export const AZN = (amount: number) => moneyFactory(amount, 'AZN'); // Azerbaijan Manat
export const BAM = (amount: number) => moneyFactory(amount, 'BAM'); // Convertible Mark
export const BBD = (amount: number) => moneyFactory(amount, 'BBD'); // Barbados Dollar
export const BDT = (amount: number) => moneyFactory(amount, 'BDT'); // Taka
export const BGN = (amount: number) => moneyFactory(amount, 'BGN'); // Bulgarian Lev
export const BHD = (amount: number) => moneyFactory(amount, 'BHD'); // Bahraini Dinar
export const BIF = (amount: number) => moneyFactory(amount, 'BIF'); // Burundi Franc
export const BMD = (amount: number) => moneyFactory(amount, 'BMD'); // Bermudian Dollar
export const BND = (amount: number) => moneyFactory(amount, 'BND'); // Brunei Dollar
export const BOB = (amount: number) => moneyFactory(amount, 'BOB'); // Boliviano
export const BOV = (amount: number) => moneyFactory(amount, 'BOV'); // Mvdol
export const BRL = (amount: number) => moneyFactory(amount, 'BRL'); // Brazilian Real
export const BSD = (amount: number) => moneyFactory(amount, 'BSD'); // Bahamian Dollar
export const BTN = (amount: number) => moneyFactory(amount, 'BTN'); // Ngultrum
export const BWP = (amount: number) => moneyFactory(amount, 'BWP'); // Pula
export const BYN = (amount: number) => moneyFactory(amount, 'BYN'); // Belarusian Ruble
export const BZD = (amount: number) => moneyFactory(amount, 'BZD'); // Belize Dollar
export const CAD = (amount: number) => moneyFactory(amount, 'CAD'); // Canadian Dollar
export const CDF = (amount: number) => moneyFactory(amount, 'CDF'); // Congolese Franc
export const CHE = (amount: number) => moneyFactory(amount, 'CHE'); // WIR Euro
export const CHF = (amount: number) => moneyFactory(amount, 'CHF'); // Swiss Franc
export const CHW = (amount: number) => moneyFactory(amount, 'CHW'); // WIR Franc
export const CLF = (amount: number) => moneyFactory(amount, 'CLF'); // Unidad de Fomento
export const CLP = (amount: number) => moneyFactory(amount, 'CLP'); // Chilean Peso
export const CNY = (amount: number) => moneyFactory(amount, 'CNY'); // Yuan Renminbi
export const COP = (amount: number) => moneyFactory(amount, 'COP'); // Colombian Peso
export const COU = (amount: number) => moneyFactory(amount, 'COU'); // Unidad de Valor Real
export const CRC = (amount: number) => moneyFactory(amount, 'CRC'); // Costa Rican Colon
export const CUC = (amount: number) => moneyFactory(amount, 'CUC'); // Peso Convertible
export const CUP = (amount: number) => moneyFactory(amount, 'CUP'); // Cuban Peso
export const CVE = (amount: number) => moneyFactory(amount, 'CVE'); // Cabo Verde Escudo
export const CZK = (amount: number) => moneyFactory(amount, 'CZK'); // Czech Koruna
export const DJF = (amount: number) => moneyFactory(amount, 'DJF'); // Djibouti Franc
export const DKK = (amount: number) => moneyFactory(amount, 'DKK'); // Danish Krone
export const DOP = (amount: number) => moneyFactory(amount, 'DOP'); // Dominican Peso
export const DZD = (amount: number) => moneyFactory(amount, 'DZD'); // Algerian Dinar
export const EGP = (amount: number) => moneyFactory(amount, 'EGP'); // Egyptian Pound
export const ERN = (amount: number) => moneyFactory(amount, 'ERN'); // Nakfa
export const ETB = (amount: number) => moneyFactory(amount, 'ETB'); // Ethiopian Birr
export const EUR = (amount: number) => moneyFactory(amount, 'EUR'); // Euro
export const FJD = (amount: number) => moneyFactory(amount, 'FJD'); // Fiji Dollar
export const FKP = (amount: number) => moneyFactory(amount, 'FKP'); // Falkland Islands Pound
export const GBP = (amount: number) => moneyFactory(amount, 'GBP'); // Pound Sterling
export const GEL = (amount: number) => moneyFactory(amount, 'GEL'); // Lari
export const GHS = (amount: number) => moneyFactory(amount, 'GHS'); // Ghana Cedi
export const GIP = (amount: number) => moneyFactory(amount, 'GIP'); // Gibraltar Pound
export const GMD = (amount: number) => moneyFactory(amount, 'GMD'); // Dalasi
export const GNF = (amount: number) => moneyFactory(amount, 'GNF'); // Guinean Franc
export const GTQ = (amount: number) => moneyFactory(amount, 'GTQ'); // Quetzal
export const GYD = (amount: number) => moneyFactory(amount, 'GYD'); // Guyana Dollar
export const HKD = (amount: number) => moneyFactory(amount, 'HKD'); // Hong Kong Dollar
export const HNL = (amount: number) => moneyFactory(amount, 'HNL'); // Lempira
export const HRK = (amount: number) => moneyFactory(amount, 'HRK'); // Kuna
export const HTG = (amount: number) => moneyFactory(amount, 'HTG'); // Gourde
export const HUF = (amount: number) => moneyFactory(amount, 'HUF'); // Forint
export const IDR = (amount: number) => moneyFactory(amount, 'IDR'); // Rupiah
export const ILS = (amount: number) => moneyFactory(amount, 'ILS'); // New Israeli Sheqel
export const INR = (amount: number) => moneyFactory(amount, 'INR'); // Indian Rupee
export const IQD = (amount: number) => moneyFactory(amount, 'IQD'); // Iraqi Dinar
export const IRR = (amount: number) => moneyFactory(amount, 'IRR'); // Iranian Rial
export const ISK = (amount: number) => moneyFactory(amount, 'ISK'); // Iceland Krona
export const JMD = (amount: number) => moneyFactory(amount, 'JMD'); // Jamaican Dollar
export const JOD = (amount: number) => moneyFactory(amount, 'JOD'); // Jordanian Dinar
export const JPY = (amount: number) => moneyFactory(amount, 'JPY'); // Yen
export const KES = (amount: number) => moneyFactory(amount, 'KES'); // Kenyan Shilling
export const KGS = (amount: number) => moneyFactory(amount, 'KGS'); // Som
export const KHR = (amount: number) => moneyFactory(amount, 'KHR'); // Riel
export const KMF = (amount: number) => moneyFactory(amount, 'KMF'); // Comorian Franc
export const KPW = (amount: number) => moneyFactory(amount, 'KPW'); // North Korean Won
export const KRW = (amount: number) => moneyFactory(amount, 'KRW'); // Won
export const KWD = (amount: number) => moneyFactory(amount, 'KWD'); // Kuwaiti Dinar
export const KYD = (amount: number) => moneyFactory(amount, 'KYD'); // Cayman Islands Dollar
export const KZT = (amount: number) => moneyFactory(amount, 'KZT'); // Tenge
export const LAK = (amount: number) => moneyFactory(amount, 'LAK'); // Lao Kip
export const LBP = (amount: number) => moneyFactory(amount, 'LBP'); // Lebanese Pound
export const LKR = (amount: number) => moneyFactory(amount, 'LKR'); // Sri Lanka Rupee
export const LRD = (amount: number) => moneyFactory(amount, 'LRD'); // Liberian Dollar
export const LSL = (amount: number) => moneyFactory(amount, 'LSL'); // Loti
export const LYD = (amount: number) => moneyFactory(amount, 'LYD'); // Libyan Dinar
export const MAD = (amount: number) => moneyFactory(amount, 'MAD'); // Moroccan Dirham
export const MDL = (amount: number) => moneyFactory(amount, 'MDL'); // Moldovan Leu
export const MGA = (amount: number) => moneyFactory(amount, 'MGA'); // Malagasy Ariary
export const MKD = (amount: number) => moneyFactory(amount, 'MKD'); // Denar
export const MMK = (amount: number) => moneyFactory(amount, 'MMK'); // Kyat
export const MNT = (amount: number) => moneyFactory(amount, 'MNT'); // Tugrik
export const MOP = (amount: number) => moneyFactory(amount, 'MOP'); // Pataca
export const MRU = (amount: number) => moneyFactory(amount, 'MRU'); // Ouguiya
export const MUR = (amount: number) => moneyFactory(amount, 'MUR'); // Mauritius Rupee
export const MVR = (amount: number) => moneyFactory(amount, 'MVR'); // Rufiyaa
export const MWK = (amount: number) => moneyFactory(amount, 'MWK'); // Malawi Kwacha
export const MXN = (amount: number) => moneyFactory(amount, 'MXN'); // Mexican Peso
export const MXV = (amount: number) => moneyFactory(amount, 'MXV'); // Mexican Unidad de Inversion (UDI)
export const MYR = (amount: number) => moneyFactory(amount, 'MYR'); // Malaysian Ringgit
export const MZN = (amount: number) => moneyFactory(amount, 'MZN'); // Mozambique Metical
export const NAD = (amount: number) => moneyFactory(amount, 'NAD'); // Namibia Dollar
export const NGN = (amount: number) => moneyFactory(amount, 'NGN'); // Naira
export const NIO = (amount: number) => moneyFactory(amount, 'NIO'); // Cordoba Oro
export const NOK = (amount: number) => moneyFactory(amount, 'NOK'); // Norwegian Krone
export const NPR = (amount: number) => moneyFactory(amount, 'NPR'); // Nepalese Rupee
export const NZD = (amount: number) => moneyFactory(amount, 'NZD'); // New Zealand Dollar
export const OMR = (amount: number) => moneyFactory(amount, 'OMR'); // Rial Omani
export const PAB = (amount: number) => moneyFactory(amount, 'PAB'); // Balboa
export const PEN = (amount: number) => moneyFactory(amount, 'PEN'); // Sol
export const PGK = (amount: number) => moneyFactory(amount, 'PGK'); // Kina
export const PHP = (amount: number) => moneyFactory(amount, 'PHP'); // Philippine Peso
export const PKR = (amount: number) => moneyFactory(amount, 'PKR'); // Pakistan Rupee
export const PLN = (amount: number) => moneyFactory(amount, 'PLN'); // Zloty
export const PYG = (amount: number) => moneyFactory(amount, 'PYG'); // Guarani
export const QAR = (amount: number) => moneyFactory(amount, 'QAR'); // Qatari Rial
export const RON = (amount: number) => moneyFactory(amount, 'RON'); // Romanian Leu
export const RSD = (amount: number) => moneyFactory(amount, 'RSD'); // Serbian Dinar
export const RUB = (amount: number) => moneyFactory(amount, 'RUB'); // Russian Ruble
export const RWF = (amount: number) => moneyFactory(amount, 'RWF'); // Rwanda Franc
export const SAR = (amount: number) => moneyFactory(amount, 'SAR'); // Saudi Riyal
export const SBD = (amount: number) => moneyFactory(amount, 'SBD'); // Solomon Islands Dollar
export const SCR = (amount: number) => moneyFactory(amount, 'SCR'); // Seychelles Rupee
export const SDG = (amount: number) => moneyFactory(amount, 'SDG'); // Sudanese Pound
export const SEK = (amount: number) => moneyFactory(amount, 'SEK'); // Swedish Krona
export const SGD = (amount: number) => moneyFactory(amount, 'SGD'); // Singapore Dollar
export const SHP = (amount: number) => moneyFactory(amount, 'SHP'); // Saint Helena Pound
export const SLL = (amount: number) => moneyFactory(amount, 'SLL'); // Leone
export const SOS = (amount: number) => moneyFactory(amount, 'SOS'); // Somali Shilling
export const SRD = (amount: number) => moneyFactory(amount, 'SRD'); // Surinam Dollar
export const SSP = (amount: number) => moneyFactory(amount, 'SSP'); // South Sudanese Pound
export const STN = (amount: number) => moneyFactory(amount, 'STN'); // Dobra
export const SVC = (amount: number) => moneyFactory(amount, 'SVC'); // El Salvador Colon
export const SYP = (amount: number) => moneyFactory(amount, 'SYP'); // Syrian Pound
export const SZL = (amount: number) => moneyFactory(amount, 'SZL'); // Lilangeni
export const THB = (amount: number) => moneyFactory(amount, 'THB'); // Baht
export const TJS = (amount: number) => moneyFactory(amount, 'TJS'); // Somoni
export const TMT = (amount: number) => moneyFactory(amount, 'TMT'); // Turkmenistan New Manat
export const TND = (amount: number) => moneyFactory(amount, 'TND'); // Tunisian Dinar
export const TOP = (amount: number) => moneyFactory(amount, 'TOP'); // Pa’anga
export const TRY = (amount: number) => moneyFactory(amount, 'TRY'); // Turkish Lira
export const TTD = (amount: number) => moneyFactory(amount, 'TTD'); // Trinidad and Tobago Dollar
export const TWD = (amount: number) => moneyFactory(amount, 'TWD'); // New Taiwan Dollar
export const TZS = (amount: number) => moneyFactory(amount, 'TZS'); // Tanzanian Shilling
export const UAH = (amount: number) => moneyFactory(amount, 'UAH'); // Hryvnia
export const UGX = (amount: number) => moneyFactory(amount, 'UGX'); // Uganda Shilling
export const USD = (amount: number) => moneyFactory(amount, 'USD'); // US Dollar
export const USN = (amount: number) => moneyFactory(amount, 'USN'); // US Dollar (Next day)
export const UYI = (amount: number) => moneyFactory(amount, 'UYI'); // Uruguay Peso en Unidades Indexadas (UI)
export const UYU = (amount: number) => moneyFactory(amount, 'UYU'); // Peso Uruguayo
export const UYW = (amount: number) => moneyFactory(amount, 'UYW'); // Unidad Previsional
export const UZS = (amount: number) => moneyFactory(amount, 'UZS'); // Uzbekistan Sum
export const VES = (amount: number) => moneyFactory(amount, 'VES'); // Bolívar Soberano
export const VND = (amount: number) => moneyFactory(amount, 'VND'); // Dong
export const VUV = (amount: number) => moneyFactory(amount, 'VUV'); // Vatu
export const WST = (amount: number) => moneyFactory(amount, 'WST'); // Tala
export const XAF = (amount: number) => moneyFactory(amount, 'XAF'); // CFA Franc BEAC
export const XAG = (amount: number) => moneyFactory(amount, 'XAG'); // Silver
export const XAU = (amount: number) => moneyFactory(amount, 'XAU'); // Gold
export const XBA = (amount: number) => moneyFactory(amount, 'XBA'); // Bond Markets Unit European Composite Unit (EURCO)
export const XBB = (amount: number) => moneyFactory(amount, 'XBB'); // Bond Markets Unit European Monetary Unit (E.M.U.-6)
export const XBC = (amount: number) => moneyFactory(amount, 'XBC'); // Bond Markets Unit European Unit of Account 9 (E.U.A.-9)
export const XBD = (amount: number) => moneyFactory(amount, 'XBD'); // Bond Markets Unit European Unit of Account 17 (E.U.A.-17)
export const XBT = (amount: number) => moneyFactory(amount, 'XBT'); // Bitcoin
export const XCD = (amount: number) => moneyFactory(amount, 'XCD'); // East Caribbean Dollar
export const XDR = (amount: number) => moneyFactory(amount, 'XDR'); // SDR (Special Drawing Right)
export const XOF = (amount: number) => moneyFactory(amount, 'XOF'); // CFA Franc BCEAO
export const XPD = (amount: number) => moneyFactory(amount, 'XPD'); // Palladium
export const XPF = (amount: number) => moneyFactory(amount, 'XPF'); // CFP Franc
export const XPT = (amount: number) => moneyFactory(amount, 'XPT'); // Platinum
export const XSU = (amount: number) => moneyFactory(amount, 'XSU'); // Sucre
export const XTS = (amount: number) => moneyFactory(amount, 'XTS'); // Codes specifically reserved for testing purposes
export const XUA = (amount: number) => moneyFactory(amount, 'XUA'); // ADB Unit of Account
export const XXX = (amount: number) => moneyFactory(amount, 'XXX'); // The codes assigned for transactions where no currency is involved
export const YER = (amount: number) => moneyFactory(amount, 'YER'); // Yemeni Rial
export const ZAR = (amount: number) => moneyFactory(amount, 'ZAR'); // Rand
export const ZMW = (amount: number) => moneyFactory(amount, 'ZMW'); // Zambian Kwacha
export const ZWL = (amount: number) => moneyFactory(amount, 'ZWL'); // Zimbabwe Dollar
