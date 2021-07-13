// Convert time to hours and minutes
export const calcTime = (time) => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};
// this function is used to activate the sessionStorage so we can write
// to sessionStorage
export const isPersistedState = (stateName) => {
  const sessionState = sessionStorage.getItem(stateName);
  // if sessionStorage contains string content, then parse the sessionStorage
  // to JSON format
  return sessionStorage && JSON.parse(sessionState);
};
