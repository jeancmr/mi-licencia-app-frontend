export const filterTodayClasses = (classes) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayDate = `${month}/${day}/${year}`;

  return classes.filter((clase) => clase.fecha === todayDate);
};
