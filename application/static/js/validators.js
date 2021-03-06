


export function validateDataType(dataTypes) {
    // Returns True if valid else false

    for (let dataType of dataTypes){
        if (!dataType.value) return false;
    }

    return true;
}

export function validateDataFields(dataSetFields) {
  // Returns True if valid else false

  for (let field of dataSetFields) {
    if (!field.value) return false;
  }
  return true;
}


export function validateRowsNum(rowsNum) {
  if (rowsNum.value > 300) {
    rowsNum.value = 300;
  } else if (rowsNum.value <= 0) {
    rowsNum.value = 1;
  }
}