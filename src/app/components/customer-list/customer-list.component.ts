import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})

export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { customerId: '', companyName: '', companySize: 1 };
  editingCustomerId: string | null = null;
  showDeleteModal: boolean = false;
  customerToDelete: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  saveCustomer(): void {
    if (this.newCustomer.customerId) {
      this.customerService
        .updateCustomer(this.newCustomer.customerId, this.newCustomer)
        .subscribe(() => {
          this.loadCustomers();
          this.resetForm();
        });
    } else {
      this.customerService.addCustomer(this.newCustomer).subscribe(() => {
        this.loadCustomers();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.newCustomer = { customerId: '', companyName: '', companySize: 1 };
  }

  startEditing(customerId: string): void {
    this.editingCustomerId = customerId;
  }

  saveEdit(customer: Customer): void {
    this.customerService.updateCustomer(customer.customerId, customer).subscribe(() => {
      this.editingCustomerId = null;
      this.loadCustomers();
    });
  }

  confirmDelete(customerId: string): void {
    this.customerToDelete = customerId;
    this.showDeleteModal = true;
  }

  deleteCustomer(): void {
    if (this.customerToDelete) {
      this.customerService.deleteCustomer(this.customerToDelete).subscribe(() => {
        this.showDeleteModal = false;
        this.customerToDelete = null;
        this.loadCustomers();
      });
    }
  }

  closeModal(): void {
    this.showDeleteModal = false;
    this.customerToDelete = null;
  }
}


