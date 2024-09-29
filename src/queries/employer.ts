import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Employee, Employer } from "@/types/employer";
import { AxiosError } from "axios";

export async function getEmployer() {
	try {
		const res = await apiClient.get<IResponse<Employer>>("/employer/details");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getEmployee(employeeId: string) {
	try {
		const res = await apiClient.get<IResponse<Employee>>(
			`/employee/${employeeId}`
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllEmployees() {
	try {
		const res = await apiClient.get<IResponse<Employee[]>>("/employee");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}