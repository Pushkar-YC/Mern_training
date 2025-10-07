import vine from '@vinejs/vine'

export const coursePostValidator = vine.compile(
    vine.object({
        course_name:vine.string().minLength(2).maxLength(10),
        price:vine.number().min(100).max(5000),
        category:vine.string().minLength(2).maxLength(10),
        duration:vine.string()
    })
)

export const courseUpdateValidator = vine.compile(
    vine.object({
        course_name:vine.string().minLength(2).maxLength(10).optional(),
        price:vine.number().min(100).max(5000).optional(),
        category:vine.string().minLength(2).maxLength(10).optional(),
        duration:vine.string().optional()
    })
)