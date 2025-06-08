import Loading from '../shared/Loading';
import ListClasses from '../../pages/student/ListClasses';
import Button from '../shared/Button';
import { ENROLLMENT_MESSAGES } from '../../constants/messages';

const EnrollmentForm = ({
  classes,
  isLoadingClasses,
  selectedClassId,
  onClassSelect,
  onSubmit,
  register
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 pr-2 flex-1 overflow-y-auto relative">
      <label className="block text-gray-300 text-lg mb-4">
        {ENROLLMENT_MESSAGES.LABELS.SELECT_CLASS}
      </label>
      
      {isLoadingClasses ? (
        <Loading />
      ) : (
        <ListClasses
          clases={classes}
          selectedClase={selectedClassId}
          handleClaseClick={onClassSelect}
          register={register}
        />
      )}

      <div className="sticky bottom-0">
        <Button type="submit" className="w-full mt-0">
          {ENROLLMENT_MESSAGES.BUTTONS.REGISTER}
        </Button>
      </div>
    </form>
  );
};

export default EnrollmentForm; 