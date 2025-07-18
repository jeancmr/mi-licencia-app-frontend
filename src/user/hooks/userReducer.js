export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'ADD_USER':
      return [...state, action.payload];

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload.id);

    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
