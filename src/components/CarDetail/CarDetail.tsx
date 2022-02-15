import React, { useEffect, useState } from 'react';
import { CarI } from '../../interfaces/carInterface';
import deprecatePriceByYear from '../../utils/deprecatePrice';

interface PropsI {
  selectedCar: CarI;
  date: number;
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
  const [priceCalculation, setPriceCalculation] = useState<number[]>([]);

  useEffect(() => {
    setPriceCalculation(deprecatePriceByYear(+value, date));
  }, [value, date]);

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
      <p>{`Value: ${value}€`}</p>
      <p>Price calculation: </p>
      {priceCalculation.map((e, i) => (
        <p key={e}>{`${date + i}: ${e}€`}</p>
      ))}
    </div>
  );
}

export default CarDetail;
