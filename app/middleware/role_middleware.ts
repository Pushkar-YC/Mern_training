import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn,roles:string[]) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)

    const user = ctx.auth.user;

    if(!user)
    {
      return ctx.response.status(401).json({
        message:"user not authenticated"
      })
    }

    if(!roles.includes(user.role)){
      return ctx.response.forbidden({message:"Access denied"})
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}