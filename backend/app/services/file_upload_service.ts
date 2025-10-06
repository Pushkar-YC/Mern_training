import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'



export default class FileUploadService {
  public async moveFile(file: MultipartFile): Promise<string> {
    const fileName = `${cuid()}.${file.extname}`

    const uploadsPath = app.makePath('storage/uploads')

    await file.move(uploadsPath, {
      name: fileName,
    })

    if (!file.isValid) {
      throw new Error(`File move failed: ${file.errors.map((e) => e.message).join(', ')}`)
    }

    // 4. Return the file name for database persistence
    return fileName
  }
}


