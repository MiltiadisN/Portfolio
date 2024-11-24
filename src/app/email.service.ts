import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = environment.emailServiceId;
  private templateId = environment.emailTemplateId;
  private publicKey = environment.emailPublicKey;

  constructor() { }

  sendEmail(params: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }
}
