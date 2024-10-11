import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFood } from '@core/dist/domain/Food';
import { useGetAllFoods } from '@core/dist/';
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

  handleNavigateDetails(food: IFood) {
    this._route.navigate(['/details'], {
      queryParams: {
        ...food,
      },
    });
  }

  handleNavigateCreate() {
    this._route.navigate(['/create']);
  }
}
