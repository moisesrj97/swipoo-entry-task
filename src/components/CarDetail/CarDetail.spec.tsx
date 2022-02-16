import React, { render, screen } from '@testing-library/react';
import { CarI } from '../../interfaces/carInterface';
import CarDetail from './CarDetail';

jest.mock('../../utils/deprecatePrice', () => ({
  __esModule: true,
  default: () => [22000, 21900],
}));

const mockedCar: CarI = {
  brand: 'testBrand',
  fuel: 'testFuel',
  model: 'testModel',
  value: '22000',
  cc: 'testCc',
  cv: 'testCv',
  cvf: 'testCvf',
  cylinders: 'testCylinders',
  kw: 'testKw',
  period: 'testPeriod',
};

describe('Given CarDetail component', () => {
  describe('When it receives props', () => {
    test('It should render them', () => {
      render(<CarDetail date={2020} selectedCar={mockedCar} />);
      expect(screen.getByText(/testBrand/)).toBeInTheDocument();
      expect(screen.getByText(/testModel/)).toBeInTheDocument();
      expect(screen.getByText(/testCc/)).toBeInTheDocument();
      expect(screen.getByText('CV: testCv')).toBeInTheDocument();
      expect(screen.getByText(/testCvf/)).toBeInTheDocument();
      expect(screen.getByText(/testCylinders/)).toBeInTheDocument();
      expect(screen.getByText(/testKw/)).toBeInTheDocument();
      expect(screen.getByText(/testPeriod/)).toBeInTheDocument();
      expect(screen.getByText(/22000€/)).toBeInTheDocument();
    });
    test('Ir should render calculated devaluated price', () => {
      render(<CarDetail date={2018} selectedCar={mockedCar} />);
      expect(screen.getByText(/22000€/)).toBeInTheDocument();
      expect(screen.getByText(/21900€/)).toBeInTheDocument();
    });
  });
  describe('When some props change', () => {
    test('It should trigger change info', () => {
      const { rerender } = render(
        <CarDetail date={2018} selectedCar={mockedCar} />
      );
      expect(screen.getByText(/testModel/)).toBeInTheDocument();
      rerender(
        <CarDetail
          date={2018}
          selectedCar={{ ...mockedCar, model: 'testModel2' }}
        />
      );
      expect(screen.getByText(/testModel2/)).toBeInTheDocument();
    });
  });
});
