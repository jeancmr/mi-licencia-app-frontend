export const rolePermissions = {
  estudiante: [
    {
      id: 1,
      name: 'enrollment',
      description: 'Inscripciones',
    },
  ],
  profesor: [
    {
      id: 1,
      name: 'assigned_classes',
      description: 'Mis Clases',
    },
    {
      id: 2,
      name: 'attendance',
      description: 'Tomar asistencia',
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
      name: 'manage_classes',
      description: 'Gestionar clases',
    },
  ],
};
