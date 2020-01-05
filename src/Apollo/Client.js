import ApolloCient from 'apollo-boost';
import {defaults, resolvers} from "./LocalState";
import invariant from "invariant";

export default new ApolloCient({
    uri:"https://sakongstagram-backend.herokuapp.com/",
    clientState:{
        defaults,
        resolvers
    },
    request: async (operation)=>{
        const token = await localStorage.getItem("token");
        operation.setContext({
            headers:{
                authorization: token ? `Bearer ${token}` : ''
            }
        })

    }
});
