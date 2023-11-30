import { SEEDERS_TO_RUN } from '@config';
import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
  projectFactory,
  taskFactory,
  userFactory,
  usersProjectsFactory,
} from '../factories';
import {
  CountrySeeder,
  ProjectSeeder,
  TaskSeeder,
  UserSeeder,
  UsersProjectsSeeder,
} from './';

type SeederKey = 'user' | 'project' | 'task' | 'usersProjects' | 'country';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const seedersToRun: SeederKey[] = SEEDERS_TO_RUN
      ? (SEEDERS_TO_RUN.split(',') as SeederKey[])
      : [];

    // ? Mapa de todos los seeders disponibles
    const availableSeeders: Record<SeederKey, Function> = {
      user: UserSeeder,
      project: ProjectSeeder,
      task: TaskSeeder,
      usersProjects: UsersProjectsSeeder,
      country: CountrySeeder,
      // ? Agrega otros seeders aquí si los tienes
    };

    // ? Determina qué seeders ejecutar
    const seeds =
      seedersToRun.length > 0
        ? seedersToRun.map((seederName) => availableSeeders[seederName])
        : Object.values(availableSeeders);

    await runSeeders(dataSource, {
      seeds: seeds as any[],
      factories: [
        userFactory,
        projectFactory,
        taskFactory,
        usersProjectsFactory,
      ],
    });
  }
}
