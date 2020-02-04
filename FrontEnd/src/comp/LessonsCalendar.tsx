import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import '@fullcalendar/core/main.css'
import '@fullcalendar/timegrid/main.css';

export default class LessonsCalendar extends React.Component {

    Digits2 = (time: number) => {
        return time < 10 ? "0" + time : time
    }

    closeBubble = () => {
        let current = document.getElementById("bubble"),
        body = document.getElementsByTagName("body")[0]
        
        if(current)
            body.removeChild(current)
    }

    componentWillUnmount = () => {
        this.closeBubble()
    }

    render() {
        let self = this

        return (
            <FullCalendar
                plugins={[ googleCalendarPlugin, dayGridPlugin ]}
                events={ { googleCalendarId: 'ckhj7iqj3msae4i4ietm5ip1cg@group.calendar.google.com'} }
                googleCalendarApiKey={'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'}
                defaultView="dayGridMonth"
                fixedWeekCount={false}
                header={false}
                firstDay={1}
                themeSystem={'bootstrap'}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }}
                locale={'it'}
                eventClick={
                    function(info){

                        info.jsEvent.preventDefault();
                        
                        let event = info.event,
                        bubble = document.createElement("div"),
                        x = info.jsEvent.clientX,
                        y = info.jsEvent.clientY

                        bubble.setAttribute('id', "bubble");
                        bubble.setAttribute('class', "event-bubble")

                        bubble.innerHTML = `<div class="bubble-close" id="close-b"><i class="fal fa-times fa-fw"></i></div>
                            <h6 class="event-title"><i class="fad fa-calendar-check fa-fw icon fa-lg"></i> ` + event.title + `</h6>
                            <div class="row px-2 py-1">
                                <div class="col-4 pl-0"><span class="label">Inizio</span></div>
                                <div class="col-8 pl-0"><span class="desc">` + self.Digits2(event.start.getHours()) + `:` + self.Digits2(event.start.getMinutes()) + `</span></div>
                            </div>
                            <div class="row px-2 py-1">
                                <div class="col-4 pl-0"><span class="label">Fine</span></div>
                                <div class="col-8 pl-0"><span class="desc">` + self.Digits2(event.end.getHours()) + `:` + self.Digits2(event.end.getMinutes()) + `</span></div>
                            </div>`

                        if(event.extendedProps.location){
                            bubble.innerHTML = bubble.innerHTML + `<div class="row px-2 py-1">
                                <div class="col-4 pl-0"><span class="label where">Luogo</span></div>
                                <div class="col-8 px-0 where">` + event.extendedProps.location + `</div>
                            </div>`
                        }

                        bubble.style.top = y + "px"
                        bubble.style.left = x + "px"
                    
                        let current = document.getElementById("bubble"),
                        body = document.getElementsByTagName("body")[0],
                        children = bubble.childNodes[0]
                        
                        if(current)
                            body.removeChild(current)

                        body.appendChild(bubble)

                        children.removeEventListener("click", self.closeBubble)
                        children.addEventListener("click", self.closeBubble)

                        let newBubble = document.getElementById("bubble")
                        
                        if((y + newBubble.clientHeight) > window.innerHeight){
                            newBubble.style.top = "auto"
                            newBubble.style.bottom = "10px"
                        }
                        if((x + newBubble.clientWidth) > window.innerWidth){
                            newBubble.style.left = "auto"
                            newBubble.style.right = "10px"
                        }

                    }
                }
            />
        )
    }
  
  }