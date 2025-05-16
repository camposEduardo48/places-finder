"use client";

import "dotenv/config";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Aurora from "../../../../assets/bg-aurora";

const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API;

const FinderPage = () => {
	const [giveAddress, setAddress] = useState<[] | null>([]);

	const form = useForm({
		defaultValues: {
			cepValue: "",
		},
	});

	const getCep = async () => {
		try {
			const searchCep = await axios.get(
				`${apiBrasil}/${form.getValues("cepValue")}`,
			);
			form.reset();
			return setAddress(searchCep.data);
		} catch (error) {
			console.log(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		//cleanup function
		return () => {};
	}, []);

	return (
		<main className="flex h-[100vh] p-10 items-start gap-10">
			<Card className="h-auto w-full text-gray-200 bg-stone-800 border-none">
				<span className="px-4">
					<small>
						Adicionar o background do React Bits: PARTICLES || AURORA
					</small>
				</span>
				<CardHeader>
					<h2 className="text-2xl"> Localizador 48</h2>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							className="flex flex-col gap-4"
							onSubmit={form.handleSubmit(getCep)}
						>
							<FormField
								control={form.control}
								name="cepValue"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Digite o cep</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Cep ex: 08033219..."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											<span
												className={
													form.watch("cepValue").length > 0 ? "p-2" : null
												}
											>
												{form.watch("cepValue").length > 0 ? (
													<small>searching...</small>
												) : null}
											</span>
											{/* <Skeleton className="bg-stone-900 h-8 w-full" /> */}
										</FormDescription>
										<FormMessage title="Insira os dados corretamente" />
									</FormItem>
								)}
							/>
							<Button
								className="cursor-pointer"
								type="submit"
								onLoad={Skeleton}
								disabled={form.watch("cepValue").length < 8}
							>
								Pesquisar
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>rodapé</CardFooter>
			</Card>
			<Card className="h-auto w-full text-gray-200 bg-stone-800 border-none">
				<CardHeader>
					Resultado da busca
					<CardDescription>lorem</CardDescription>
				</CardHeader>
				<CardContent>
					{giveAddress && (
						<section className="p-2">
							<span key={giveAddress.cep}>
								<p>{giveAddress.street}</p>
								<p>
									{giveAddress.city}, {giveAddress.state}
								</p>
							</span>
						</section>
					)}
				</CardContent>
				<CardFooter>rodapé 2</CardFooter>
			</Card>
		</main>
	);
};

export default FinderPage;
