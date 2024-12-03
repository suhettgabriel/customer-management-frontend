import { Component } from '@angular/core';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  customers: Customer[] = [];
  editingCustomer: Customer | null = null;

  handleCustomerAdded(customer: Customer): void {
    this.customers.push(customer);
  }

  saveCustomer(customer: Customer): void {
    const index = this.customers.findIndex(c => c.customerId === customer.customerId);
    if (index !== -1) {
      this.customers[index] = customer;
    }
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = customer;
  }

  onCustomerDeleted(customerId: string): void {
    this.customers = this.customers.filter(c => c.customerId !== customerId);
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }
}
