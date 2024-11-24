import { CommonModule, formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Portfolio';
  showScroll: boolean = false;
  private scrollEvent: any;

  contactForm: FormGroup;
  showNotification = false;
  notificationMessage = '';


  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      const params = this.contactForm.value;
      this.emailService.sendEmail(params).then(
        (response) => {
          this.showToast('Email sent successfully!', 3000);
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          this.showToast('Failed to send email. Please try again.', 3000);
          console.error('FAILED...', error);
        }
      );
    } else {
      this.showToast('Please fill out all fields.', 3000);
    }
  }

  showToast(message: string, duration: number) {
    this.notificationMessage = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, duration);
  }

  closeNotification() {
    this.showNotification = false;
  }


  ngOnInit() {
    this.scrollEvent = this.onWindowScroll.bind(this);
    window.addEventListener('scroll', this.scrollEvent);
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  onWindowScroll() {
    // Show the button when the user scrolls down 100px
    if (window.scrollY > 100) {
      this.showScroll = true;
    } else {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
