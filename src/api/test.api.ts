import API_URL from "@/constants/ApiUrl";

export const tryApi = () => {
  console.log('tryApi')
  return fetch(API_URL, {
    method: "POST",
  })
    .then(result => {
      console.log('result', result)
    })
}