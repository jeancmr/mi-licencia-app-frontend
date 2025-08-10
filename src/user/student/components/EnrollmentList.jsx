import EnrollmentItem from './EnrollmentItem';

const EnrollmentList = ({ enrollments, onDeleteEnrollment }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto flex-1 pr-2">
      {enrollments.length == 0 ? (
        <p className="col-span-3 text-center text-gray-500">No tienes clases inscritas.</p>
      ) : (
        enrollments.map((enrollment) => (
          <EnrollmentItem
            key={enrollment.id}
            enrollment={enrollment}
            onDeleteEnrollment={onDeleteEnrollment}
          />
        ))
      )}
    </div>
  );
};

export default EnrollmentList;
