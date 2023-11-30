import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Specialty } from '../src/lib/entities/specialty.entity';

export default class SpecialtySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const specialtyRepository = dataSource.getRepository(Specialty);

    const specialties = [
      // Development
      { name: 'Ingeniería de Software' },
      { name: 'Desarrollo Web' },
      { name: 'Desarrollo de Aplicaciones Móviles' },
      { name: 'Ingeniería de Sistemas' },
      { name: 'Ciencia de Datos' },
      { name: 'Desarrollo de Videojuegos' },
      { name: 'Desarrollo Backend' },
      { name: 'Desarrollo Frontend' },

      // Design
      { name: 'Diseño Gráfico' },
      { name: 'Diseño de Interfaz de Usuario' },
      { name: 'Diseño de Experiencia de Usuario' },
      { name: 'Diseño Industrial' },
      { name: 'Diseño de Moda' },
      { name: 'Diseño de Interiores' },

      // Marketing
      { name: 'Marketing Digital' },
      { name: 'SEO/SEM' },
      { name: 'Marketing de Contenidos' },
      { name: 'Social Media Marketing' },
      { name: 'Marketing de Producto' },
      { name: 'Investigación de Mercados' },

      // Sales
      { name: 'Ventas Directas' },
      { name: 'Gestión de Ventas' },
      { name: 'Desarrollo de Negocios' },
      { name: 'Estrategia de Ventas' },

      // Human Resources
      { name: 'Gestión de Recursos Humanos' },
      { name: 'Desarrollo Organizacional' },
      { name: 'Reclutamiento y Selección' },
      { name: 'Relaciones Laborales' },

      // Finance
      { name: 'Contabilidad' },
      { name: 'Finanzas Corporativas' },
      { name: 'Auditoría' },
      { name: 'Análisis Financiero' },

      // Customer Service
      { name: 'Atención al Cliente' },
      { name: 'Gestión de Clientes' },
      { name: 'Soporte Técnico' },

      // Research and Development
      { name: 'Investigación y Desarrollo' },
      { name: 'Gestión de la Innovación' },
      { name: 'Desarrollo de Producto' },

      // IT Support
      { name: 'Soporte de IT' },
      { name: 'Administración de Redes' },
      { name: 'Seguridad Informática' },

      // Legal
      { name: 'Derecho Corporativo' },
      { name: 'Derecho de Propiedad Intelectual' },
      { name: 'Derecho Laboral' },
      { name: 'Derecho Fiscal' },

      // Public Relations
      { name: 'Relaciones Públicas' },
      { name: 'Gestión de Comunicaciones' },
      { name: 'Gestión de Crisis' },

      // Operations
      { name: 'Gestión de Operaciones' },
      { name: 'Logística' },
      { name: 'Cadena de Suministro' },
    ];

    for (const specialtyName of specialties) {
      const specialty = specialtyRepository.create(specialtyName);
      await specialtyRepository.save(specialty);
    }
  }
}
