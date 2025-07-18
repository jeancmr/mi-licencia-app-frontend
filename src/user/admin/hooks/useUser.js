import { useCallback, useEffect, useReducer } from 'react';
import { getUsers } from '../../api';
import { userReducer } from './userReducer';

const initialState = {
  users: [],
  isLoading: true,
  selectedUser: null,
};

export const useUser = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    fetchUsers();
  }, [state.users.length]);

  const fetchUsers = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await getUsers();

      dispatch({ type: 'SET_USERS', payload: data });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSelectUser = useCallback((user) => {
    dispatch({ type: 'SELECT_USER', payload: user });
  }, []);

  const handleDeSelectUser = useCallback(() => {
    dispatch({ type: 'SELECT_USER', payload: null });
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
  };

  return {
    users: state.users,
    isLoading: state.isLoading,
    selectedUser: state.selectedUser,
    onSelectUser: handleSelectUser,
    onDeSelectUser: handleDeSelectUser,
    onUpdateUser: handleUpdateUser,
  };
};
