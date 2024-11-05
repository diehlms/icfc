import { ToastTypes, toastStore } from '$lib/stores';

export const createEntity = (
	payload: object,
	entityName: string,
	callback: (payload: object) => Promise<void>
): void => {
	callback(payload)
		.then(() => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: `${entityName} added!`,
				type: ToastTypes.success
			}));
		})
		.catch((error) => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: error,
				type: ToastTypes.error
			}));
		});
};

export const deleteEntity = (
	id: number,
	payload: object,
	entityName: string,
	callback: (id: number, payload: object) => Promise<void>
): void => {
	callback(id, payload)
		.then(() => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: `${entityName} deleted!`,
				type: ToastTypes.success
			}));
		})
		.catch((error) => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: error,
				type: ToastTypes.error
			}));
		});
};

export const editEntity = (
	id: number,
	payload: object,
	entityName: string,
	callback: (id: number, payload: object) => Promise<void>
): void => {
	callback(id, payload)
		.then(() => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: `${entityName} updated!`,
				type: ToastTypes.success
			}));
		})
		.catch((error: any) => {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: error,
				type: ToastTypes.error
			}));
		});
};
