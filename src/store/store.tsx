import React from 'react';
import { createStore } from 'react-hooks-global-state';
import Product from '../components/Product';

interface Product {
    name: string;
    id: string;
    price: string;
    src: string;
}

interface AppState {
    liked: Product[]
}

const initialState: AppState = {
    liked: []
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'add': return { ...state, liked: [...state.liked, action.product] };
      case 'delete': return { ...state, liked:  state.liked.filter((product: Product) => product.id !== action.productId) };
      default: return state;
    }
}

export const { dispatch, useStoreState } = createStore(reducer, initialState);