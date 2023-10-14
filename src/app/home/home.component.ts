import { Component } from '@angular/core';
import { SoundsComponent } from '../sounds/sounds.component';
import { Sound } from '../Services/Sound';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  soundList: Sound[] = [];
  p: number = 1;
  itemsPerPage!: number;
  totalProduct: any;
  minItemsPerPage: number = 25;

  constructor(public _sound: SoundsComponent) {
    this.loadSoundList();
  }
  async loadSoundList() {
    try {
      const soundInstances = await this._sound.getAllSounds();
      this.soundList = soundInstances;
      this.totalProduct = this.soundList.length;
      this.itemsPerPage = this.totalProduct / 10 > this.minItemsPerPage ? this.totalProduct / 10 : this.minItemsPerPage;
    } catch (error) {
      console.error('Error al cargar la lista de sonidos:', error);
    }
  }
  ngOnInit(): void {

  }
}
