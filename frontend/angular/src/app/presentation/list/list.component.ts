import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFood } from '@core/dist/domain/Food';
import { useGetAllFoods, useGetOnlyFood } from '@core/dist/';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterLink,
} from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
}
