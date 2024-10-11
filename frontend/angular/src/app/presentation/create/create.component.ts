import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICreateFood } from '@core/dist/useCases/foods/UseCreateFood';
import { useCreateFood } from '@core/dist/useCases/foods/';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  defaultValues: ICreateFood = {
    name: '',
    category: '',
    price: 0,
  };
  defaultErrors = {
    name: '',
    category: '',
    price: '',
  };
  formValues = this.defaultValues;
  formErrors = this.defaultErrors;

  constructor(private _route: Router, private _location: Location) {}

  async handleSubmit() {
    const data = await useCreateFood.execute(this.formValues, () => {
      this._navigateToList();
      this._resetForm();
    });
    this._setFormError(data);
  }

  handleBackNavigate() {
    this._location.back();
  }

  private _navigateToList() {
    this._route.navigate(['/']);
  }

  private _setFormError(data: any) {
    this.formErrors = data;
  }

  private _resetForm() {
    this.formValues = this.defaultValues;
    this.formErrors = this.defaultErrors;
  }
}
