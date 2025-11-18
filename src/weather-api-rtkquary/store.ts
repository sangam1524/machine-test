import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './api/weatherApi';

export const weatherStore = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type WeatherRootState = ReturnType<typeof weatherStore.getState>;
export type WeatherAppDispatch = typeof weatherStore.dispatch;


