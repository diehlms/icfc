import type { SelectOptionType } from 'flowbite-svelte/dist/types';

export enum FormTypes {
	text = 'text',
	number = 'number',
	checkbox = 'checkbox',
	select = 'select',
	password = 'password'
}

export class FormInput {
	constructor(
		public name: string,
		public type: FormTypes,
		public defaultBoolVal?: boolean,
		public uneditable?: boolean,
		public value?: any,
		public error?: string,
		public selectOptions?: SelectOptionType[]
	) {}
}

class FormBuilder {
	private formInputs: FormInput[] = [];

	constructor() {}

	name(valueOverride?: string): FormBuilder {
		this.formInputs.push(new FormInput(valueOverride ? valueOverride : 'name', FormTypes.text));
		return this;
	}

	description(): FormBuilder {
		this.formInputs.push(new FormInput('description', FormTypes.text));
		return this;
	}

	email(): FormBuilder {
		this.formInputs.push(new FormInput('email', FormTypes.text));
		return this;
	}

	phoneNumber(): FormBuilder {
		this.formInputs.push(new FormInput('phoneNumber', FormTypes.number | FormTypes.text));
		return this;
	}

	isActive(valueOverride?: string): FormBuilder {
		this.formInputs.push(
			new FormInput(valueOverride ? valueOverride : 'isActive', FormTypes.checkbox)
		);
		return this;
	}

	dataAccess(valueOverride?: string): FormBuilder {
		this.formInputs.push(
			new FormInput(valueOverride ? valueOverride : 'dataAccess', FormTypes.checkbox)
		);
		return this;
	}

	enabled(): FormBuilder {
		this.formInputs.push(new FormInput('enabled', FormTypes.checkbox));
		return this;
	}

	password(): FormBuilder {
		this.formInputs.push(new FormInput('password', FormTypes.password));
		return this;
	}

	role(): FormBuilder {
		const selectOptions: SelectOptionType[] = [
			{
				value: 'SUPER_ADMIN',
				name: 'Super Admin'
			},
			{
				value: 'SERVICE_USER_WRITE',
				name: 'Service User Write'
			},
			{
				value: 'SERVICE_USER_READ',
				name: 'Service User Read'
			},
			{
				value: 'USER',
				name: 'User'
			}
		];

		this.formInputs.push(
			new FormInput('role', FormTypes.select, undefined, true, undefined, undefined, selectOptions)
		);
		return this;
	}

	build(data?: any): FormInput[] {
		if (data === undefined) {
			// blank form
			return this.formInputs;
		} else {
			this.formInputs.forEach((input) => {
				if (data[input.name] !== undefined) {
					input.value = data[input.name];
				}
			});
			return this.formInputs;
		}
	}
}

export default FormBuilder;
