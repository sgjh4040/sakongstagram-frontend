import ApolloCient from 'apollo-boost';
import {defaults, resolvers} from "./LocalState";

console.log(process.env.NODE_ENV)
export default new ApolloCient({
    uri:process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://sakongstagram-backend.herokuapp.com/",
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
