import ClassCard from '../../components/ClassCard';

const ListClasses = ({ classes, selectedClase, handleClaseClick, register }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {classes.map((clase) => (
        <ClassCard
          key={clase.id}
          clase={clase}
          onClick={handleClaseClick}
          isSelected={selectedClase === clase.id}
          showRadio={true}
          register={register}
          showProfessor={true}
        />
      ))}
    </div>
  );
};

export default ListClasses;
