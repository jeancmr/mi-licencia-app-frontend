import { useState } from 'react';
import { useNavigate } from 'react-router';
import { EnrollmentForm, EnrollmentList } from '../components';
import { useEnrollments } from '../hooks';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useClasses, useClassSelection } from '../../../hooks';
import { BackButton, Button } from '../../../components';

const EnrollmentPage = () => {
  const { user } = useAuth();
  const [showEnrolledClasses, setShowEnrolledClasses] = useState(false);
  const navigate = useNavigate();

  const { enrollments, createEnrollment, removeEnrollment } = useEnrollments(user?.user?.id);
  const { classes, isLoading: isLoadingClasses, fetchClasses } = useClasses();
  const { selectedClassId, selectClass, register, createSubmitHandler } = useClassSelection();

  const handleEnrollmentSubmit = async (formData) => {
    const enrollmentData = {
      estudianteId: user.user.id,
      claseId: formData.claseId,
    };

    const success = await createEnrollment(enrollmentData);
    if (success) {
      fetchClasses();
    }
  };

  const handleDeleteEnrollment = async (enrollmentId) => {
    const success = await removeEnrollment(enrollmentId);
    if (success) {
      fetchClasses();
    }
  };

  const onSubmit = createSubmitHandler(handleEnrollmentSubmit);

  return (
    <>
      <header>
        <BackButton onGoBack={() => navigate(-1)} style="absolute" />
        <h1 className="text-3xl font-bold mb-6 mt-2">
          {showEnrolledClasses ? 'Clases inscritas' : 'Registrar clase'}
        </h1>
      </header>

      {showEnrolledClasses ? (
        <EnrollmentList enrollments={enrollments} onDeleteEnrollment={handleDeleteEnrollment} />
      ) : (
        <EnrollmentForm
          classes={classes}
          isLoadingClasses={isLoadingClasses}
          selectedClassId={selectedClassId}
          onClassSelect={selectClass}
          onSubmit={onSubmit}
          register={register}
        />
      )}

      <Button className="mt-6" onClick={() => setShowEnrolledClasses(!showEnrolledClasses)}>
        {showEnrolledClasses ? 'Ocultar clases' : 'Ver clases inscritas'}
      </Button>
    </>
  );
};
export default EnrollmentPage;
