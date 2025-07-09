import { useClasses } from '../../hooks/';
import { useAuth } from '../../../auth/hooks/useAuth';
import { ClassList } from '../../components';

const ListClassesPage = () => {
  const { user } = useAuth();
  const { classes, isLoading } = useClasses('professor', user.user.id);

  if (isLoading) {
    return <div className="flex justify-center items-center">Cargando clases...</div>;
  }

  return <ClassList classes={classes} showProfessor={true} />;
};

export default ListClassesPage;
