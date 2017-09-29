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

  uploadProgress = 0;
  fileName = '';
  file: File;
  upload: UploadImage;

  private basePath = '/uploads';
  private uploads: FirebaseListObservable<Image[]>;


  constructor(private db: AngularFireDatabase,
    private ngFire: AngularFireModule) {
  }


  uploadFile(event): any {

    this.file = event.target.files.item(0);
    const upload = new UploadImage(this.file);

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {

        let snap = snapshot as firebase.storage.UploadTaskSnapshot
        this.uploadProgress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        console.error(error);
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.fileName = upload.url;
        return upload.url;
      }
    );
  }

}