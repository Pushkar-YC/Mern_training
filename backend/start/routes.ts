const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UserAvatarsController from '#controllers/user_avatars_controller'

router.get('/', async () => {
  return {
    hello: 'world golu',
  }
})

router.get('/verify-email/:id', [AuthController, 'verifyEmail']).as('auth.verifyEmail')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')

//for file uploading
router.post('/api/users/:id/avatar', [UserAvatarsController, 'update']).as('userAvatars.update')
