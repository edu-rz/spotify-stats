import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dim-card',
  imports: [],
  templateUrl: './dim-card.component.html',
  styleUrl: './dim-card.component.css'
})
export class DimCardComponent {
  @Input() data: any;
}
