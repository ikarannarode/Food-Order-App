import { createContext } from "react";
import { food_list } from "../assets/assets.js"
export const StoreContext = createContext(null);



const StoreContextProvider = (props) => {
    const contextValue = {
        food_list
    }
    return (<StoreContextProvider value={contextValue}>
        {props.children}
    </StoreContextProvider>)
}

export default StoreContextProvider;