import connection from '../app/db'

export default new class PermissionService {
  async check({ module_name, module_id, user_id }) {
    const statement = `select * from ${module_name} where id = $1 and user_id = $2;`

    const { rowCount } = await connection.query(statement, [module_id, user_id])

    return !!rowCount
  }
}()
