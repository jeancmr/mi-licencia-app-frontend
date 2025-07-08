import { useClasses } from '../../hooks/useClasses';
import ClassCard from '../../components/ClassCard';
import { useAuth } from '../../../context/AuthContext';

const ListClasses = () => {
  const { user } = useAuth();
  const { classes, isLoading } = useClasses('professor', user.user.id);

  if (isLoading) {
    return <div className="flex justify-center items-center">Cargando clases...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {classes.length === 0 && (
        <p className="col-span-2 text-center text-gray-400">No tiene clases asignadas.</p>
      )}

      {classes.map((clase) => (
        <ClassCard key={clase.id} clase={clase} />
      ))}
    </div>
  );
};

export default ListClasses;
