const errors = {

};

export const getMessage = (key = false) => {
  if (key in errors) {
    return errors[key];
  } else {
    return 'Something Went Wrong'
  }
}
