import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  subCategoryData = {
    subCategory: 'subCategory1',
  };

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docref) => {
        console.log(docref);
        this.toastr.success('Data Saved Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.afs
      .collection('categories')
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

  updateData(id, editData) {
    this.afs
      .collection('categories')
      .doc(id)
      .update(editData)
      .then(() => {
        this.toastr.success('Data Edited Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id) {
    this.afs
      .collection('categories')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.success('Data Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
