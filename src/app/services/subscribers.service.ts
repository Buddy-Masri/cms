import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: AngularFirestore,
              private toastr:ToastrService) {}

  loadSubscribers() {
    return this.afs
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  deleteSubscriber(id) {
    this.afs
      .collection('subscribers')
      .doc(id)
      .delete()
      .then(()=>{
        this.toastr.success('Deleted Successfully')
      })
      .catch((err) => {
        console.log(err);
        this.toastr.warning(err)
      });
  }
}
