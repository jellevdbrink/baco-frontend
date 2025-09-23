import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadModule,
} from 'primeng/fileupload';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QRCodeComponent } from 'dfx-qrcode';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment',
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    QRCodeComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class Payment {
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);
  private fb = inject(NonNullableFormBuilder);

  @ViewChild(FileUpload) fileUpload!: FileUpload;
  protected qrCode = environment.qrCodeUrl;
  protected loading = signal(false);

  protected paymentForm = this.fb.group({
    amount: this.fb.control(this.getStartAmount(), [
      Validators.required,
      Validators.min(0.01),
    ]),
    proof_picture: this.fb.control<File | null>(null),
    description: this.fb.control(''),
  });

  protected onSelect(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) {
      this.paymentForm.patchValue({ proof_picture: file });
      this.paymentForm.controls.proof_picture.markAsDirty();
    }
  }

  protected sendPaymentButtonDisabled(): boolean {
    return this.paymentForm.invalid || this.loading();
  }

  protected sendPayment(): void {
    const value = this.paymentForm.getRawValue();
    const activePerson = this.cartService.activePerson();

    if (
      this.sendPaymentButtonDisabled() ||
      !activePerson
      // || !value.proof_picture
    ) {
      return;
    }

    this.loading.set(true);

    this.apiService
      .createPayment({
        by: activePerson.id,
        // proof_picture: value.proof_picture,
        description: value.description,
        amount: value.amount,
      })
      .subscribe({
        next: (payment) => {
          this.messageService.add({
            summary: `Success!!`,
            detail: `Payment of €${value.amount} submitted! Your balance will be updated when it is approved.`,
            severity: 'success',
          });
          this.resetForm();
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.messageService.add({
            summary: `Failed to submit payment`,
            detail: `${err.status}: ${err.statusText}`,
            severity: 'error',
          });
          this.loading.set(false);
        },
      });
  }

  private getStartAmount(): number {
    const balance = this.cartService.balanceActivePerson();
    return balance < 0 ? -1 * balance + 10 : 10;
  }

  private resetForm(): void {
    this.paymentForm.reset();
    this.fileUpload.clear();
  }
}
