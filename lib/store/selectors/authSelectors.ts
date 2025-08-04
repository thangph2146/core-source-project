import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Base selectors
export const selectAuth = (state: RootState) => state.auth;

// Derived selectors
export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectError = createSelector(
  [selectAuth],
  (auth) => auth.error
);

export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user?.email
);

export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name
);

export const selectIsEmailVerified = createSelector(
  [selectUser],
  (user) => user?.isEmailVerified
);

// Combined selectors
export const selectAuthState = createSelector(
  [selectAuth],
  (auth) => ({
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
  })
); 