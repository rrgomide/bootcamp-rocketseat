function leftPad(value, char = '0', count = 2) {
  const currentSize = value.toString().length;
  const length = count - currentSize;
  const fill =
    Array.from({ length })
      .map(item => char)
      .join('') + value;

  return fill;
}

function newFormattedDate() {
  const date = new Date();
  const day = leftPad(date.getDate());
  const month = leftPad(date.getMonth() + 1);
  const year = leftPad(date.getFullYear(), '0', 4);
  const hour = leftPad(date.getHours());
  const minute = leftPad(date.getMinutes());
  const second = leftPad(date.getSeconds());
  const milisecond = leftPad(date.getMilliseconds(), '0', 3);

  return (
    `${day}/${month}/${year} - ` + `${hour}:${minute}:${second}.${milisecond}`
  );
}

module.exports = { newFormattedDate };
