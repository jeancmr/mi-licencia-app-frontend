import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/hooks/useAuth';
import { BackButton, ClassList } from '../../../components';
import { useClasses } from '../../../hooks';

const ListClassesPage = () => {
  const { user } = useAuth();
  const { classes, isLoading } = useClasses('professor', user.user.id);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center items-center">Cargando clases...</div>;
  }

  return (
    <div className="">
      <BackButton onGoBack={() => navigate(-1)} />

      <h1 className="text-3xl font-bold mb-6 mt-2">Lista de clases</h1>
      <ClassList classes={classes} showProfessor={true} />
    </div>
  );
};

export default ListClassesPage;
