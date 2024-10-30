const ServerConfig = Object.freeze({
  protocol: 'https://',
  host: 'telegrammanagerbot.site/api/'
})

export const getAddress = (endpoint: string) => `${ServerConfig.protocol}${ServerConfig.host}${endpoint}`