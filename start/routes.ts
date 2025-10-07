/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import CoursesController from '#controllers/courses_controller'
import { middleware } from './kernel.js'





router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    //create course
    router
      .post('/create', [CoursesController, 'createCourse'])
      .as('course.createCourse')
      .use([middleware.auth(), middleware.role(['instructor'])])

    //show course by id
    router
      .get('/show/:id', [CoursesController, 'showCourse'])
      .as('course.showCourse')
      .use([middleware.auth(), middleware.role(['student'])])

    //show all courses
    router
      .get('/show-all-courses', [CoursesController, 'showAllCourse'])
      .as('course.showAllCourse')
      .use([middleware.auth(), middleware.role(['admin'])])

    //update course by id
    router
      .put('/update/:id', [CoursesController, 'updateCourse'])
      .as('course.deleteCourse')
      .use([middleware.auth(), middleware.role(['instructor'])])

    //delete course by id
    router
      .delete('/delete/:id', [CoursesController, 'deleteCourse'])
      .use([middleware.auth(), middleware.role(['instructor'])])
  })
  .prefix('/course')

router
  .group(() => {
    //register
    router.post('/register', [AuthController, 'register']).as('auth.register')

    //login
    router.post('/login', [AuthController, 'login']).as('auth.login')

    //logout
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

    //me
    router.get('/me', [AuthController, 'me']).as('auth.me')
  })
  .prefix('/auth')
