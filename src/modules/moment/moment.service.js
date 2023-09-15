import connection from '../../app/db'

export const moment_service = new class MomentService {
  async create({ id, content }) {
    const statement = 'INSERT INTO moment (user_id, content) VALUES ($1,$2);'

    const { rows } = await connection.query(statement, [id, content])

    return rows
  }

  async query({ limit = 10, offset = 0 }) {
    const statement = `SELECT
      m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
      jsonb_build_object('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user,
      (SELECT count(*) FROM comment c WHERE c.moment_id = m.id) AS comment_count,
      (SELECT count(*) FROM moment_label ml WHERE ml.moment_id = m.id) AS label_count
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
      jsonb_build_object('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user,
      (select 
        json_agg(
          jsonb_build_object('id', c.id, 'content', c.content, 'comment_id', c.comment_id,
            'user', jsonb_build_object('id', c.user_id, 'name', uu.name, 'avatar_url', uu.avatar_url,) 
          )
        ) 
        from comment c 
        left join "user" uu on uu.id = c.user_id 
        where c.moment_id = m.id 
      ) AS comments,
      json_agg(
        jsonb_build_object('id', l.id, 'label', l.name)
      ) AS labels
      FROM moment m
      LEFT JOIN "user" u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id
      where m.id = $1
      group by m.id, u.id;
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

  async has_label({ label_id, moment_id }) {
    const statement = 'select * from moment_label WHERE label_id = $1 and moment_id = $2;'

    const { rowCount } = await connection.query(statement, [label_id, moment_id])

    return !!rowCount
  }

  async add_labels({ label_id, moment_id }) {
    const statement = 'insert into moment_label (label_id, moment_id) values ($1, $2);'

    const { rows } = await connection.query(statement, [label_id, moment_id])

    return rows
  }
}()
