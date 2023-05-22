export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const weekDay = weekDays[newDate.getDay()];
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();

  return {
    day: `${weekDay}`,
    date: `${day}/0${month}`,
    hour: `${hour}:${minutes}`,
  };
};
