export const rolePermissions = {
  estudiante: [
    {
      id: 1,
      name: 'enrollment',
      description: 'Ver inscripciones',
    },
  ],
  profesor: [
    {
      id: 1,
      name: 'manage_classes',
      description: 'Gestionar clases',
    },
    {
      id: 2,
      name: 'view_attendance',
      description: 'Ver asistencia',
    },
  ],
  admin: [
    {
      id: 1,
      name: 'manage_users',
      description: 'Gestionar usuarios',
    },
    {
      id: 2,
      name: 'manage_all',
      description: 'Gestionar todo',
    },
    {
      id: 3,
      name: 'manage_classes',
      description: 'Gestionar clases',
    },
    {
      id: 4,
      name: 'view_attendance',
      description: 'Ver asistencia',
    },
  ],
};
