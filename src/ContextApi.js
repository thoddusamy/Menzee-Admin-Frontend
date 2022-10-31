import { createContext, useState } from 'react'

export const ContextApi = createContext()

export const DataProvider = ({ children }) => {

    const [productsData, setProductsData] = useState()

    return (
        <ContextApi.Provider
            value={{
                productsData,
                setProductsData,
            }}
        >
            {children}
        </ContextApi.Provider>
    )
}
