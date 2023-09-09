import pg_sql from 'pg'

const pool = new pg_sql.Pool({
  host: 'localhost',
  port: 5432,
  user: 'root', // 数据库用户名
  password: 'root', // 数据库密码
  database: 'coderhub',
})
pool.connect((err) => {
  if (err)
    console.error('和数据库连接失败~', err)
})

pool.on('error', (err) => {
  console.error('something bad has happened!', err.stack)
})
// pool.on('error', (err) => {
//   if (err) {
//     console.error('on error', err)
//     return
//   }

//   pool.connect((err) => {
//     if (err)
//       console.error('connection error')
//     else
//       // eslint-disable-next-line no-console
//       console.log('connected')
//   })
// })

export default pool
