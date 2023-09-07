import { app } from './app'
import { SERVER_PORT } from './config'

import './utils/handle-error'

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server is running at http://localhost:8000')
})
