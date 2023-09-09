import crypto from 'node:crypto'

/**
 * 计算给定密码的MD5哈希值。
 *
 * @param {string} password - 要计算哈希值的密码。
 * @return {string} 密码的MD5哈希值。
 */
export function md5(password) {
  const hash = crypto.createHash('md5')

  const hash_password = hash.update(password).digest('hex')

  return hash_password
}
