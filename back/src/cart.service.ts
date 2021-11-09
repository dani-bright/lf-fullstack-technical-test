import { Injectable, NotImplementedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { cachedDataVersionTag } from 'v8';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  id: string;
  quantity: number;
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  create(): Cart {
    const newCart = {
      id: uuidv4(),
      items:[]
    } as Cart
    this.carts.push(newCart)
    return newCart;
  }

  getCart(idCart: string): Cart {
    return this.carts.find(cart=>cart.id === idCart)
  }

  putItem(id: string, item: Item): Cart {
    const cart = this.getCart(id)
    cart.items.push(item)
    throw cart
  }

  putItems(id: string, items: Item[]): Cart {
    throw new NotImplementedException();
  }
}
