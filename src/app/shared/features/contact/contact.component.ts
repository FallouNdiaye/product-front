import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html', // Using a separate HTML file
  styleUrls: ['./contact.component.css'], // Assuming a CSS file exists
  standalone: true,
  imports: [
    CommonModule, // Added for ngIf, ngIfElse
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MessageModule,
  ],
})
export class ContactComponent {
  email: string = '';
  message: string = '';
  isSubmitted: boolean = false;

  onSubmit() {
    if (this.message.length <= 300) {
      this.isSubmitted = true;
    }
  }
}