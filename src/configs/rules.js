export default {
  required: [(val) => !!val || "This filed is required"],
  validEmail: [
    (val) =>
      val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
      "Please enter valid Email",
  ],
  validNumber: [(val) => val.match(/^[0-9]*$/) || "Please enter Numeric value"],
  validateDigits: [
    (val) => val.match(/^[0-9]{11}$/) || "Please input exactly 11 numbers!",
  ],
  validateText: [
    (val) => val.match(/^[a-z]*$/i) || "Please enter Alphabtic value",
  ],
  validUrl: [
    (val) =>
      val.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ) || "Please enter valid Url",
  ],
};
