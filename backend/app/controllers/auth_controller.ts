import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return {
      message: 'User registered successfully ✅',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return {
      message: 'Login successful ✅',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    }
  }

  async logout({ auth }: HttpContext) {
    await auth.check()

    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return { message: 'Logged out successfully ✅' }
  }

  async me({ auth, response }: HttpContext) {
    try {
      await auth.check()

      if (!auth.user) {
        return response.unauthorized({ message: 'Not authenticated ❌' })
      }

      const users = await User.all()

      return {
        message: 'All users fetched successfully ✅',
        currentUser: {
          id: auth.user.id,
          fullName: auth.user.fullName,
          email: auth.user.email,
          createdAt: auth.user.createdAt,
          updatedAt: auth.user.updatedAt,
        },
        users: users.map((u) => ({
          id: u.id,
          fullName: u.fullName,
          email: u.email,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        })),
      }
    } catch {
      return response.unauthorized({ message: 'Invalid or expired token ❌' })
    }
  }
}
