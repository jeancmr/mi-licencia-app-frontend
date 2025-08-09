import ClassCard from './ClassCard';

const ClassList = ({
  classes = [],
  selectedClase = null,
  showProfessor = false,
  handleClaseClick = () => {},
  register = () => {},
}) => {
  const noClasesMessage = showProfessor
    ? 'No tiene clases asignadas.'
    : 'No hay clases programadas para hoy.';

  return (
    <div className="grid grid-cols-3 gap-4">
      {classes.length === 0 && (
        <p className="col-span-2 text-center text-gray-400">{noClasesMessage}</p>
      )}

      {classes.map((clase) => (
        <ClassCard
          key={clase.id}
          clase={clase}
          onClick={handleClaseClick}
          isSelected={selectedClase === clase.id}
          showRadio={true}
          register={register}
          showProfessor={showProfessor}
        />
      ))}
    </div>
  );
};

export default ClassList;
