import React, { ChangeEvent, useEffect, useState } from 'react';
import { BRANDS, FUELS } from '../../data/constants';
import { CarI } from '../../interfaces/carInterface';
import getCars, { Brand, FuelType } from '../../services/apiCallServices';
import CarDetail from '../CarDetail/CarDetail';

interface FormStateI {
  brand: Brand;
  date: string;
  fuelType: FuelType;
}

function Form(): JSX.Element {
  const [formData, setFormData] = useState<FormStateI>({
    brand: '',
    date: '',
    fuelType: '',
  });

  const [fetchedCars, setFetchedCars] = useState<CarI[]>([]);

  const [selectedCar, setSelectedCar] = useState<CarI>();

  const [isAnyError, setIsAnyError] = useState<string>('');

  useEffect(() => {
    if (Object.values(formData).every((value) => value !== '')) {
      getCars(formData.brand, formData.date, formData.fuelType)
        .then((cars) => {
          if (cars.length === 0) {
            setIsAnyError(
              "Sorry, we couldn't find any car matching your criteria."
            );
            setFetchedCars([]);
          } else {
            setIsAnyError('');
            setFetchedCars(cars);
          }
        })
        .catch((e) => {
          setIsAnyError('Sorry, there was an error in the server.');
        });
    }
  }, [formData]);

  useEffect(() => {
    setSelectedCar(undefined);
  }, [fetchedCars]);

  const handleInputChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleCarSelect = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    setSelectedCar(fetchedCars.find((e) => e.model === target.value));
  };

  return (
    <>
      <form className="flex flex-col w-full items-start mt-3 mb-2">
        <label htmlFor="brand" className="font-bold flex gap-2 mb-2 flex-wrap">
          Brand:
          <select
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="bg-transparent border border-gray-400 rounded-md pl-2"
          >
            {BRANDS.filter((e) => e !== '').map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        {formData.brand !== '' && (
          <label htmlFor="date" className="font-bold flex gap-2 mb-2 flex-wrap">
            Matriculation date:
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-transparent border border-gray-400 rounded-md pl-2"
            />
          </label>
        )}
        {formData.date !== '' && (
          <label htmlFor="fuel-type" className="font-bold flex gap-2 mb-2">
            Fuel type:
            <select
              name="fuelType"
              id="fuel-type"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="bg-transparent border border-gray-400 rounded-md pl-2"
            >
              {FUELS.filter((e) => e !== '').map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>
        )}
        {isAnyError !== '' && (
          <p className="text-xs text-red-500 pt-2">{isAnyError}</p>
        )}
        {fetchedCars.length > 0 && (
          <label
            htmlFor="fetched-cars"
            className="font-bold flex flex-col mb-2"
          >
            Model:
            <select
              name="fetched-cars"
              id="fetched-cars"
              value={selectedCar?.model}
              onChange={handleCarSelect}
              className="bg-transparent border border-gray-400 rounded-md pl-2 w-full"
            >
              {fetchedCars.map((e) => (
                <option key={e.model} value={e.model}>
                  {e.model}
                </option>
              ))}
            </select>
          </label>
        )}
      </form>
      {selectedCar ? (
        <CarDetail
          selectedCar={selectedCar}
          date={+formData.date.split('-')[0]}
        />
      ) : (
        <p className="text-gray-500 mt-4 text-center w-full">
          Please, complete the form above
        </p>
      )}
    </>
  );
}

export default Form;
