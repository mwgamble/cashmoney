import RoundedMoney from "./roundedmoney";

export default interface MoneyFormatter {
    format(money: RoundedMoney): string;
}
