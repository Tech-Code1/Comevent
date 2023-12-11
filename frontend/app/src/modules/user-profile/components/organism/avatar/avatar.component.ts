import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  ButtonComponent,
  IconEditComponent,
  TitleComponent,
} from '@ui/components';
import { Swal } from '../../../../../utils';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    TranslateModule,
    IconEditComponent,
    ReactiveFormsModule,
  ],
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AvatarComponent {
  @Input({ required: true }) loadingProfile!: boolean;
  @Input({ required: true }) avatarControl!: FormControl;
  @Input({ required: true }) currentAvatarUrl!: string | null | undefined;
  @Input({ required: true }) currentUserName!: string | null | undefined;
  @Input({ required: true }) currentEmail!: string | null | undefined;
  private controlContainer = inject(ControlContainer);
  private formBuilder = inject(NonNullableFormBuilder);

  editingfile: any = undefined;

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  uploadedPicture(event: any) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files[0]) {
      const file = element.files[0];

      // Validación de Tipo de Archivo
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        Swal.error('Por favor, selecciona una imagen válida (JPEG, PNG, GIF)');
        return;
      }

      // Validación de Tamaño de la Imagen (ejemplo: 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        Swal.error('El tamaño del archivo es demasiado grande. Máximo 5MB');
        return;
      }

      //this.changeAvatar.setValue(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        // the result image data
        this.editingfile = e.target?.result;
        this.avatarControl.setValue(file);
      };
      reader.readAsDataURL(file);
    } else {
      Swal.error('Ocurrió un error al seleccionar la imagen');
    }
  }
}
