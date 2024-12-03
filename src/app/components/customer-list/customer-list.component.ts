import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Output() customerDeleted = new EventEmitter<string>();
  @Output() customerEdited = new EventEmitter<Customer>();

  deleteCustomer(customerId: string) {
    this.customerDeleted.emit(customerId);
  }

  editCustomer(customer: Customer) {
    this.customerEdited.emit(customer);
  }
}
