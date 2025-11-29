export const getServerUrl =()=>{
    const url = process.env.REACT_APP_PUBLIC_NODE_URL
    return url
}


export function dateFormatDayMonthYear(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}


export function getUserDetails() {
  const userDetails = localStorage.getItem( "userDetails");
  const userData = userDetails ? JSON.parse(userDetails) : {};
  return userData;
}


export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
