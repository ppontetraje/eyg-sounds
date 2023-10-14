import { Component } from '@angular/core';
import { Sound } from '../Services/Sound';

@Component({
    selector: 'app-sounds',
    templateUrl: './sounds.component.html',
    styleUrls: ['./sounds.component.css']
})
export class SoundsComponent {
    audio: any;
    constructor() {
    }
    public async getAllSounds(): Promise<Sound[]>  {
        try {
            // Realiza una solicitud HTTP para obtener el archivo JSON
            const response = await fetch('../assets/data/sounds.json');
    
            if (!response.ok) {
                console.log('No se pudo cargar el archivo JSON.');
                throw new Error('No se pudo cargar el archivo JSON.');
            }
    
            // Analiza el contenido del archivo JSON en un objeto JavaScript
            const jsonSounds = await response.json();
    
            // Mapea los objetos JavaScript a instancias de la clase Sound
            const soundInstances: Sound[] = jsonSounds.map((jsonSound: any) => {
                return new Sound(
                    jsonSound.id,
                    jsonSound.fav,
                    jsonSound.text,
                    jsonSound.soundUrl,
                    jsonSound.tag
                );
            });
    
            return soundInstances;
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
            return [];
        }
    }
    public playSound(path: string) {
        if (this.audio) {
            /*console.log(path);*/
            this.audio.pause();
        }
        this.audio = new Audio();
        this.audio.src = path;
        this.audio.load();
        this.audio.play();
    }
}
