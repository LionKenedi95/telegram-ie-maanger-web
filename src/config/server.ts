const ServerConfig = Object.freeze({
  protocol: 'http://',
  host: '79.174.84.106'
})

export const getAddress = (endpoint: string) => `${ServerConfig.protocol}${ServerConfig.host}/${endpoint}`