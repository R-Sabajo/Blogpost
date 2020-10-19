//jshint esversion:6

exports.getDateText = () => {
  const date = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    time: 'numeric',
  };

  return date.toLocaleTimeString('en-US', options);
};

exports.getDateNumber = () => {
  const date = new Date();
  return date.toISOString().substring(0, 19);
};
