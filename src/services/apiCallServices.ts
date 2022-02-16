import { BRANDS, FUELS } from '../data/constants';
import { CarI } from '../interfaces/carInterface';

export type Brand = typeof BRANDS[number];
export type FuelType = typeof FUELS[number];

const getCars = async (
  brand: Brand,
  date: string,
  fuelType: FuelType
): Promise<CarI[]> =>
  fetch(
    `https://api.swipoo.com/itp/cars/?brand=${brand}&enrollmentDate=${date}&fuel=${fuelType}`
  )
    .then((res) => res.json())
    .then(({ cars }) => cars)
    .catch((e) => {
      throw new Error(e);
    });

export default getCars;
