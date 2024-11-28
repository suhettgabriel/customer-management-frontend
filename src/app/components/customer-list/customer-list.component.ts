import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { id: 0, companyName: '', companySize: 1 };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Carregar todos os clientes
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  // Criar ou atualizar cliente
  saveCustomer(): void {
    if (this.newCustomer.id) {
      this.customerService.updateCustomer(this.newCustomer.id, this.newCustomer).subscribe(() => {
        this.loadCustomers();
        this.resetForm();
      });
    } else {
      this.customerService.createCustomer(this.newCustomer).subscribe(() => {
        this.loadCustomers();
        this.resetForm();
      });
    }
  }

  // Deletar cliente
  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  // Preencher o formulário para edição
  editCustomer(customer: Customer): void {
    this.newCustomer = { ...customer };
  }

  // Resetar o formulário
  resetForm(): void {
    this.newCustomer = { id: 0, companyName: '', companySize: 1 };
  }
}
