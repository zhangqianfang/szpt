import {PROVINCE, TASK_ID, PAGE_SIZE} from "./value-consts";

let getXyData = function (data, xColumnName, yColumnName, divisor = 1) {
  let allInfo = JSON.parse(data);
  let xData = [],
    yData = []
  allInfo.forEach(p => {
    p.forEach(x => {
      if (x.columnName === xColumnName)
        xData.push(x.value);
      if (x.columnName === yColumnName)
        yData.push((x.value / divisor).toFixed(2))
    })
  })
  return {xData, yData}
}

let getXyData2 = function (data, xColumnName, yColumnName) {
  let allInfo = JSON.parse(data);
  let xData = [],
    yData = []
  allInfo.forEach(p => {
    p.forEach(x => {
      if (x.columnName === xColumnName)
        xData.push(x.value);
      if (x.columnName === yColumnName)
        yData.push(x.value)
    })
  })
  return {xData, yData}
}

let getXyDataByDivision = function (data, xColumnName, divisorColumn, dividendColumn, percent = 100, divisorParam = 1) {
  let allInfo = JSON.parse(data);
  let xData = [],
    yData = []
  allInfo.forEach(p => {
    let divisor = 1,
      dividend = 1;
    p.forEach((x) => {
      if (x.columnName === xColumnName)
        xData.push(x.value);
      if (x.columnName === divisorColumn)
        divisor = parseFloat(x.value);
      if (x.columnName === dividendColumn) {
        dividend = parseFloat(x.value);
      }
    })
    if (dividend != 0)
      yData.push((divisor * percent / dividend / divisorParam).toFixed(2));
  })
  return {xData, yData}
}

let getNeedGridInfo = function (data, columnName1, columnName2, columnName3, divisor = 1, needFix = false) {
  let allInfo = JSON.parse(data);
  let needGridList = []
  allInfo.forEach(p => {
    let needGridInfo = {};
    p.forEach(x => {
      if (x.columnName === columnName1)
        needGridInfo.name = x.value;

      if (x.columnName === columnName2)
        needGridInfo.statistical = x.value;

      if (x.columnName === columnName3)
        needGridInfo.value = needFix ? (x.value / divisor).toFixed(2) : x.value / divisor;
    })
    needGridList.push(needGridInfo);
  })
  return needGridList;
}

let getNeedGridInfo2 = function (data, columnName1, columnName2, columnName3) {
  let allInfo = JSON.parse(data);
  let needGridList = []
  allInfo.forEach(p => {
    let needGridInfo = {};
    p.forEach(x => {
      if (x.columnName === columnName1)
        needGridInfo.name = x.value;

      if (x.columnName === columnName2)
        needGridInfo.statistical = x.value;

      if (x.columnName === columnName3)
        needGridInfo.value = x.value;
    })
    needGridList.push(needGridInfo);
  })
  return needGridList;
}

let getNeedGridByDivision = function (data, columnName1, columnName2, divisorColumn, dividendColumn, percent = 100, divisorParam = 1) {
  let allInfo = JSON.parse(data);
  let needGridList = []
  allInfo.forEach(p => {
    let needGridInfo = {};
    let divisor = 1,
      dividend = 1;
    p.forEach(x => {
      if (x.columnName === columnName1)
        needGridInfo.name = x.value;

      if (x.columnName === columnName2)
        needGridInfo.statistical = x.value;

      if (x.columnName === divisorColumn)
        divisor = parseFloat(x.value);

      if (x.columnName === dividendColumn)
        dividend = parseFloat(x.value);
    })
    needGridInfo.value = (divisor * percent / dividend / divisorParam).toFixed(2);
    needGridList.push(needGridInfo);
  })
  return needGridList;
}

let getPieInfo = function (data) {
  let allInfo = JSON.parse(data);
  let legendData = [],
    serData = []
  allInfo.forEach(p => {
    p.forEach(x => {
      let serObject = {};
      if (x.columnName.startsWith('TREPORTDATA')) {
        legendData.push(x.columnNameCn);
        serObject.value = x.value;
        serObject.name = x.columnNameCn;
        serData.push(serObject);
      }
    })
  })
  return {legendData, serData}
}
let getBarInfoByPie = function (data, selectValue, xColumnName) {
  let allInfo = JSON.parse(data);
  let xData = [],
    yData = [];
  allInfo.forEach(p => {
    p.forEach(x => {
      if (x.columnName === xColumnName)
        xData.push(x.value);
      if (x.columnNameCn === selectValue)
        yData.push(x.value);
    })
  })
  return {xData, yData}
}
let getNeedGridInfo7 = function (data, columnName1, columnName2, columnName3, columnName4, columnName5, columnName6, columnName7, columnName8 = null) {
  let allInfo = JSON.parse(data);
  let needGridList = []
  allInfo.forEach(p => {
    let needGridInfo = {};
    p.forEach(x => {
      if (x.columnName === columnName1)
        needGridInfo.schoolCode = x.value;

      if (x.columnName === columnName2)
        needGridInfo.schollName = x.value;

      if (x.columnName === columnName3)
        needGridInfo.value1 = x.value;

      if (x.columnName === columnName4)
        needGridInfo.value2 = x.value;

      if (x.columnName === columnName5)
        needGridInfo.value3 = x.value;

      if (x.columnName === columnName6)
        needGridInfo.value4 = x.value;

      if (x.columnName === columnName7)
        needGridInfo.value5 = x.value;

      if (columnName8 != null) {
        if (x.columnName === columnName8) {
          needGridInfo.value6 = x.value;
        }
      }
    })
    needGridList.push(needGridInfo);
  })
  return needGridList;
}

let getCommonParams = function () {
  return {
    "limit": 1000000,
    "filters": [{
      "tableName": "",
      "tableColumn": 'T_SCHOOL_PROVINCE',
      "listFilter": PROVINCE,
      "tableType": "1",
      "inOrNot": "0"
    },
      {
        "tableName": "",
        "tableColumn": 'T_TASK_ID',
        "listFilter": TASK_ID,
        "tableType": "1",
        "inOrNot": "0"
      }
    ]
  }
}

let getGridParams = function (tableColumn, listFilter, currentPage = 0) {
  let startIndex = (currentPage - 1) * PAGE_SIZE;
  return {
    "limit": `${PAGE_SIZE} offset ${startIndex}`,
    "filters": [{
      "tableName": "",
      "tableColumn": tableColumn,
      "listFilter": listFilter,
      "tableType": "1",
      "inOrNot": "0"
    }]
  }
}
export {
  getNeedGridInfo,
  getNeedGridInfo2,
  getXyData,
  getXyData2,
  getXyDataByDivision,
  getNeedGridByDivision,
  getPieInfo,
  getBarInfoByPie,
  getNeedGridInfo7,
  getCommonParams,
  getGridParams
}
