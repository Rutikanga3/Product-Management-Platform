
import { createContext, useReducer,  type ReactNode } from "react";
import type { Product } from "../types/product";

interface State {
  products: Product[];
}

type Action = { type: "SET_PRODUCTS"; payload: Product[] };

const initialState: State = { products: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {  products: action.payload };
    default:
      return state;
  }
}

export const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};