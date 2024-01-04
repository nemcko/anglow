import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { interval, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FooterStore } from './footer.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FooterStore],
})
export class FooterComponent implements OnInit {
  readonly counterStore = inject(FooterStore);

  private readonly logDoubleCount = rxMethod(
    tap(() => console.log('double count:', this.counterStore.increment()))
  );

  ngOnInit(): void {
    this.logDoubleCount(interval(2000));
  }
} 
