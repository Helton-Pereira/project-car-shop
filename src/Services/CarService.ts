import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();

    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();

    const cars = await carODM.findAll();
    const carsSet = cars.map((car) => this.createCarDomain(car));
    return carsSet;
  }

  public async getById(id: string) {
    const carODM = new CarODM();

    const cars = await carODM.findById(id);
    if (cars === undefined) return undefined;
    const carSet = cars.map((car) => this.createCarDomain(car));
    return carSet;
  }
}

export default CarService;
