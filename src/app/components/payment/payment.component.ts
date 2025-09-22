import { Component, inject, ViewChild } from '@angular/core';
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
  private fb = inject(NonNullableFormBuilder);

  @ViewChild(FileUpload) fileUpload!: FileUpload;
  protected qrCode = environment.qrCodeUrl;

  protected paymentForm = this.fb.group({
    amount: this.fb.control(this.getStartAmount(), [
      Validators.required,
      Validators.min(0.01),
    ]),
    proof_picture: this.fb.control<File | null>(null, [Validators.required]),
    description: this.fb.control(''),
  });

  protected onSelect(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) {
      this.paymentForm.patchValue({ proof_picture: file });
      this.paymentForm.controls.proof_picture.markAsDirty();
    }
  }

  protected sendPayment(): void {
    const value = this.paymentForm.getRawValue();
    const activePerson = this.cartService.activePerson();

    if (this.paymentForm.invalid || !activePerson || !value.proof_picture)
      return;

    this.apiService
      .createPayment({
        by: activePerson.id,
        proof_picture: value.proof_picture,
        description: value.description,
        amount: value.amount,
      })
      .subscribe({
        next: (payment) => {
          alert(
            `Successfully sent payment of €${value.amount}! will be added when confirmed`,
          );
          this.resetForm();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          alert('Something went wrong. status/statusText');
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
