import {
  Component,
  Input,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef,
  Injector,
  NgZone,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { EventItem } from '../../interfaces/event.interface';
import { Event } from '../event-card-map/event-card-map.component';
import { Router } from '@angular/router';

declare const ymaps: any;

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" style="width: 100%; height:100%; position: relative;"></div>`
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() events: EventItem[] = [];

  private map: any;
  private placemarks: any[] = [];
  private cardRef: ComponentRef<Event> | null = null;
  private isHoveringCard = false;

  private viewContainerRef = inject(ViewContainerRef);
  private injector = inject(Injector);
  private ngZone = inject(NgZone);
  private router = inject(Router);

  ngAfterViewInit(): void {
    ymaps.ready(() => {
      this.initMap();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && this.map) {
      this.updatePlacemarks();

    }
  }

  private async initMap() {
    this.map = new ymaps.Map('map', {
      center: [55.751574, 37.573856],
      zoom: 10,
      controls: ['zoomControl'],
      type: 'yandex#satellite'
    });

    await this.setOptimalMapCenter();
    this.updatePlacemarks();
  }

  private updatePlacemarks() {
    // Удаляем старые метки
    this.placemarks.forEach(pm => this.map.geoObjects.remove(pm));
    this.placemarks = [];

    this.events.forEach(event => {
      const iconPreset = event.offline ? 'islands#blueDotIcon' : 'islands#redDotIcon';

      const placemark = new ymaps.Placemark(event.coords, {}, {
        preset: iconPreset,
        iconColor: event.offline ? '#1E90FF' : '#FF4500'
      });

      // Наведение
      placemark.events.add('mouseenter', (e: any) => {
        const coords = e.get('pagePixels');
        this.ngZone.run(() => this.showCard(event, coords));
      });

      // Клик
      placemark.events.add('click', (e: any) => {
        const coords = e.get('pagePixels');
        this.ngZone.run(() => this.showCard(event, coords));
      });

      // Уход мышки
      placemark.events.add('mouseleave', () => {
        setTimeout(() => {
          if (!this.isHoveringCard) {
            this.ngZone.run(() => this.hideCard());
          }
        }, 300);
      });

      this.map.geoObjects.add(placemark);
      this.placemarks.push(placemark);
    });
  }

  private async setOptimalMapCenter() {
    if (this.events.length === 1) {
      this.map.setCenter(this.events[0].coords);
      this.map.setZoom(12);
      return;
    }

    try {
      const userCoords = await this.getUserLocation();
      this.map.setCenter(userCoords);
      this.map.setZoom(12);
    } catch {
      if (this.events.length > 0) {
        this.map.setBounds(this.map.geoObjects.getBounds(), {
          checkZoomRange: true
        });
      }
    }
  }

  private getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => reject(error.message),
        {timeout: 5000}
      );
    });
  }

  showCard(event: EventItem, position: [number, number]) {
    this.hideCard();

    const ref = this.viewContainerRef.createComponent(Event, {
      injector: this.injector
    });

    ref.instance.event = event;

    ref.instance.mouseEnter.subscribe(() => {
      this.isHoveringCard = true;
    });
    ref.instance.mouseLeave.subscribe(() => {
      this.isHoveringCard = false;
      setTimeout(() => {
        if (!this.isHoveringCard) {
          this.hideCard();
        }
      }, 300);
    });

    ref.instance.detailsClicked.subscribe(() => {
      this.router.navigate(['/event', event.id]);
    });

    const el = ref.location.nativeElement as HTMLElement;
    el.style.left = `${position[0]}px`;
    el.style.top = `${position[1]}px`;
    el.style.position = 'absolute';
    el.style.zIndex = '999';

    this.cardRef = ref;
  }

  hideCard() {
    this.cardRef?.destroy();
    this.cardRef = null;
  }
}
