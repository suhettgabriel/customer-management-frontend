import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'customer-management-frontend';
  customers: Customer[] = [];
  editingCustomer: Customer | null = null; // Variável para controle de edição

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();  // Carregar os clientes ao iniciar o componente
  }

  // Método para carregar a lista de clientes do backend
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  // Método para adicionar um novo cliente à lista
  handleCustomerAdded(newCustomer: Customer): void {
    this.customers.push(newCustomer);
  }

  // Método para remover o cliente da lista após a exclusão
  onCustomerDeleted(customerId: string): void {
    this.customers = this.customers.filter(
      (customer) => customer.customerId !== customerId
    );
  }

  // Método para editar o cliente
  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer }; // Cria uma cópia do cliente a ser editado
  }

  // Método para salvar as edições no cliente
  saveCustomer(): void {
    if (this.editingCustomer) {
      this.customerService
        .updateCustomer(this.editingCustomer.customerId, this.editingCustomer)
        .subscribe((updatedCustomer) => {
          const index = this.customers.findIndex(
            (customer) => customer.customerId === updatedCustomer.customerId
          );
          if (index !== -1) {
            this.customers[index] = updatedCustomer; // Atualiza o cliente na lista
          }
          this.editingCustomer = null; // Limpa o formulário de edição
        });
    }
  }

  // Método para cancelar a edição
  cancelEdit(): void {
    this.editingCustomer = null;
  }
}
