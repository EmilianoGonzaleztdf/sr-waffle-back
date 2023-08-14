import { Body, Controller, Delete, Get, Post} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService){}

  @Get('/users')
  public getUsers():any{
    return this.dashboardService.getUsers();
  }
  @Get('/stock')
  public getStock():any{
    return this.dashboardService.getStock();
  }
  @Get('/products')
  public getProducts():any{
    return this.dashboardService.getProducts();
  }
}
