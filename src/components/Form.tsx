import React, { ChangeEvent, useEffect, useState } from 'react';
import { BRANDS, FUELS } from '../data/constants';
import { CarI } from '../interfaces/carInterface';
import getCars, { Brand, FuelType } from '../services/apiCallServices';
import CarDetail from './CarDetail';

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

  useEffect(() => {
    if (Object.values(formData).every((value) => value !== '')) {
      getCars(formData.brand, formData.date, formData.fuelType).then((cars) => {
        setFetchedCars(cars);
      });
    }
  }, [formData]);

  const handleInputChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleCarSelect = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    setSelectedCar(JSON.parse(target.value));
  };

  return (
    <form>
      <label htmlFor="brand">
        Brand:
        <select
          name="brand"
          id="brand"
          value={formData.brand}
          onChange={handleInputChange}
        >
          {BRANDS.filter((e) => e !== '').map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </label>
      {formData.brand !== '' && (
        <label htmlFor="date">
          Matriculation date:
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
      )}
      {formData.date !== '' && (
        <label htmlFor="fuel-type">
          Fuel type:
          <select
            name="fuelType"
            id="fuel-type"
            value={formData.fuelType}
            onChange={handleInputChange}
          >
            {FUELS.filter((e) => e !== '').map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
      )}
      {fetchedCars.length > 0 && (
        <label htmlFor="fetched-cars">
          Model:
          <select
            name="fetched-cars"
            id="fetched-cars"
            value={selectedCar?.model}
            onChange={handleCarSelect}
          >
            {fetchedCars.map((e) => (
              <option key={e.model} value={JSON.stringify(e)}>
                {e.model}
              </option>
            ))}
          </select>
        </label>
      )}
      {selectedCar ? <CarDetail /> : <p>Please, complete the form above</p>}
    </form>
  );
}

export default Form;
