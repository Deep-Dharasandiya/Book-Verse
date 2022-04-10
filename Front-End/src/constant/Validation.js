export function isEmail(val) {
    let isValid = true;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (val=='') {
      isValid = false;
    } else if (!regex.test(val)) {
      isValid = false;
    }
    return isValid;
  }
export function isPhoneNumber(val) {
  let isValid = true;
  const regex = /^\d+$/
  const length = val.length;
  if (val == '') {
    isValid = false;
  } else if (!(length == 10)) {
    isValid = false;
  } else if (regex.test(val))
    return isValid;
}  
  export function isValidPassword(val) {
    let isValid = true;
    const length = val.length;
    if (val=='') {
      isValid = false;
    } else if (length < 6) {
      isValid = false;
    }
    return isValid;
  }
  export function isValidPin(val) {
    let isValid = true;
    const regex = /^\d+$/
    const length = val.length;
    if (val=='') {
      isValid = false;
    } else if (!(length == 6)) {
      isValid = false;
    }else if(regex.test(val))
    return isValid;
  }  
