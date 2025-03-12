"use client"
import { store } from '@/store/store'
import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'

const StoreProvider:FC<{children:ReactNode}> = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider;