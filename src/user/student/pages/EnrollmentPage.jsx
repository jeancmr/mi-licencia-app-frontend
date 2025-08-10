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

  const { enrollments, createEnrollment, removeEnrollment } = useEnrollments(user?.id);
  const { classes, isLoading: isLoadingClasses, fetchClasses } = useClasses();
  const { selectedClassId, selectClass, register, createSubmitHandler } = useClassSelection();

  const handleEnrollmentSubmit = async (formData) => {
    const enrollmentData = {
      estudianteId: user.id,
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">
            {showEnrolledClasses ? 'Clases inscritas' : 'Registrar clase'}
          </h1>
          <Button onClick={() => setShowEnrolledClasses(!showEnrolledClasses)}>
            {showEnrolledClasses ? 'Ocultar clases' : 'Ver clases inscritas'}
          </Button>
        </div>
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
    </>
  );
};
export default EnrollmentPage;
