const url = 'http://localhost:4000/api/';

async function doFetch(endpoint, method, data = null) {

  const path = url + endpoint;
  const obj = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  if (data) {
    obj.body = JSON.stringify(data);
  }
  const result = await fetch(path, obj);
  
  let returnData = await result.json();
  return returnData;
}

export default doFetch;