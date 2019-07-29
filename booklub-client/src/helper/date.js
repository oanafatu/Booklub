

export default function cleanDate (dateStr) {
  let date = new window.Date(dateStr); 
  let month = ("0" + (date.getMonth() + 1)).slice(-2); 
  let day = ("0" + date.getDate()).slice(-2); 
  return date.getFullYear() + '/' + month + '/' + day;
}

