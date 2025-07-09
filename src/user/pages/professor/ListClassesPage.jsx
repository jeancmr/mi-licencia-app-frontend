import { useClasses } from '../../hooks/useClasses';
import { useAuth } from '../../../context/AuthContext';
import ListClasses from '../../components/ListClasses';

const ListClassesPage = () => {
  const { user } = useAuth();
  const { classes, isLoading } = useClasses('professor', user.user.id);

  if (isLoading) {
    return <div className="flex justify-center items-center">Cargando clases...</div>;
  }

  return <ListClasses classes={classes} showProfessor={true} />;
};

export default ListClassesPage;
