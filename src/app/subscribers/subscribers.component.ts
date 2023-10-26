import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent {
  subData: Array<object>;

  constructor(private subSrvc: SubscribersService) {
    this.subSrvc.loadSubscribers().subscribe((sub) => {
      this.subData = sub;
    });
  }

  onDelete(id) {
    this.subSrvc.deleteSubscriber(id);
  }
}
