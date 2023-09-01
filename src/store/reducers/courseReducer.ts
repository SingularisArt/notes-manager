import { CourseActionType, CourseState } from "../types/CourseType";

const initialState: CourseState = {
  week: 1,
};

const courseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CourseActionType.UPDATE_COURSE_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default courseReducer;
