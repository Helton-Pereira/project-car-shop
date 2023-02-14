import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
// import Car from '../../../src/Domains/Car';

describe('Should test layer CarService', function () {
  it('Should successfully create a new car in DB', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const outputCar: ICar = {
      id: '63ebddc620b8021b258f5210',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: false,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(outputCar);
  });

  it('should find a car by its id', async function () {
    const outputCar: ICar[] = [{
      id: '63ebddc620b8021b258f5210',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: false,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }];

    sinon.stub(Model, 'find').resolves(outputCar);

    const service = new CarService();
    const result = await service.getById('63ebddc620b8021b258f5210');

    expect(result).to.be.deep.equal(outputCar);
  });

  afterEach(function () {
    sinon.restore();
  });
});