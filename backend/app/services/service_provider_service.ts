import User from '#models/user'
import crypto from 'node:crypto'
import mail from '@adonisjs/mail/services/main'

interface Person {
  email: string
  password: string
}

export class ServiceProviderService {
  static async verifyEmail(user: User | null) {
    if (!user) {
      throw new Error('Invalid verification link')
    }

    user.isEmailVerified = true
    await user.save()
    return user
  }
  static async loginUser(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)

    if (!user || !user.isEmailVerified) {
      throw new Error('Invalid credentials or email not verified')
    }

    const token = await (User.accessTokens as any).create(user)
    return { token, user }
  }

  static async registerUser(data: Person) {
    const user = await User.create(data)
    const token = crypto.randomBytes(32).toString('hex')
    user.emailVerificationToken = token
    await user.save()

    const verificationUrl = `http://localhost:3333/verify-email/${user.id}`

    await mail.send((message) => {
      message
        .to(user.email)
        .from('hr3247453@gmail.com')
        .subject('Verify your email')
        .html(`<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`)
    })
  }
}
