
/* eslint-disable react/prop-types */
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import "../css/forecast.css";


const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];



export default function Forecast ({ data }) {
  

    let currentDay = null;
    const today = new Date();
    const todaynum = today.getDate();
    

    const dayInAWeek = new Date().getDay();
    const forecastDays = WeekDays.slice(dayInAWeek, WeekDays.length).concat(WeekDays.slice(0, dayInAWeek));
    console.log(forecastDays)
    let currentIndexDay = 0 ;
  

    return(
        <>
        <label>Daily</label>
        <Accordion>
      {data.list.map((item, i) => {
        const itemDay = item.dt_txt.slice(8, 10);
        const indexDay = currentIndexDay;
        

    
        const isNewDay = itemDay !== currentDay && Number(itemDay) > todaynum ;
        


        if(isNewDay){
          
          currentDay = itemDay;
          currentIndexDay +=1

          return(
            <AccordionItem header={
              <div className="daily-item">
                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <label className="day">{itemDay}, {forecastDays[indexDay]}</label>
                    <label className="description">{item.weather[0].description}</label>
                    <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                  </div>
          } key={i}>
            <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
          </AccordionItem>
          )
        }else{
          return null;
        }
      }
        
      )}
    </Accordion>
       
        </>
    )
}