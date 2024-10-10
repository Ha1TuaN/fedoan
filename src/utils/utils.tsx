export const getMoneyVN = (money: number | string) => {
    return money.toLocaleString('de-DE');
};
export const formatNumber = (value: number | any) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
