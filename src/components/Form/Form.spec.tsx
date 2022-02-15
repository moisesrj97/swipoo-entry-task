import React, { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

const mockedResponseFromApi = [
  {
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
  },
  {
    brand: 'testBrand',
    fuel: 'testFuel',
    model: 'testModel2',
    value: '22000',
    cc: 'testCc',
    cv: 'testCv',
    cvf: 'testCvf',
    cylinders: 'testCylinders',
    kw: 'testKw',
    period: 'testPeriod',
  },
  {
    brand: 'testBrand',
    fuel: 'testFuel',
    model: 'testModel3',
    value: '22000',
    cc: 'testCc',
    cv: 'testCv',
    cvf: 'testCvf',
    cylinders: 'testCylinders',
    kw: 'testKw',
    period: 'testPeriod',
  },
];

jest.mock('../../services/apiCallServices.ts', () => ({
  __esModule: true,
  default: () => Promise.resolve(mockedResponseFromApi),
}));

describe('Given Form component', () => {
  describe('When first input is selected', () => {
    test('It should render second input', () => {
      render(<Form />);

      expect(
        screen.queryByLabelText('Matriculation date:')
      ).not.toBeInTheDocument();

      userEvent.selectOptions(screen.getByLabelText('Brand:'), 'Audi');

      expect(screen.getByLabelText('Matriculation date:')).toBeInTheDocument();
    });
  });
  describe('When first and second input are selected', () => {
    test('It should render third input', () => {
      render(<Form />);

      expect(screen.queryByLabelText('Fuel type:')).not.toBeInTheDocument();

      userEvent.selectOptions(screen.getByLabelText('Brand:'), 'Audi');
      fireEvent.change(screen.getByLabelText('Matriculation date:'), {
        target: { value: '2021-01-01' },
      });

      expect(screen.queryByLabelText('Fuel type:')).toBeInTheDocument();
    });
  });
  describe('When all inputs are selected', () => {
    test('It should render model input', async () => {
      render(<Form />);

      expect(screen.queryByLabelText('Fuel type:')).not.toBeInTheDocument();

      userEvent.selectOptions(screen.getByLabelText('Brand:'), 'Audi');
      fireEvent.change(screen.getByLabelText('Matriculation date:'), {
        target: { value: '2021-01-01' },
      });
      userEvent.selectOptions(screen.getByLabelText('Fuel type:'), 'D');
      expect(await screen.findByLabelText('Model:')).toBeInTheDocument();
      expect(await screen.findByText('testModel')).toBeInTheDocument();
      expect(await screen.findByText('testModel2')).toBeInTheDocument();
      expect(await screen.findByText('testModel3')).toBeInTheDocument();
    });
  });
  describe('When model input is selected', () => {
    test('It should render CarDetail component with data', async () => {
      render(<Form />);

      expect(screen.queryByLabelText('Fuel type:')).not.toBeInTheDocument();

      userEvent.selectOptions(screen.getByLabelText('Brand:'), 'Audi');
      fireEvent.change(screen.getByLabelText('Matriculation date:'), {
        target: { value: '2021-01-01' },
      });
      userEvent.selectOptions(screen.getByLabelText('Fuel type:'), 'D');
      expect(await screen.findByLabelText('Model:')).toBeInTheDocument();

      userEvent.selectOptions(
        await screen.findByLabelText('Model:'),
        'testModel2'
      );
      expect(
        await screen.findByText('testModel2 (testBrand)')
      ).toBeInTheDocument();
    });
  });
});
