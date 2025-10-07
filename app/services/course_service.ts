import Course from '#models/course'

interface CourseData {
  course_name: string
  price: number
  category: string
  duration: string
}

export class CourseService {
  // Your code here
  public async create(course: CourseData) {
    console.log(course)

    const courseDetails = await Course.create({
      course_name: course.course_name,
      price: course.price,
      duration: course.duration,
      category: course.category,
    })

    if (!courseDetails) {
      return 'Error in creating course'
    }

    return courseDetails
  }
}
