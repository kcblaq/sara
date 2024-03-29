import { RootState } from "@/app/store";
import axios from "axios";
import { useSelector } from "react-redux";

const ApiCall = axios.create({
    baseURL: "https://api.webmaxi.net/api",
    timeout: 10000
});

// Function to get token from Redux store
const getToken = (store: any) => {
    const token = store.getState().user.token;
    return token;
};

// Function to set authorization header based on token
export const configureApiCall = (store:any) => {
    ApiCall.interceptors.request.use(
        (config) => {
            const token = getToken(store);
            if (token) {
                config.headers['Authorization'] = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default ApiCall;










// import { RootState } from "@/app/store";
// import axios from "axios";

// const ApiCall = axios.create({
//     baseURL: "https://api.webmaxi.net/api",
//     timeout: 10000
// });

// // Function to set authorization header based on token
// const setAuthorizationHeader = (token) => {
//     if (token) {
//         ApiCall.defaults.headers.common['Authorization'] = token;
//     } else {
//         delete ApiCall.defaults.headers.common['Authorization'];
//     }
// };

// export const configureApiCall = (store) => {
//     store.subscribe(() => {
//         const state = store.getState();
//         setAuthorizationHeader(state.user.token);
//     });
// };

// export default ApiCall;