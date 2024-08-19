"use server";

import { signIn } from "@/auth"
import z from "zod";
import { AuthError } from "next-auth";

export const login = async (email: string, password: string) => {
	try {
		const parsedCredentials = z.object({
			email: z.string().email(),
			password: z.string(),
		}).safeParse({
			email,
			password
		});

		if (parsedCredentials.success) {
			await signIn('credentials', {
				username: email,
				password: password,
				redirect: false,
			});
			return {
				types: "success",
			}
		} else {
			return {
				types: "error"
			}
		}
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				types: "error"
			}
		}
	}
}
