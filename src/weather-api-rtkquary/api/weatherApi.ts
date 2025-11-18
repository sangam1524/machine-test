import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Minimal types based on wttr.in JSON format=j1
type WeatherDesc = { value: string };

export type CurrentCondition = {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  weatherDesc: WeatherDesc[];
  winddir16Point: string;
  windspeedKmph: string;
};

export type WeatherResponse = {
  current_condition: CurrentCondition[];
  nearest_area?: unknown[];
  request?: unknown[];
  weather?: unknown[];
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://wttr.in' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, string>({
      query: (city) => `/${encodeURIComponent(city)}?format=j1`,
    }),
  }),
});

export const { useLazyGetWeatherByCityQuery, useGetWeatherByCityQuery } = weatherApi;


