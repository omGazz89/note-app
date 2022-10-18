import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss']
})
export class BaseButtonComponent {
  @Input() text!: string
  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}
