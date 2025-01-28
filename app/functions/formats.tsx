export const formatCNIC = (value: any) => {
  let formattedValue = value.replace(/\D/g, "");

  if (formattedValue.length > 5) {
    formattedValue =
      formattedValue.substring(0, 5) + "-" + formattedValue.substring(5);
  }
  if (formattedValue.length > 13) {
    formattedValue =
      formattedValue.substring(0, 13) + "-" + formattedValue.substring(13);
  }

  return formattedValue;
};

export const formatAmount = (value: any) => {
  let formattedValue = value.replace(/\D/g, "");

  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedValue;
};

export function formatDate(inputDate: any) {
  const [day, month, year] = inputDate.split("-");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1;

  const monthName = monthNames[monthIndex];

  const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;

  return formattedDate;
}

export function formatUpperCase(inputText: any) {
  const upperCaseText = inputText.toUpperCase();

  return upperCaseText;
}

export function formatUperFirst(inputText: any) {
  const words = inputText.split(" ");

  const capitalizedWords = words.map((word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const capitalizedText = capitalizedWords.join(" ");

  return capitalizedText;
}

export function formatNumberToWord(inputNumber: any) {
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
  ];

  if (inputNumber >= 0 && inputNumber <= 20) {
    const word = numberWords[inputNumber];

    return `${word} (${inputNumber})`;
  } else {
    return "Number out of range";
  }
}

export function formatDateToMonthYear(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split("-");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[parseInt(month) - 1];

    return monthName ? `${monthName} ${year}` : `${month}-${year}`; 
  } catch (error) {
    return "Invalid date format. Please use DD-MM-YYYY.";
  }
}

export const numberToWords = (num: number): string => {
  const units: string[] = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens: string[] = [
    "",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens: string[] = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convert = (num: number): string => {
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? " " + units[num % 10] : "")
      );
    if (num < 1000)
      return (
        units[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 !== 0 ? " and " + convert(num % 100) : "")
      );
    if (num < 100000)
      return (
        convert(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 !== 0 ? " " + convert(num % 1000) : "")
      );
    if (num < 10000000)
      return (
        convert(Math.floor(num / 100000)) +
        " Lakh" +
        (num % 100000 !== 0 ? " " + convert(num % 100000) : "")
      );
    if (num < 1000000000)
      return (
        convert(Math.floor(num / 10000000)) +
        " Crore" +
        (num % 10000000 !== 0 ? " " + convert(num % 10000000) : "")
      );
    return (
      convert(Math.floor(num / 1000000000)) +
      " Arab" +
      (num % 1000000000 !== 0 ? " " + convert(num % 1000000000) : "")
    );
  };

  if (num === 0) return "Zero";
  if (num < 0) return "Negative " + convert(-num);
  return convert(num);
};

