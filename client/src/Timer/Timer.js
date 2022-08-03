export function calculateTimer(gap) {
    let timer ={
      hr:"00", min:"00" , sec: "00"
    } 
    if(gap > 0){
      
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let hours = Math.floor((gap % day) / hour)
      let minutes = Math.floor((gap % hour) / minute)
      let secs = Math.floor((gap % minute) / 1000)
      timer.hr = hours < 10 ? "0" + hours : "" + hours
      timer.min = minutes < 10 ? "0" + minutes : "" + minutes
      timer.sec = secs < 10 ? "0" + secs : "" + secs
    
    }
    return timer
  }
