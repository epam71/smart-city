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
  fileName: string = '';
  file: File;
  upload: UploadImage;

  private basePath = '/uploads';
  private uploads: FirebaseListObservable<Image[]>;


  constructor(private db: AngularFireDatabase,
    private ngFire: AngularFireModule) {
  }


  uploadFile(event): any {

    const storageRef = firebase.storage().ref();

    this.file = event.target.files.item(0);
    const upload = new UploadImage(this.file);

    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

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
        console.log(`${this.basePath}/${upload.file.name}`);
        console.log(upload);
        return upload.url;
      }
    );
  }

  resetImage(){
    this.uploadProgress = '';
    this.fileName = '';
  }

  deleteImage(key){

    const storageRef = firebase.storage().ref();

    var desertRef = storageRef.child('name');
    desertRef.delete().then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  }

}