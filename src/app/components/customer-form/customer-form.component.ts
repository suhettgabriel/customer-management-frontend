import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  @Output() customerAdded = new EventEmitter<Customer>();
  @Output() customerUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Input() editingCustomer: Customer | null = null;

  customer: Customer = {
    customerId: '',
    companyName: '',
    companySize: 0,
  };

  // Injeção do CustomerService no construtor
  constructor(private customerService: CustomerService) {}

  ngOnChanges(): void {
    if (this.editingCustomer) {
      // Certifique-se de que o customerId seja copiado corretamente para o formulário
      this.customer = { ...this.editingCustomer };
    }
  }

  // Método de adicionar cliente
  addCustomer(): void {
    this.customerService.addCustomer(this.customer).subscribe((newCustomer: Customer) => {
      this.customerAdded.emit(newCustomer); // Emitir novo cliente
      this.resetForm();
    });
  }

  // Método para salvar a edição
  saveCustomer(): void {
    if (this.customer.customerId) {
      this.customerService.updateCustomer(this.customer.customerId, this.customer).subscribe(() => {
        this.customerUpdated.emit();
        this.resetForm();
      }, error => {
        console.error('Error updating customer:', error);
      });
    } else {
      console.error('Invalid customer ID for update');
    }
  }

  // Método para cancelar edição
  cancelEditing(): void {
    this.cancelEdit.emit();
    this.resetForm();
  }

  // Limpar o formulário
  private resetForm(): void {
    this.customer = { customerId: '', companyName: '', companySize: 0 };
  }
}
