import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { ServiceProviderService } from '#services/service_provider_service'

export default class AuthController {
  //use this function for verfiying the user's email
  async verifyEmail({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    await ServiceProviderService.verifyEmail(user)

    return response.json({ message: 'Email verified successfully ✅' })
  }

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await ServiceProviderService.registerUser(data)

    return response.json({
      message: 'Registration successful. Please check your email to verify your account.',
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const { token, user } = await ServiceProviderService.loginUser(email, password)

    return response.ok({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
      token: token.token,
    })

    // ✅ verifyCredentials handles password hashing check
    // const user = await User.verifyCredentials(email, password)
    // const token = await User.accessTokens.create(user)
    // return {
    //   message: 'Login successful ✅',
    //   user: {
    //     id: user.id,
    //     fullName: user.fullName,
    //     email: user.email,
    //     createdAt: user.createdAt,
    //     updatedAt: user.updatedAt,
    //   },
    //   token,
    // }
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
