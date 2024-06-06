module.exports = () => {
  return Intl.DateTimeFormat("en-in").format(Date.now());
};
