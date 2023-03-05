function capitalize(words) {
  const seperatedWord = words.toLowerCase().split(" ");
  for (let i = 0; i < seperatedWord.length; i++) {
    seperatedWord[i] =
      seperatedWord[i].charAt(0).toUpperCase() + seperatedWord[i].substring(1);
  }
  return seperatedWord.join(" ");
}

function weekDay(num) {
  let day;
  switch (num) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thrusday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "This is not a week day";
  }
  return day;
}

function getMonth(num) {
  let month;
  switch (num) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "This month does not exist";
  }
  return month;
}

function formatTime(unix, timeFormat = "full") {
  const todayDate = new Date(unix * 1000);
  const hours = todayDate.getHours();
  let time;
  if (hours >= 12) {
    time = "pm";
  } else {
    time = "am";
  }
  const minutes = todayDate.getMinutes();

  if (timeFormat === "hour") {
    return `${hours} ${time}`;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${time}`;
}

function formatDate(unix, dateFormat = "full") {
  const todayDate = new Date(unix * 1000);

  const dayNum = todayDate.getDay();
  const day = weekDay(dayNum);
  if (dateFormat === "day") {
    return day;
  }
  const monthNum = todayDate.getMonth();
  const month = getMonth(monthNum);
  const date = todayDate.getDate();

  let suffix;
  if (date === 1) {
    suffix = "st";
  } else if (date === 2) {
    suffix = "nd";
  } else if (date === 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  const formatDate = `${day}, ${date}${suffix} ${month}`;
  return formatDate;
}

function renderWeatherIcon(code) {
  if (code === "01d") {
    return "../src/svg/currentIcon/clear-day-sky.svg";
  } else if (code === "01n") {
    return "../src/svg/currentIcon/clear-night-sky.svg";
  } else if (code === "02d") {
    return "../src/svg/currentIcon/cloudy-day.svg";
  } else if (code === "02n") {
    return "../src/svg/currentIcon/cloudy-night.svg";
  } else if (code === "03d" || code === "03n") {
    return "../src/svg/currentIcon/cloud.svg";
  } else if (code === "04d" || code === "04n") {
    return "../src/svg/currentIcon/clouds.svg";
  } else if (code === "09d" || code === "09n") {
    return "../src/svg/currentIcon/shower-rain.svg";
  } else if (code === "10d") {
    return "../src/svg/currentIcon/day-rain.svg";
  } else if (code === "10n") {
    return "../src/svg/currentIcon/night-rain.svg";
  } else if (code === "11d" || code === "11n") {
    return "../src/svg/currentIcon/thunderstorm.svg";
  } else if (code === "13d" || code === "13n") {
    return "../src/svg/currentIcon/snow.svg";
  } else if (code === "50d" || code === "50n") {
    return "../src/svg/currentIcon/mist.svg";
  } else {
    return "../src/svg/currentIcon/no-svg.svg";
  }
}

export { capitalize, formatDate, formatTime, renderWeatherIcon };
