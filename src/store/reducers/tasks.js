const initialState = {
  items: [],
  item: {},
  loading: false,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASKS_FINISH":
      return {
        ...state,
        items: action.payload,
      };
    case "CHANGE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return { ...state };
  }
};

export default tasks;
