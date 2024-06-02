import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Query,
  Headers,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ამას იმიტომ ვაკომენტარებ რომ იმუშაოს getWithBothQuery ფუნქციამ.
  // @Get()
  // getAll() {
  //   return this.productsService.getAll();
  // }

  @Get()
  getWithBothQuery(
    @Query('category') category: string,
    @Query('cost', ParseIntPipe) cost: number,
    @Headers('x-api-key') key: string,
  ) {
    return this.productsService.getWithBothQuery(category, cost, key);
  }

  @Get('/:id')
  getExpenseById(@Param('id', ParseIntPipe) id) {
    return this.productsService.getExpenseById(id);
  }

  @Post()
  createProduct(@Body() product: ProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id) {
    return this.productsService.deleteProduct(id);
  }

  @Put('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: ProductDTO,
  ) {
    return this.productsService.updateProduct(id, product);
  }
}
