export function calculateTimer(gap) {
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let hours = Math.floor((gap % day) / hour)
    let minutes = Math.floor((gap % hour) / minute)
    let secs = Math.floor((gap % minute) / 1000)
    hours = hours < 10 ? "0" + hours : "" + hours
    minutes = minutes < 10 ? "0" + minutes : "" + minutes
    secs = secs < 10 ? "0" + secs : "" + secs
    return {
      hr: hours, min: minutes, sec: secs
    }
  }
