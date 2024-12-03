import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
  @Input() editingCustomer: Customer | null = null;
  @Output() customerAdded = new EventEmitter<Customer>();
  @Output() customerUpdated = new EventEmitter<Customer>();
  @Output() cancelEdit = new EventEmitter<void>();

  customer: Customer = { customerId: '', companyName: '', companySize: '' };
  companySizes = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

  ngOnChanges() {
    if (this.editingCustomer) {
      this.customer = { ...this.editingCustomer };
    } else {
      this.resetForm();
    }
  }

  saveCustomer() {
    if (this.editingCustomer) {
      this.customerUpdated.emit(this.customer);
    } else {
      this.customerAdded.emit(this.customer);
    }
    this.resetForm();
  }

  cancelEditing() {
    this.resetForm();
    this.cancelEdit.emit();
  }

  resetForm() {
    this.customer = { customerId: '', companyName: '', companySize: '' };
  }
}
