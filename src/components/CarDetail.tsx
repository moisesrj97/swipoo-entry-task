import React, { useState } from 'react';
import { CarI } from '../interfaces/carInterface';

interface PropsI {
  selectedCar: CarI;
  date: string;
}

function CarDetail({
  selectedCar: {
    brand,
    cc,
    cv,
    cvf,
    cylinders,
    fuel,
    kw,
    model,
    period,
    value,
  },
  date,
}: PropsI): JSX.Element {
  return (
    <div>
      <h3>{`${model} (${brand})`}</h3>
      <p>{`CC: ${cc}`}</p>
      <p>{`CV: ${cv}`}</p>
      <p>{`CVF: ${cvf}`}</p>
      <p>{`Cylinders: ${cylinders}`}</p>
      <p>{`Fuel: ${fuel}`}</p>
      <p>{`KW: ${kw}`}</p>
      <p>{`Period: ${period}`}</p>
      <p>{`Value: ${value}`}</p>
    </div>
  );
}

export default CarDetail;
