const PAGE_SIZE = 10
const PAGE_SHOW = true

export default {
  PAGE_SIZE,
  getPage () {
    return {
      pageNo: 1,
      pageSize: PAGE_SIZE,
      total: 10,
      show: PAGE_SHOW
    }
  },
  getPageLimit (pageNo = 1) {
    let startIndex = (pageNo - 1) * PAGE_SIZE
    return `${PAGE_SIZE} offset ${startIndex}`
  }
}
