import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    entity: '',
    entityType: 'حكومية / هيئة',
    phone: '',
    email: '',
    serviceInterest: 'تصميم تجربة متكاملة',
    city: '',
    eventDate: '',
    notes: ''
  };

  isSubmitted = signal(false);

  onSubmit() {
    if (this.formData.name && this.formData.phone) {
      this.isSubmitted.set(true);
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      entity: '',
      entityType: 'حكومية / هيئة',
      phone: '',
      email: '',
      serviceInterest: 'تصميم تجربة متكاملة',
      city: '',
      eventDate: '',
      notes: ''
    };
    this.isSubmitted.set(false);
  }
}
