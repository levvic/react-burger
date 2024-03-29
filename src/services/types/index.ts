import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWsActions } from "../actions/ws";

export interface IIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    _id: string;
    __v?: number;
    uId?: string;
    qty?: number;
  }

  export type TIngredientsType = {
    id: string;
    type: string;
    name: string;
  };  

  export interface IOwner {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
    owner?: IOwner;
  }

  export interface IWsOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
  }
  
  export interface ILocation {
    from: Location;
    previousLocation?: Location;
    background?: Location;
    pathname: string;
}
  

export type TApplicationActions = | TConstructorActions | TIngredientsActions | TOrderActions | TWsActions | TUserActions ;
