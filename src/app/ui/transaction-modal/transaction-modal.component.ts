import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from '../../entities/interfaces';
import { AccountManagerService } from 'src/app/services/account-manager.service';
import { TransactionType } from 'src/app/entities/enums';
import { LocalStorageCustomerDataService } from 'src/app/services/local-storage-customer-data.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {

  @Input('customer') customer?: ICustomer;

  form: FormGroup = this.formBuilder.group({
    fromAccount: [undefined, Validators.required],
    toAccount: [undefined, Validators.required],
    amount: [undefined, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private accountService: AccountManagerService, private lsCustomer: LocalStorageCustomerDataService) { }

  submitOperation() {
    const fromAccount = this.form.get('fromAccount')?.value;
    const toAccount = this.form.get('toAccount')?.value;
    const amount = this.form.get('amount')?.value;

    this.accountService.addTransaction(fromAccount, amount, TransactionType.TRANSFER).subscribe({
      next: (fam) => {
        this.accountService.addTransaction(toAccount, amount, TransactionType.DEPOSIT).subscribe({
          next: (tam) => {
            this.customer!.accounts = [fam, tam];
            this.lsCustomer.setCustomer(this.customer!);
            this.activeModal.dismiss();
          },
          error: (error) => {
            alert(error);
          }
        });
      },
      error: (error) => {
        alert(error);
      }
    });
  }
}
