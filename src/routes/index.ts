import { Router } from 'express'

import { config } from '../config'
import { AuthController } from '../controllers'

const router = Router()

const Routes = () => {
  router.get(
    '/',
    AuthController.Validate,
    AuthController.FetchDiscord,
    AuthController.FetchDiscordConnections,
    AuthController.ValidateSteam
  )

  router.get('/test', (req, res) => {
    res.json({ message: 'Test' })
  })
  return router
}

export default Routes

// 86.4.175.151:1337/?code=gkOOxauitR4BC0Qjo8XrCAAOOFmdxS&state=305384952684609538
