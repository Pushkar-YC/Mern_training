import { HttpContext } from '@adonisjs/core/http'
import { updateAvatarValidator } from '#validators/user_avatar'
import FileUploadService from '#services/file_upload_service'
import User from '#models/user'

export default class UserAvatarsController {
  public service: FileUploadService = new FileUploadService()

  async update({ request, response, params }: HttpContext) {
    const { avatar } = await request.validateUsing(updateAvatarValidator)

    const fileName: string = await this.service.moveFile(avatar)

    try {
      const userId = params.id

      const user = await User.findOrFail(userId)

      user.avatar = fileName

      await user.save()
    } catch (error) {
      console.error('Error saving avatar to database:', error)

      return response.internalServerError({
        message: 'Failed to update user avatar in DB.',
        details: error.message,
      })
    }

    return response.ok({
      message: 'Avatar uploaded successfully, and database updated.',
      fileName: fileName,
    })
  }
}
