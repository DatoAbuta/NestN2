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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ამას იმიტომ ვაკომენტარებ რომ იმუშაოს getWithQuery ფუნქციამ.
  // @Get()
  // getAll() {
  //   return this.productsService.getAll();
  // }

  // @Get() ამას ვაკომენტარებ იმიტორო ისე getWithCategory არ მუშაობს.
  // getWithCost(@Query('cost') cost) {
  //   return this.productsService.getWithCost(cost);
  // }

  // @Get() ამასაც ვაკომენტარებ რომ მესამე ფუნქციამ იმუშაოს.
  // getWithCategory(@Query('category') category) {
  //   return this.productsService.getWithCategory(category);
  // }

  @Get()
  getWithBothQuery(
    @Query('category') category: string,
    @Query('cost', ParseIntPipe) cost: number,
  ) {
    return this.productsService.getWithBothQuery(category, cost);
  }

  @Get('/:id')
  getExpenseById(@Param('id') id) {
    return this.productsService.getExpenseById(Number(id));
  }

  @Post()
  createProduct(@Body() product: ProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id) {
    return this.productsService.deleteProduct(Number(id));
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() product: ProductDTO) {
    return this.productsService.updateProduct(Number(id), product);
  }
}
