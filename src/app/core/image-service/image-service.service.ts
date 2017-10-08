import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { Image } from '../../models/image-models/image.model';
import { UploadImage } from '../../models/image-models/image-upload';

import 'firebase/storage';
import * as firebase from 'firebase';

@Injectable()
export class ImageServiceService {

  uploadProgress: string;
  imageKey: string = '';
  fileName: string = '';
  file: File;
  upload: UploadImage;

  private basePath = '/uploads';
  private uploads: FirebaseListObservable<Image[]>;


  constructor(private db: AngularFireDatabase,
    private ngFire: AngularFireModule) {
  }


  uploadFile(event): Observable<any> {

    const storageRef = firebase.storage().ref();
    this.file = event.target.files.item(0);

    if (this.file.type.split('/')[0] !== 'image') {
      return Observable.throw('Please, choose image');
    } else {
      const upload = new UploadImage(this.file);
      const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
      return Observable.fromPromise(uploadTask.then(this.uploadToDB(uploadTask, upload)));
    }
  }

  uploadToDB(uploadTask, upload): any {

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

        let snap = snapshot as firebase.storage.UploadTaskSnapshot
        this.uploadProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toString().split('.')[0];
      },
      (error) => {
        console.error(error);
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.fileName = upload.url;
        this.imageKey = upload.name;
      }
    );

  }

  resetImage() {
    this.uploadProgress = '';
    this.fileName = '';
  }

  deleteImage(key) {

    const storageRef = firebase.storage().ref();

    var desertRef = storageRef.child('uploads/' + key);
    desertRef.delete().then(function (response) {
    }).catch(error =>
      console.error(error));
  }

}