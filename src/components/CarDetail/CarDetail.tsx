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
    <div className="w-full border-t border-gray-300 dark:border-gray-600 pt-3 dark:text-white">
      <h3 className="text-xl font-bold underline decoration-blue-500 underline-offset-4 mb-2">{`${model} - ${brand}`}</h3>
      <h4 className="text-gray-600 dark:text-gray-300">
        Technical data sheet:
      </h4>
      <ul className="list-disc list-inside marker:text-blue-500">
        <li className="py-1">{`CC: ${cc}`}</li>
        <li className="py-1">{`CV: ${cv}`}</li>
        <li className="py-1">{`CVF: ${cvf}`}</li>
        <li className="py-1">{`Cylinders: ${cylinders}`}</li>
        <li className="py-1">{`Fuel: ${fuel}`}</li>
        <li className="py-1">{`KW: ${kw}`}</li>
        <li className="py-1">{`Period: ${period}`}</li>
      </ul>
      <div>
        <h4 className="text-gray-600 dark:text-gray-300 mt-2 mb-2">
          Market value of the vehicle
        </h4>
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-around bg-blue-500 text-white rounded-t-md">
            <h5>Year</h5>
            <h5>Price (€)</h5>
          </div>
          {priceCalculation.map((e, i) => (
            <div
              key={e}
              className={
                i === priceCalculation.length - 1
                  ? 'border border-blue-500 flex w-full justify-around  rounded-b-md'
                  : 'border border-blue-500 flex w-full justify-around '
              }
            >
              <p>{date + i}</p>
              <p>{`${e}€`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
