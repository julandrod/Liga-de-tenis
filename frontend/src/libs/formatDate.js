/**
 * Convert a Date in format Iso to the format "D-M-'Y" (23-10-'23)
 * @param {Date} dateIso Date to format
 * @returns {String} date in the new format
 * 
 * @example
 * formatDate('2021-10-23T00:00:00.000Z');
 */
const formatDate = (dateIso) => {
  const date = new Date(dateIso);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100;

  return `${day}-${month}-'${year}`;
};



export default formatDate;
