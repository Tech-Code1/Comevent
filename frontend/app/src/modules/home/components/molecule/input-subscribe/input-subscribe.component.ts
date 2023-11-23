import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent, TitleComponent } from '@ui/components';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent],
  selector: 'input-subscribe',
  templateUrl: './input-subscribe.component.html',
  styleUrls: ['./input-subscribe.component.scss'],
})
export class InputSubscribeComponent {}