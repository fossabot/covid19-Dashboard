export default async function makeRequest({
    url,
    body = {},
    method = 'GET',
    headers = {},
  }) {
    //const bodyString = JSON.stringify(body)
    let json; let response;
  
    if(method === 'GET') {
        response = await fetch(url, {
            method,
            // body: bodyString,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          });
    }
    
    if (!response.ok) {
      let message = `Failed api request to ${url}`
      try {
        const responseText = await response.text()
        if (responseText) {
          message += responseText
        }
      } catch (e) {
        throw new Error(`Api request to ${url}: ${message} ${response.status}`)
      }
    }
    try {
      // incase the the server returns invalid json
      json = await response.json()
    } catch (e) {
      console.error('Response error:',e.message);
    }
    return json
  };