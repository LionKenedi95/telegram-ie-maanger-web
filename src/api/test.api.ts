import API_URL from "@/constants/ApiUrl";

export const tryApi = (initData: string) => {
  console.log('tryApi')
  return fetch(API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      initData,
    }),
  })
    .then(result => {
      console.log('result', result)
    })
}

export const tryGetApi = (initData: string) => {
  const params = {
    initData,
  };
  
  // Формируем query string
  const queryString = new URLSearchParams(params).toString();

  return fetch(`${API_URL}?${queryString}`, {
    method: "GET",
  })
    .then(result => {
      console.log('result', result)
    })
}