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
import { Search } from "lucide-react";

const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API;
const apiBrasilClima = process.env.NEXT_PUBLIC_BRASIL_API_CLIMA;

const FinderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [giveAddress, setAddress] = useState<[] | null>([]);
  const [loadedDatas, setLoadedDatas] = useState<boolean | null>();

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
      const statusReq = searchCep.status === 200;
      setLoadedDatas(statusReq);
      console.log(searchCep.data.state);
      if (searchCep) {
      }
      form.reset();
      return setAddress(searchCep.data);
    } catch (error) {
      console.log(error);
    }
  };

  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    //cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col lg:w-[600px] h-[100vh] p-10 items-center gap-2 max-w-[70%]">
      <Card className="lg:flex-col h-auto min-w-[400px] w-full text-gray-200 bg-stone-800 border-none">
        <CardHeader>
          <h2 className="text-2xl"> Localizador 48</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <small>Digite o cep</small>
            <form
              className="flex justify-between w-full items-center"
              onSubmit={form.handleSubmit(getCep)}
            >
              <FormField
                control={form.control}
                name="cepValue"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                      <Input
                        className="h-[50px] w-100 border-none bg-stone-900"
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
                      ></span>
                      {/* <Skeleton className="bg-stone-900 h-8 w-full" /> */}
                    </FormDescription>
                    <FormMessage title="Insira os dados corretamente" />
                  </FormItem>
                )}
              />
              <Button
                className="cursor-pointer h-[40px] w-[50px]"
                type="submit"
                disabled={form.watch("cepValue").length < 8}
              >
                <Search size={30} />
              </Button>
            </form>
            {form.watch("cepValue").length > 0 ? (
              <small>searching...</small>
            ) : null}
          </Form>
        </CardContent>
        <CardFooter>{loadedDatas ? null : new Date().getFullYear()}</CardFooter>
      </Card>
      <Card className="h-auto min-w-[400px] max-w-[600px] w-full text-gray-200 bg-transparent border-none">
        <CardHeader>
          {loadedDatas ? (
            <>
              Resultado da busca
              <CardDescription>{`${new Date().getHours()}:${new Date().getMinutes()}h	`}</CardDescription>
            </>
          ) : (
            <>{null}</>
          )}
        </CardHeader>
        <CardContent>
          {loadedDatas ? (
            <section className="bg-stone-900 min-h-[160px] rounded-xl text-xl">
              <p>
                {isLoading ? (
                  <Skeleton className="h-[16px] w-full" />
                ) : (
                  <b>{giveAddress.neighborhood}</b>
                )}
              </p>
              <span key={giveAddress.cep}>
                <p>
                  {isLoading ? (
                    <Skeleton className="h-[16px] w-full" />
                  ) : (
                    <b>
                      {giveAddress.city}, {giveAddress.state}
                    </b>
                  )}
                </p>
                <p className="text-lg">
                  {isLoading ? (
                    <Skeleton className="h-[16px] w-full" />
                  ) : (
                    <b>{giveAddress.street}</b>
                  )}
                </p>
              </span>
            </section>
          ) : (
            <section className="h-auto min-h-[160px]">{""}</section>
          )}
        </CardContent>
        <CardFooter>{""}</CardFooter>
      </Card>
    </main>
  );
};

export default FinderPage;
