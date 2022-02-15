import { BRANDS, FUELS } from '../data/constants';
import { CarI } from '../interfaces/carInterface';

type Brand = typeof BRANDS[number];
type FuelType = typeof FUELS[number];

const getCars = async (
  brand: Brand,
  date: string,
  fuelType: FuelType
): Promise<CarI[]> => {
  const res = await fetch(
    `https://api.swipoo.com/itp/cars/?brand=${brand}&enrollmentDate=${date}&fuel=${fuelType}`
  );
  const { cars } = await res.json();
  return cars;
};

export default getCars;
