import { CourseActionType, CourseState } from "store/types/CourseType";

export const updateCourseData = (data: Partial<CourseState>) => {
  return {
    type: CourseActionType.UPDATE_COURSE_DATA,
    payload: data,
  };
};
