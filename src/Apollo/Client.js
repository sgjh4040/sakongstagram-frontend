import ApolloCient from 'apollo-boost';
import {defaults, resolvers} from "./LocalState";

export default new ApolloCient({
    uri:"http://localhost:4000/",
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
