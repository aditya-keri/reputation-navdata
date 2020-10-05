import moment from "moment";

// Below are re-usable functions that are used to format the date based on a given format.
const formatToIndianDate = (date) => {
  return date.format("DD-MM-YYYY");
};

const formatNavDate = (date) => {
  return date.format("DD-MMM-YY");
};

const formatNavMonth = (date) => {
  return date.format("MMM-YY");
};

// Main function that returns an array of objects (nav rows)
export const getNavRows = ({ navData, horizon, investmentPeriod }) => {
  // Get the current date
  let dateEnd = moment();
  // Get the start date based on the horizon.
  let dateStart = moment(dateEnd).subtract(horizon, "year").add(1, "month");

 // Initialise navRows with empty array. We will ultimately add nav row objects to this.
  let navRows = [];

  // Run this loop from the start date till the current month. 
  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    // Set start nav date based on the investment period, end nav date based on current date
    const endNavDate = moment(dateStart);
    const startNavDate = moment(dateStart).subtract(investmentPeriod, "year");

    // Create clones of the above nav dates which will be used for getting the correct nav value.
    let businessEndNavDate = endNavDate.clone(),
      businessStartNavDate = startNavDate.clone();

    // If the nav dates are weekends, change them to the next business day.
    [businessStartNavDate, businessEndNavDate].forEach((date) => {
      if (date.day() === 0 || date.day() === 6) {
        date.add(1, "weeks").startOf("isoWeek");
      }
    });

    // Find nav value for start nav date.
    let startNavValue = navData.find(
      (item) => item.date === formatToIndianDate(businessStartNavDate)
    )?.nav;

    // If the above nav value is not found, it's because the date is a holiday. API response doesn't include dates for holidays as well.
    // Hence, add one day to the date.
    if (!startNavValue) {
      businessStartNavDate.add(1, "days");
      startNavValue = navData.find(
        (item) => item.date === formatToIndianDate(businessStartNavDate)
      )?.nav;
    }

    // Find nav value for start nav date.
    let endNavValue = navData.find(
      (item) => item.date === formatToIndianDate(businessEndNavDate)
    )?.nav;

    // If the above nav value is not found, it's because the date is a holiday. API response doesn't include dates for holidays as well.
    // Hence, add one day to the date.
    if (!endNavValue) {
      businessEndNavDate.add(1, "days");
      endNavValue = navData.find(
        (item) => item.date === formatToIndianDate(businessEndNavDate)
      )?.nav;
    }

    // Calculate returns. If the nav values still don't exist (because they fall out of range), return 0
    const returns = (
      ((endNavValue / startNavValue) ** (1 / horizon) - 1) * 100 || 0
    ).toFixed(2);

    // Push the object containing all the necessary values to the array.
    navRows.push({
      month: formatNavMonth(dateStart),
      startNavDate: formatNavDate(startNavDate),
      endNavDate: formatNavDate(endNavDate),
      businessStartNavDate: formatNavDate(businessStartNavDate),
      businessEndNavDate: formatNavDate(businessEndNavDate),
      startNavValue,
      endNavValue,
      returns,
    });
    dateStart.add(1, "month");
  }

  return navRows;
};
