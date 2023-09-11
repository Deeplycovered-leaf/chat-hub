import connection from '../app/db'

export default new class UserService {
  /**
   * 创建用户。
   *
   * @param {Object} user - 用户对象。
   * @param {string} user.name - 用户名。
   * @param {string} user.password - 密码。
   * @return {Promise<Array>} 插入的行数据。
  */
  async create(user) {
    const { name, password } = user

    const statement = 'INSERT INTO "user" (name, password) VALUES ($1,$2);'

    const { rows } = await connection.query(statement, [name, password])

    return rows
  }

  /**
   * 查找用户。
   *
   * @param {string} name - 要查找的用户名称。
   * @return {any[]} 查找到的用户数组。
   */
  async find(name) {
    const statement = 'select * from "user" where name = $1;'

    const res = await connection.query(statement, [name])

    return res.rows
  }

  async update_avatar({ avatar_url, user_id }) {
    const statement = 'update "user" set avatar_url = $1 where id = $2 returning avatar_url;'

    const { rows } = await connection.query(statement, [avatar_url, user_id])

    return rows
  }

  async select({ command = 'select', query_content, table_name, expression, values }) {
    const statement = `${command} ${query_content} ${command === 'select' ? 'from' : ''} ${table_name} ${expression};`

    const res = await connection.query(statement, [...values])

    return res
  }
}()
