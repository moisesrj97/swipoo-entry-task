import React from 'react';
import { CarI } from '../interfaces/carInterface';

interface PropsI {
  selectedCar: CarI;
}

function CarDetail({ selectedCar }: PropsI): JSX.Element {
  return <div>{JSON.stringify(selectedCar)}</div>;
}

export default CarDetail;
