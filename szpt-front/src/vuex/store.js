import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let store=new Vuex.Store({
    state:{
         totalPrice:5,
         szptData:"",
         page:1,
         tableArr:[],
         tableNewArr:[]
    },
    getters: {

    },
    mutations:{
        tablePage(state,page){
            state.page=page.val
            state.tabltableNewArr=page.tableArr

        },
        decrement(state,price){
            state.totalPrice-=price
        }
    },
    actions:{
        pageIndex(context,page){
            context.commit('tablePage',page)
        }
    }
})
export default store;
