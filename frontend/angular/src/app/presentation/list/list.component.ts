import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  useGetAllFoods,
  useDeleteFood,
  useNavigateDetailFood,
} from '@core/dist/';
import {
  IUseNavigateDetailFood,
  IUseNavigateDetailFoodParams as IFood,
} from '@core/useCases/foods/UseNavigateDetailFood';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  foods: IFood[] = [];

  constructor(private _route: Router) {}

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize = async () => {
    const response: IFood[] = await useGetAllFoods.execute();
    this.foods = response;
  };

  handleNavigateDetails(params: IFood) {
    const input: IUseNavigateDetailFood = {
      params,
      callback: () => {
        this._navigateDetails(params);
      },
    };
    useNavigateDetailFood.execute(input);
  }

  private _navigateDetails(params: IFood) {
    this._route.navigate(['/details'], {
      queryParams: {
        ...params,
      },
    });
  }

  handleNavigateCreate() {
    this._route.navigate(['/create']);
  }

  handleRemove = async (id: string) => {
    const isConfirm = confirm('Deseja remover?');
    if (isConfirm) {
      await useDeleteFood.execute({
        id,
        callback: () => this._initialize(),
        isConfirm,
      });
    }
  };
}
