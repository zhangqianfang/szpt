<template>
    <div class="container">
        <span>区域</span>
        <select class="city_picker" v-model="selectCity" @change="onSelectedProvince">
            <option value="">请选择直辖市</option>
            <option v-for="(item,index) in city" :value="item.name" :key="index">{{item.name}}</option>
        </select>
        <button @click="query">查询</button>
    </div>
</template>
<script>
import locationData from "../commen/location";
import {PROVINCE_CODE} from "../utils/value-consts";

export default {
  data() {
    const province = [];
    for (let code in locationData) {
      let item = locationData[code];
      province.push(
        Object.assign(item, {
          label: item.name
        })
      );
    }
    return {
      province,
      city: [],
      county: [],
      selectProvince: '中国',
      selectCity: '',
      selectCounty: null
    };
  },
  mounted: function () {
    this.proviceHandle(locationData[PROVINCE_CODE]);
  },
  methods: {
    proviceHandle(value) {
      //console.log(locationData);
      for (let code in value.cities) {
        let item = value.cities[code];
        this.city.push(
          Object.assign(item, {
            label: item.name
          })
        );
      }
      this.county = [];
      this.selectProvince = value.name;
      this.selectCity = '';
      this.selectCounty = null;
    },
    cityHandle(value) {
      const county = [];
      for (let code in value.districts) {
        let item = value.districts[code];
        county.push({
          code,
          label: item,
          name: item
        });
      }
      this.county = county;
      this.selectCity = value.name;
      this.selectCounty = null;
    },
    countyHandle(value) {
      this.selectCounty = value.name;
    },
    onSelectedProvince(e){
      this.selectProvince = e.target.value;
    },
    getValue(){
      return this.selectProvince;
    },
    query(){
      this.$emit('query', this.selectCity);
    }
  },
  computed: {
    address() {
      const { selectProvince, selectCity, selectCounty } = this;
      return (
        (selectProvince ? selectProvince : "") +
        (selectCity ? "，" + selectCity : "") +
        (selectCounty ? "，" + selectCounty : "")
      );
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  color: #ffff;
  font-size: 18px;
  text-align: center;
  span {
    padding:0 5px;
  }
  .city_picker {
    width: 240px;
    height: 40px;
    background: rgba(2, 30, 115, 1);
    border: 1px solid rgba(39, 137, 228, 1);
    vertical-align: top;
    color: #ffff;
    font-size: 18px;
  }
  button {
    background: linear-gradient(
      180deg,
      rgba(27, 200, 243, 1) 0%,
      rgba(27, 200, 243, 1) 0%,
      rgba(12, 66, 188, 1) 100%,
      rgba(12, 66, 188, 1) 100%
    );
    width: 80px;
    height: 40px;
    border: 0;
    font-size: 16px;
  }
}
</style>
