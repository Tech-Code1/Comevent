import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalManagerService {
  private currentModal = signal<string | null>(null);

  openModal(modalId: string) {
    this.currentModal.set(modalId);
  }

  closeModal() {
    this.currentModal.set(null);
  }

  getCurrentModal(): string | null {
    return this.currentModal();
  }
}
