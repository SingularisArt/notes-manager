import { CourseActionType, CourseState } from "../types/CourseType";

export const updateCourseData = (data: Partial<CourseState>) => {
  return {
    type: CourseActionType.UPDATE_COURSE_DATA,
    payload: data,
  };
};
