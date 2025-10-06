import vine from '@vinejs/vine'


export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '5mb', // Max 2 Megabytes
      extnames: ['jpg', 'png', 'jpeg'], // Allowed file extensions
    }),
  }),
)