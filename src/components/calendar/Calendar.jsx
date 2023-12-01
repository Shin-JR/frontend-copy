import { differenceInDays, endOfMonth, startOfMonth, format, sub, add, setDate, isAfter } from 'date-fns'
import './Calendar.css' 
import Cell from './Cell'

// const daysOfWeek = [
//   "Domingo",
//   "Lunes",
//   "Martes",
//   "Miércoles",
//   "Jueves",
//   "Viernes",
//   "Sábado"
// ]

const daysOfWeek = [
  "Dom",
  "Lun",
  "Mar",
  "Mie",
  "Jue",
  "Vie",
  "Sáb"
]

const meses_traduccion = (mes) => {
  switch (mes) {
    case "January":
      return "Enero"
    case "February":
      return "Febrero"
    case "March":
      return "Marzo";
    case "April":
      return "Abril"
    case "May":
      return "Mayo"
    case "June":
      return "Junio";
    case "July":
      return "Julio"
    case "August":
      return "Agosto"
    case "September":
      return "Septiembre";
    case "October":
      return "Octubre"
    case "November":
      return "Noviembre"
    case "December":
      return "Diciembre";  
  
    default:
      mes
  }
}



export default function Calendar ({ value = new Date(), onChange}) {

  const startDate = startOfMonth(value, {weekStartsOn: 1});
  const endDate = endOfMonth(value, {weekStartsOn: 1});
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay(); //revisar
  const sufixDays = 6 - endDate.getDay();

  const handleClickDate = (index) => {
    const date = setDate(value, index);
    onChange && onChange(date);
  }

  const prevMonth = () => {
    if (isAfter(endOfMonth(sub(value, { months: 1 })), startOfMonth(new Date()))) {
      onChange(sub(value, { months: 1 }));
    }
  }
  const nextMonth = () => onChange(add(value, { months: 1 }));

  return (
    <div className="main-div-calendar">
      <div className="main-grid-calendar">
        <Cell onClick={prevMonth} className='prev-month'>{"<<"}</Cell>
        <Cell className='month-and-year'>{meses_traduccion(format(value, "LLLL")) + " " +format(value, "yyyy")}</Cell>
        <Cell onClick={nextMonth} className='next-month'>{">>"}</Cell>

        { daysOfWeek.map((day, index) => (
          <Cell className="day-nombre" key={index}> {day} </Cell>
        )) }

        { Array.from({length: prefixDays}).map((_, index) => {
          return <Cell className="days_out" key={index}/>
        } ) }

        { Array.from({length: numDays}).map((_, index) => {
          const date = index + 1;
          return <Cell onClick={() => handleClickDate(date)} className="days" key={index}> {date} </Cell>;
        }) }

        { Array.from({length: sufixDays}).map((_, index) => {
          return <Cell className='days_out' key={index}></Cell>
        }) }
        
      </div>
    </div>
    
  )
}