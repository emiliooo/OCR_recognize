import { AfterViewInit, Component, OnInit, VERSION, ViewChild, ViewChildren } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { createWorker } from "tesseract.js";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = "Angular " + VERSION.major;
  worker: Tesseract.Worker;
  workerReady = false;
  image =
    'https://as1.ftcdn.net/v2/jpg/04/58/94/38/1000_F_458943856_lfWVfRVITUYmzZrG17HDMRKVCg77DKuy.jpg';
  progress = 0;
  ocrResult;
  progresStart = false;
  maindata;

  ngOnInit() {
    this.loadWorker();
  }

  async loadWorker() {
    this.worker = await createWorker({
      logger: m => {
        this.progress = + parseInt('' + m.progress * 100);
        console.log(m)
      }
    });

    await this.worker.load();
    await this.worker.loadLanguage("pol");
    await this.worker.initialize("pol");
    console.log('finish')
    this.workerReady = true;
  }

  async recognizeImage() {
    this.progresStart = true;
    const data = await this.worker.recognize(this.image);
    console.log(data);
    this.maindata = data;
    this.ocrResult = data.data.text;
  }

  handleFileInput(e) {
    let t = URL.createObjectURL(e.target.files[0])
    this.image = t;
  }

}
