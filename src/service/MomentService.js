import connection from '../app/db'

export default new class MomentService {
  async create({ id, content }) {
    const statement = 'INSERT INTO moment (user_id, content) VALUES ($1,$2);'

    const { rows } = await connection.query(statement, [id, content])

    return rows
  }

  async query({ limit = 10, offset = 0 }) {
    const statement = `SELECT
      m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
      jsonb_build_object('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment m
      LEFT JOIN "user" u ON u.id = m.user_id
      LIMIT $1 OFFSET $2;
    `

    const { rows } = await connection.query(statement, [limit, offset])

    return rows
  }

  async query_by_id({ id }) {
    const statement = `SELECT
      m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
      jsonb_build_object('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment m
      LEFT JOIN "user" u ON u.id = m.user_id
      WHERE m.id = $1;
    `

    const { rows } = await connection.query(statement, [id])

    return rows
  }

  async update({ id, content }) {
    const statement = 'UPDATE moment SET content = $1 WHERE id = $2;'

    const { rows } = await connection.query(statement, [content, id])

    return rows
  }

  async delete({ id }) {
    const statement = 'delete from moment WHERE id = $1;'

    const { rows } = await connection.query(statement, [id])

    return rows
  }
}()
