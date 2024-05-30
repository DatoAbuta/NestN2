import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDTO } from './products.dto';
import { IExpenses } from './products.interface';

export interface IProducts {
  id: number;
  category: string;
  cost: number;
  created: string;
}

@Injectable()
export class ProductsService {
  private products: IExpenses[] = [
    {
      id: 1,
      category: 'shopping',
      cost: 300,
      created: '2024-05-18T08:27:18.453Z',
    },
    {
      id: 2,
      category: 'food',
      cost: 450,
      created: '2024-05-18T08:38:55.969Z',
    },
    {
      id: 3,
      category: 'drinks',
      cost: 150,
      created: '2024-05-18T08:39:01.237Z',
    },
    {
      id: 4,
      category: 'dairy',
      cost: 100,
      created: '2024-05-18T12:22:22.894Z',
    },
  ];

  getAll(): IProducts[] {
    return this.products;
  }

  getWithCost(cost: number): IExpenses[] | IExpenses {
    const expense = this.products.filter((el) => el.cost >= cost);

    if (cost) {
      return expense;
    }

    return this.products;
  }

  getWithCategory(category: string): IExpenses[] | IExpenses {
    const expense = this.products.filter((el) => el.category === category);

    if (category) {
      return expense;
    }

    return this.products;
  }

  getWithBothQuery(category: string, cost: number): IExpenses[] | IExpenses {
    if (category && cost) {
      return this.products.filter(
        (el) => el.category === category && el.cost >= cost,
      );
    }

    return this.products;
  }

  createProduct(body: ProductDTO) {
    if (!body.category || !body.cost)
      throw new HttpException(
        'Name And Price Are Required!',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      ...body,
      created: new Date().toISOString(),
    };

    this.products.push(newProduct);

    return newProduct;
  }

  getExpenseById(id: number) {
    const NewProduct = this.products.find((el) => el.id === Number(id));

    if (!NewProduct)
      throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);

    return NewProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((el) => el.id === id);

    if (index === -1)
      throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);

    const deletedProduct = this.products.splice(index, 1);

    return deletedProduct;
  }

  updateProduct(id: number, body: ProductDTO) {
    const index = this.products.findIndex((el) => el.id === id);

    if (index === -1)
      throw new HttpException('Not Found Product', HttpStatus.NOT_FOUND);

    const updatedProduct = {
      ...this.products[index],
      ...body,
    };

    this.products[index] = updatedProduct;

    return updatedProduct;
  }
}
