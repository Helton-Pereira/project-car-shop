import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();

    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();

    const motorcycles = await motorcycleODM.findAll();
    const motorcyclesSet = motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return motorcyclesSet;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();

    const motorcycles = await motorcycleODM.findById(id);
    if (motorcycles === undefined) return undefined;
    const motorcycleSet = motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return motorcycleSet;
  }
}

export default MotorcycleService;