import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFood } from '@core/dist/domain/Food';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  food: IFood = {
    name: '',
    price: 0,
    category: '',
  };

  constructor(private _route: ActivatedRoute, private _location: Location) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((data) => {
      this.food.name = data['name'];
      this.food.price = data['price'];
      this.food.category = data['category'];
    });
  }

  handleBackNavigate() {
    this._location.back();
  }
}
