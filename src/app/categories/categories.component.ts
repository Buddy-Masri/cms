import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<object>;
  inputValue: string = '';
  formStatus: string = 'New Category';
  idValue: string = '';
  catDelete: object = {};

  constructor(private ctgsrvc: CategoriesService) {}

  ngOnInit(): void {
    this.ctgsrvc.loadData().subscribe((data) => {
      this.categoryArray = data;
    });
  }

  onSubmit(formData:FormGroup) {
    let categoryData: Category = {
      category: formData.value.category,
    };
    if (this.formStatus == 'New Category') {
      this.ctgsrvc.saveData(categoryData);
    } else if (this.formStatus == 'Edit Category') {
      this.ctgsrvc.updateData(this.idValue, categoryData);
    }
    this.formStatus = 'New Category';
    formData.reset();
  }

  onEdit(value:string, idvalue:string) {
    this.inputValue = value;
    this.formStatus = 'Edit Category';
    this.idValue = idvalue;
  }

  onDelete(catId:string) {
    this.ctgsrvc.deleteData(catId);
  }
}
