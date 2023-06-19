import {createStore} from "vuex";
import userToken from "@/store/userToken.js";
import show from "@/store/show.js";
import question from "@/store/question.js";


const store = createStore({
    modules:{
        userToken,
        show,
        question
    }
})
export default store
