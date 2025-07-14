export const formateClassData = (classData) => {
  return {
    ...classData,
    horaInicio: classData.horaInicio + ':00',
    horaFin: classData.horaFin + ':00',
  };
};
