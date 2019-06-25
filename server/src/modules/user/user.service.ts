import * as crypto from 'crypto'

export const encrypt = (password: string): string => {
  const md5 = crypto.createHash('md5')
  const saltPassword = password + ':' + 'plarum_2019'
  const encryptedPasswd = md5.update(saltPassword).digest('hex')
  return encryptedPasswd
}
