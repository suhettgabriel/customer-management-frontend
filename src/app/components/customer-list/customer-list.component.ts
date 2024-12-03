import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Output() customerDeleted = new EventEmitter<string>();
  @Output() customerEdited = new EventEmitter<Customer>();

  constructor(private customerService: CustomerService) {}

  deleteCustomer(customerId: string): void {
    console.log('Attempting to delete customer with ID:', customerId); // Debug: Verifique o ID aqui

    if (customerId && customerId.trim() !== '') {
      this.customerService.deleteCustomer(customerId).subscribe(
        () => {
          this.customerDeleted.emit(customerId); // Emite o evento de exclusão
        },
        (error) => {
          console.error('Error deleting customer:', error);
        }
      );
    } else {
      console.error('Invalid customerId');
    }
  }

  updateCustomer(customerId: string, updatedCustomer: Customer): void {
    console.log('Attempting to update customer with ID:', customerId);

    if (customerId && customerId.trim() !== '') {
      this.customerService.updateCustomer(customerId, updatedCustomer).subscribe(() => {
        console.log('Customer updated successfully');
      }, error => {
        console.error('Error updating customer:', error);
      });
    } else {
      console.error('Invalid customerId');
    }
  }

  editCustomer(customer: Customer): void {
    console.log('Editing customer:', customer);  // Verificando se o cliente está sendo passado corretamente
    this.customerEdited.emit(customer);
  }
}
