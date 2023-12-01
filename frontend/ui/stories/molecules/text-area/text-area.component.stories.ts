import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  ErrorInputComponent,
  IconClearComponent,
  LabelComponent,
  LabelType,
  TextAreaComponent,
  TextAreaType,
} from '../../../components';

type StoryDetails = {
  label: LabelType;
};

type StoryComponent = TextAreaType & StoryDetails;

type Story = StoryObj<StoryComponent>;

const sharedFormControl = new FormControl('', Validators.required);

const meta: Meta<StoryComponent> = {
  title: 'Components/Molecules/TextArea',
  component: TextAreaComponent,
  //👇 Import both components to allow component compositing with Storybook
  decorators: [
    moduleMetadata({
      declarations: [
        TextAreaComponent,
        LabelComponent,
        ErrorInputComponent,
        IconClearComponent,
      ],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    variant: {
      options: ['text-area-base'],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
  render: (args: StoryComponent) => {
    const { label, ...textAreaProps } = args;
    const { variant, ...labelProps } = label;

    return {
      props: { textAreaProps, labelProps, sharedFormControl, variant },
      template: `
      <c-label [variant]="variant" [for]="textAreaProps.id">
        Label text
        <c-text-area
        [variant]="textAreaProps.variant"
        [placeholder]="textAreaProps.placeholder"
        [formControl]="sharedFormControl"
        [disabled]="textAreaProps.disabled"
        [id]="textAreaProps.id"
        [name]="textAreaProps.name"></c-text-area>
      </c-label>

      `,
    };
  },
};
export default meta;

export const PrimaryInput: Story = {
  args: {
    variant: 'text-area-base',
    placeholder: 'Entry text',
    name: 'example',
    id: 'example',
    disabled: false,
    label: {
      variant: 'label-base',
    },
  },
};
