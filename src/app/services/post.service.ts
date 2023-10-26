import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {}

  uploadImage(selectedImg:any, postData:any, id:string) {
    const filePath = `postIMG/${Date.now()}`;
    this.storage
      .upload(filePath, selectedImg)
      .then(() => {
        console.log('Image Uploaded Seccessfully');
        this.storage
          .ref(filePath)
          .getDownloadURL()
          .subscribe((URL) => {
            postData.postImgPath = URL;
            if (id) {
              this.savePostChanges(postData, id);
            } else {
              this.postSubmit(postData);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postSubmit(data:FormGroup) {
    this.afs
      .collection('posts')
      .add(data)
      .then((docref) => {
        console.log(docref);
        this.toastr.success('Post Saved Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadPost() {
    return this.afs
      .collection('posts')
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

  loadSinglePost(id) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  savePostChanges(editData, id) {
    this.afs
      .collection('posts')
      .doc(id)
      .update(editData)
      .then(() => {
        this.toastr.success('Post Edited Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postDelete(id:string, imPpath:string) {
    this.storage.storage
      .refFromURL(imPpath)
      .delete()
      .then(() => {
        this.afs
          .collection('posts')
          .doc(id)
          .delete()
          .then(() => {
            this.toastr.warning('Post Deleted Successfully');
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  setAsFeatured(id:string) {
    this.afs
      .collection('posts')
      .doc(id)
      .update({ isFeatured: true })
      .then(() => [this.toastr.success('Post Added To Featured')])
      .catch((err) => {
        console.log(err);
      });
  }

  removeFeatured(id:string) {
    this.afs
      .collection('posts')
      .doc(id)
      .update({ isFeatured: false })
      .then(() => {
        this.toastr.success('Post Removed From Featured');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
