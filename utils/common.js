import { BASE_URL } from "./headers";
const apiCall = async ({ endpoint, method, headers = {}, body = null }) => {
    try {
 
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch data:", res.statusText, errorText);
        return { data: null, error: `${res.statusText}: ${errorText}` };
      }
  
      const data = await res.json();
      return data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return { data: null, error: error.message };
    }
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  
  export {apiCall,truncateText}
  