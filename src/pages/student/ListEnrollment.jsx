import EnrollmentItem from "./EnrollmentItem";

const ListEnrollment = ({enrollments}) => {

    return (
        <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 pr-2">
              {enrollments.map((enrollment) => (
               <EnrollmentItem key={enrollment.id} enrollment={enrollment} />
              ))}
            </div>
    )
}

export default ListEnrollment;