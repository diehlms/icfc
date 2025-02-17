import type { SelectOptionType } from 'flowbite-svelte/dist/types';
import { toSnakeCase } from './textFormatting';

export enum FormTypes {
	text = 'text',
	number = 'number',
	checkbox = 'checkbox',
	select = 'select',
	password = 'password',
	richText = 'richText',
	attachment = 'attachment',
	datetime = 'datetime-local'
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

	text(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.text));
		return this;
	}

	richText(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.richText));
		return this;
	}

	attachment(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.attachment));
		return this;
	}

	checkbox(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.checkbox));
		return this;
	}

	dateTime(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.datetime));
		return this;
	}

	password(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.password));
		return this;
	}

	number(name: string): FormBuilder {
		this.formInputs.push(new FormInput(name, FormTypes.number));
		return this;
	}

	select(options: any, name: string): FormBuilder {
		this.formInputs.push(
			new FormInput(name, FormTypes.select, undefined, undefined, undefined, undefined, options)
		);
		return this;
	}

	build(data?: any): FormInput[] {
		if (data === undefined) {
			return this.formInputs;
		} else {
			this.formInputs.forEach((input) => {
				const snakeCaseKey = toSnakeCase(input.name);
				if (data[snakeCaseKey] !== undefined) {
					if (input.type === FormTypes.datetime) {
						const dateStr = data[snakeCaseKey];
						if (dateStr.length === 10) {
							// "YYYY-MM-DD" format
							// Append default time "T00:00"
							input.value = `${dateStr}T00:00`;
						} else {
							// If it already has time component, just format it
							const dateTime = new Date(dateStr);
							dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());
							input.value = dateTime.toISOString().slice(0, 16);
						}
					} else if (input.type === FormTypes.select) {
						const selectedOption = input.selectOptions?.filter(
							(option) => option.name === data[snakeCaseKey].location_name
						);
						input.value = selectedOption[0].value;
					} else {
						input.value = data[snakeCaseKey];
					}
				}
			});
			return this.formInputs;
		}
	}
}

export default FormBuilder;
