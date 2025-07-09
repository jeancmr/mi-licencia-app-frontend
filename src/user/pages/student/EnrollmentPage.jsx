import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useClassSelection, useClasses, useEnrollments } from '../../hooks/';
import { ENROLLMENT_MESSAGES } from '../../constants/messages';
import { EnrollmentForm, EnrollmentList, Button } from '../../components/';

const EnrollmentPage = () => {
  const { user } = useAuth();
  const [showEnrolledClasses, setShowEnrolledClasses] = useState(false);

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
      <h1 className="text-3xl font-bold mb-6">
        {showEnrolledClasses
          ? ENROLLMENT_MESSAGES.TITLES.ENROLLED_CLASSES
          : ENROLLMENT_MESSAGES.TITLES.REGISTER_CLASS}
      </h1>

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
        {showEnrolledClasses
          ? ENROLLMENT_MESSAGES.BUTTONS.HIDE_CLASSES
          : ENROLLMENT_MESSAGES.BUTTONS.SHOW_CLASSES}
      </Button>
    </>
  );
};
export default EnrollmentPage;
