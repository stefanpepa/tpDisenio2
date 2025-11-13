import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user/user-module'
import { UserServices } from '../../services/user-services'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
  imports: [CommonModule, FormsModule, NgbModule]
})

export class UserListComponent implements OnInit {
  users: User[] = []
  user: User = new User()
  userToEdit: User = new User()

  constructor(private service: UserServices, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getUsers().subscribe({
      next: (response: User[]) => this.users = response,
      error: (err: any) => console.error(err)
    })
  }

  save(): void {
    this.service.save(this.user).subscribe({
      next: (response: User) => {

        if (response.age == null || response.name.trim() === '' || response.lastName.trim() === '') {
          alert("No puede haber campos vacíos")
          return
        }

        if (typeof response.age !== "number" && response.age > 0) {
          alert("La edad debe ser un numero y no puede ser negativa.")
          return
        }

        this.users.push(response)
        this.user = new User()
        this.clearInputs()
      },
      error: (err) => console.error(err)
    })
  }

  delete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id)
          alert('Usuario eliminado correctamente')
        },
        error: (err) => console.error(err)
      })
    }
  }

  openEditModal(content: any, user: User): void {
    this.userToEdit = { ...user }
    this.modal.open(content, { size: 'lg' })
  }


  update(): void {
    this.service.update(this.userToEdit.id, this.userToEdit).subscribe({
      next: (userToEdit: User) => {
        const index = this.users.findIndex(u => u.id === userToEdit.id);



        if (index !== -1) {
          this.users[index] = userToEdit;
        }

        if (
          userToEdit.age !== null &&
          userToEdit.name.trim() !== '' &&
          userToEdit.lastName.trim() !== ''
        ) {
          if (typeof userToEdit.age === 'number' && userToEdit.age >= 0) {
            this.modal.dismissAll();
          } else {
            alert('La edad debe ser un número y no puede ser negativa.');
            return;
          }
        } else {
          alert('No puede haber campos vacíos ni letras en la edad');
          return;
        }
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      },
    });
  }

  onCancel(): void {
    if (
      this.userToEdit.age === null ||
      this.userToEdit.name.trim() === '' ||
      this.userToEdit.lastName.trim() === ''
    ) {
      alert('No puede salir sin completar los campos');
      return;
    }

    if (typeof this.userToEdit.age !== 'number' || this.userToEdit.age < 0) {
      alert('La edad debe ser un número válido');
      return;
    }

    this.modal.dismissAll();
  }



  clearInputs(): void {
    document.getElementsByTagName('input')[1].value = ''
    document.getElementsByTagName('input')[2].value = ''
    document.getElementsByTagName('input')[3].value = ''
    document.getElementsByTagName('input')[1].focus()
  }
}
