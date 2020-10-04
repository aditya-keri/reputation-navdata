import moment from "moment";

const formatToIndianDate = (date) => {
  return date.format("DD-MM-YYYY");
};

const formatNavDate = (date) => {
  return date.format("DD-MMM-YY");
};

const formatNavMonth = (date) => {
  return date.format("MMM-YY");
};

export const getNavRows = ({ navData, horizon, investmentPeriod }) => {
  let dateEnd = moment();
  let dateStart = moment(dateEnd).subtract(horizon, "year").add(1, "month");

  let navRows = [];

  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    const endNavDate = moment(dateStart);
    const startNavDate = moment(dateStart).subtract(investmentPeriod, "year");

    let businessEndNavDate = endNavDate.clone(),
      businessStartNavDate = startNavDate.clone();

    [businessStartNavDate, businessEndNavDate].forEach((date) => {
      if (date.day() === 0 || date.day() === 6) {
        date.add(1, "weeks").startOf("isoWeek");
      }
    });

    let startNavValue = navData.find(
      (item) => item.date === formatToIndianDate(businessStartNavDate)
    )?.nav;

    if (!startNavValue) {
      businessStartNavDate.add(1, "days");
      startNavValue = navData.find(
        (item) => item.date === formatToIndianDate(businessStartNavDate)
      )?.nav;
    }

    let endNavValue = navData.find(
      (item) => item.date === formatToIndianDate(businessEndNavDate)
    )?.nav;

    if (!endNavValue) {
      businessEndNavDate.add(1, "days");
      endNavValue = navData.find(
        (item) => item.date === formatToIndianDate(businessEndNavDate)
      )?.nav;
    }

    const returns = (
      ((endNavValue / startNavValue) ** (1 / horizon) - 1) * 100 || 0
    ).toFixed(2);

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
