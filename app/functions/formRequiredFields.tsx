export function redBorder(
  field: any,
  fieldEmpty: boolean,
  printClicked: boolean
) {
  if (fieldEmpty && printClicked) {
    if (field?.trim() === "") {
      return "border-red-400";
    } else {
      return "border-color";
    }
  } else {
    return "border-color";
  }
}
// Function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

export function redBorderEmail(
  field: any,
  fieldEmpty: boolean,
  printClicked: boolean
) {
  if (fieldEmpty && printClicked) {
    if (typeof field === "string" && field?.trim() === "") {
      return "border-red-400";
    } else if (typeof field === "string" && !isValidEmail(field)) {
      return "border-red-400";
    } else {
      return "border-color";
    }
  } else {
    return "border-color";
  }
}

export function redColor(
  field: any,
  fieldEmpty: boolean,
  printClicked: boolean
) {
  // if (fieldEmpty && printClicked) {
  //   if (field?.trim() === "") {
  return "text-red-500";
  //   } else {
  //     return "text-black";
  //   }
  // } else {
  //   return "text-black";
  // }
}

export function hasEmptyField(
  obj: any,
  setPrintClicked: any,
  setFieldEmpty: any,
  setShowPrint: any
) {
  setPrintClicked(true);
  let hasEmpty = false;

  for (const key in obj) {
    if (
      key === "comments" ||
      key === "lastRefNo" ||
      key === "assets" ||
      key === "paymentDate"
    ) {
      continue;
    } else if (typeof obj[key] === "string" && obj[key]?.trim() === "") {
      hasEmpty = true;
      break;
    }
  }

  if (hasEmpty) {
    setFieldEmpty(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    alert("Some required fields are empty");
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setShowPrint(true);
    setFieldEmpty(false);
  }
}

export function hasEmptyFieldResDate(
  obj: any,
  setPrintClicked: any,
  setFieldEmpty: any,
  setShowPrint: any
) {
  setPrintClicked(true);
  let hasEmpty = false;

  for (const key in obj) {
    if (
      key === "responseDate" ||
      key === "softwareHouse" ||
      key === "commission"
    ) {
      continue;
    } else if (typeof obj[key] === "string" && obj[key]?.trim() === "") {
      hasEmpty = true;
      break;
    }
  }

  if (hasEmpty) {
    setFieldEmpty(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    alert("Some required fields are empty");
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setShowPrint(true);
    setFieldEmpty(false);
  }
}

export function hasEmptyFieldContract(
  obj: any,
  setPrintClicked: any,
  setFieldEmpty: any,
  setShowPrint: any
) {
  setPrintClicked(true);
  let hasEmpty = false;
  let invalidEmail = false;

  for (const key in obj) {
    if (key === "responseDate" || key === "softwareHouse") {
      continue;
    } else if (typeof obj[key] === "string" && obj[key]?.trim() === "") {
      hasEmpty = true;
      break;
    } else if (
      (key === "email" && !isValidEmail(obj[key])) ||
      (key === "refEmail" && !isValidEmail(obj[key]))
    ) {
      invalidEmail = true;
      break;
    }
  }

  if (hasEmpty) {
    setFieldEmpty(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    alert("Some required fields are empty");
  } else if (invalidEmail) {
    setFieldEmpty(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    alert("The email address entered is not valid");
  } else {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setShowPrint(true);
    setFieldEmpty(false);
  }
}
