import connection from '../../app/db'

export const comment_service = new class CommentService {
  async create({ id, content, moment_id }) {
    const statement = 'INSERT INTO comment (user_id, content, moment_id) VALUES ($1, $2, $3);'

    const { rows } = await connection.query(statement, [id, content, moment_id])

    return rows
  }

  async reply({ id, content, moment_id, comment_id }) {
    const statement = 'INSERT INTO comment (user_id, content, moment_id, comment_id) VALUES ($1, $2, $3, $4);'

    const { rows } = await connection.query(statement, [id, content, moment_id, comment_id])

    return rows
  }

  async query({ limit = 10, offset = 0 }) {
    const statement = `SELECT
      m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
      jsonb_build_object('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user,
      (SELECT count(*) FROM comment c WHERE c.moment_id = m.id) AS reply_count
      FROM moment m
      LEFT JOIN "user" u ON u.id = m.user_id
      LIMIT $1 OFFSET $2;
    `

    const { rows } = await connection.query(statement, [limit, offset])

    return rows
  }

  async query_by_id({ id }) {
    const statement = `SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        jsonb_build_object('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user,
        json_agg(
          jsonb_build_object('id', c.id, 'content', c.content, 'comment_id', c.comment_id,
            'user', jsonb_build_object('id', c.user_id, 'name', uu.name) 
          )
        ) AS comments
        FROM moment m
        LEFT JOIN "user" u ON u.id = m.user_id
        LEFT JOIN comment c ON c.moment_id = m.id
        LEFT JOIN "user" uu ON uu.id = c.user_id
        where m.id = $1
        group by m.id, u.id;
      `
    const { rows } = await connection.query(statement, [id])

    return rows
  }

  async update({ id, content }) {
    const statement = 'UPDATE comment SET content = $1 WHERE id = $2;'

    const { rows } = await connection.query(statement, [content, id])

    return rows
  }

  async delete({ id }) {
    const statement = 'delete from comment WHERE id = $1;'

    const { rows } = await connection.query(statement, [id])

    return rows
  }
}()
