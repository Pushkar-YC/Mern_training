import Course from '#models/course'
import { CourseService } from '#services/course_service'
import { coursePostValidator, courseUpdateValidator } from '#validators/post_course'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  public service: CourseService = new CourseService()

  async createCourse(ctx: HttpContext) {
    try {
      console.log('ctx data:', ctx)
      const payload = await ctx.request.validateUsing(coursePostValidator)

      if (!payload) {
        return ctx.response.status(400).json({
          success: false,
          message: 'Please fill all field carefully',
        })
      }

      const user = await this.service.create(payload)

      return ctx.response.created({
        success: true,
        message: 'Course Created Successfully',
        data: user,
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        message: 'Something went wrong while creating course.',
        data: error,
      })
    }
  }

  async updateCourse({ request, response }: HttpContext) {
    try {
      const course = await Course.find(request.param('id'))

      if (!course) {
        return response.status(400).json({
          success: false,
          message: 'course with given id is not found.',
        })
      }

      const payload = await request.validateUsing(courseUpdateValidator)

      course.merge(payload)

      const updatedCourse = await course.save()

      if (!updatedCourse) {
        return response.status(400).json({
          success: false,
          message: 'Course not updated with given id',
        })
      }

      return response.ok({
        success: true,
        message: 'Course Updated Successfully',
        data: updatedCourse,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Something went wrong while updating course.',
        data: error,
      })
    }
  }

  async deleteCourse({ request, response }: HttpContext) {
    try {
      const course = await Course.find(request.param('id'))

      if (!course) {
        return response.status(400).json({
          success: false,
          message: 'course not found',
        })
      }

      await course.delete()

      return response.status(200).json({
        success: true,
        message: 'Coure Deleted Successfully',
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Something went wrong while deleting course.',
        data: error,
      })
    }
  }

  async showCourse({ request, response }: HttpContext) {
    try {
      const course = await Course.find(request.param('id'))

      if (!course) {
        return response.status(400).json({
          success: false,
          message: 'course not found',
        })
      }

      return response.status(200).json({
        success: true,
        message: 'Course Present with given id',
        data: course,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Something went wrong while finding course.',
        data: error,
      })
    }
  }

  async showAllCourse({ response }: HttpContext) {
    try {
      const course = await Course.all()

      if (!course) {
        return response.status(400).json({
          success: false,
          message: 'course not found',
        })
      }

      return response.status(200).json({
        success: true,
        message: 'All courses details',
        data: course,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Something went wrong while finding all courses.',
        data: error,
      })
    }
  }
}
