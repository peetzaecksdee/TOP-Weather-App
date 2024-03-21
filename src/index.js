import { requestCoordinate, requestCurrentWeather } from './APIController';

requestCoordinate("England").then((res1) => {
  requestCurrentWeather(res1.lat, res1.lon, 'imperial').then(res => {
    console.log(res);
  });
})