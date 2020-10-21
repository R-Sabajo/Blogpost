//jshint esversion:6

exports.getDateText = () => {
  const date = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    time: 'hh:mm:ss',
  };

  return date.toLocaleTimeString('en-US', options);
};

exports.getDateNumber = () => {
  const date = new Date();
  return date.toISOString().substring(0, 19);
};

const date = new Date();
const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  time: 'hh:mm:ss',
};

console.log(date.toLocaleTimeString().substring(4,6));

