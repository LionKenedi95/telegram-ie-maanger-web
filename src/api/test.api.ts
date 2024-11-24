import API_URL from "@/constants/ApiUrl";

export const tryApi = (initData: string) => {
  console.log('tryApi')
  return fetch(API_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Тип данных, которые мы отправляем
    },
    body: JSON.stringify({
      initData,
    }),
  })
    .then(result => {
      console.log('result', result)
    })
}