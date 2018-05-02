export default {
  // measureIndex为度量在数组中的索引，以0开始
  getValue (japData, measureIndex = 1) {
    let jsonData = JSON.parse(japData)
    return jsonData[0][measureIndex].value
  },
  getIntValue (japData, measureIndex = 1) {
    let jsonData = JSON.parse(japData)
    return Number.parseInt(jsonData[0][measureIndex].value)
  },
  getManyValue (japData, measureIndex = 1) {
    let jsonData = JSON.parse(japData)
    let resultArray = []
    jsonData.forEach(array => {
      resultArray.push(array[measureIndex].value)
    })
    return resultArray
  },
  getMapValue (japData, map = []) {
    let jsonData = JSON.parse(japData)
    let resultArray = []
    map.forEach(key => {
      jsonData.forEach(array => {
        if (key === array[0].value) {
          resultArray.push(array[1].value)
        }
      })
    })
    return resultArray
  },
  getMapIntValue (japData, map = []) {
    let jsonData = JSON.parse(japData)
    let resultArray = []
    map.forEach(key => {
      let sum = 0
      jsonData.forEach(array => {
        if (key === array[0].value) {
          sum += Number(array[1].value)
        }
      })
      resultArray.push(sum)
    })
    return resultArray
  },
  getEchartValue (japData, excludeName, arrayIndex = [0, 1]) {
    let jsonData = JSON.parse(japData)
    let xAxisData = []
    let resultArray = []
    jsonData.forEach(array => {
      let name = array[arrayIndex[0]].value
      if (excludeName === undefined || (excludeName !== undefined && excludeName !== name)) {
        xAxisData.push(name)
        let item = {}
        item.name = name
        item.value = Number(array[arrayIndex[1]].value)
        resultArray.push(item)
      }
    })
    return [xAxisData, resultArray]
  },
  getEchartSumValue (japData, excludeName, arrayIndex = [0, 1]) {
    let jsonData = JSON.parse(japData)
    let xAxisData = []
    let resultArray = []
    jsonData.forEach(array => {
      let name = array[arrayIndex[0]].value
      if (excludeName === undefined || (excludeName !== undefined && excludeName !== name)) {
        xAxisData.push(name)
        let item = {}
        item.name = name
        let count = 0
        arrayIndex.slice(1).forEach(v => { count += Number(array[v].value) })
        item.value = count
        resultArray.push(item)
      }
    })
    return [xAxisData, resultArray]
  },
  getTableValue (japData, arrayIndex = [0, 1, 2], colArray = ['name', 'statistical', 'value'], sumCol) {
    let jsonData = JSON.parse(japData)
    let resultArray = []
    jsonData.forEach(array => {
      let item = {}
      for (let i = 0; i < arrayIndex.length; i++) {
        item[colArray[i]] = array[arrayIndex[i]].value
      }
      if (sumCol) {
        for (let [v, indexArray] of Object.entries(sumCol)) {
          let count = 0
          indexArray.forEach(j => {
            count += Number(array[j].value)
          })
          item[v] = count
        }
      }
      resultArray.push(item)
    })
    return resultArray
  },
  getOneIntSum (japData, measureIndex = 1) {
    let jsonData = JSON.parse(japData)
    let count = 0
    jsonData.forEach(array => {
      count += Number.parseInt(array[measureIndex].value)
    })
    return count
  },
  getOneFloatSum (japData, measureIndex = 1) {
    let jsonData = JSON.parse(japData)
    let count = 0.00
    jsonData.forEach(array => {
      count += Number.parseFloat(array[measureIndex].value)
    })
    return count
  },
  getManyIntSum (japData, indexArray = [1]) {
    let jsonData = JSON.parse(japData)
    let countArray = new Array(indexArray.length)
    jsonData.forEach(array => {
      let i = 0
      indexArray.forEach(index => {
        if (countArray[i] === undefined) {
          countArray[i++] = Number.parseInt(array[index].value)
        } else {
          countArray[i++] += Number.parseInt(array[index].value)
        }
      })
    })
    return countArray
  },
  getManyFloatSum (japData, indexArray = [1]) {
    let jsonData = JSON.parse(japData)
    let countArray = new Array(indexArray.length)
    jsonData.forEach(array => {
      let i = 0
      indexArray.forEach(index => {
        if (countArray[i] === undefined) {
          countArray[i++] = Number.parseFloat(array[index].value)
        } else {
          countArray[i++] += Number.parseFloat(array[index].value)
        }
      })
    })
    return countArray
  }
}
