"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";
import { Clock, Loader2, MapPin, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API;
// const apiBrasilClima = process.env.NEXT_PUBLIC_BRASIL_API_CLIMA;

interface TypeApiBrasil {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

const FinderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [giveAddress, setAddress] = useState<TypeApiBrasil>();
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
      form.reset();

      if (statusReq) {
        setAddress(searchCep.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    //cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col lg:w-[600px] h-[100vh] p-10 items-center gap-2 max-w-[70%]">
      <Card className="lg:flex-col h-auto min-w-[400px] w-full text-gray-200 bg-stone-800 border-none">
        <CardHeader className="flex items-center gap-3">
          <MapPin size={30} color="gray" />
          <h2 className="text-2xl"> Localizador 48</h2>
        </CardHeader>
        <Separator color="black" />
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
                  <FormItem className="flex mt-2 items-center">
                    <FormControl>
                      <Input
                        className="h-[50px] w-100 mt-0 border-none bg-stone-900"
                        type="number"
                        placeholder="Cep ex: 08033219..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription
                      className={form.watch("cepValue").length > 0 ? "p-2" : ""}
                    >
                      {/* <Skeleton className="bg-stone-900 h-8 w-full" /> */}
                    </FormDescription>
                    <FormMessage title="Insira os dados corretamente" />
                  </FormItem>
                )}
              />
              <Button
                className={`cursor-pointer h-full w-auto ${form.watch("cepValue").length === 8 ? "border-2 border-[#00ff00]" : "none"}`}
                type="submit"
                disabled={form.watch("cepValue").length < 8}
              >
                {form.watch("cepValue").length > 0 &&
                form.watch("cepValue").length <= 7 ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  <Search
                    color={
                      form.watch("cepValue").length === 8 ? "#00ff00" : "#fff"
                    }
                    size={30}
                  />
                )}
              </Button>
            </form>
            {form.watch("cepValue").length > 0 ? (
              <small className="p-2 text-stone-500">searching...</small>
            ) : (
              <small className="p-2 text-stone-500">{""}</small>
            )}
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end text-stone-500">
          <small>Sopmac&copy; {new Date().getFullYear()}</small>
        </CardFooter>
      </Card>
      <Card className="h-auto min-w-[400px] max-w-[600px] w-full text-gray-200 bg-transparent shadow-none border-none">
        <CardHeader>
          {loadedDatas ? (
            <section>
              Resultado da busca
              <CardDescription className="flex items-center gap-1">
                <Suspense fallback={<p>Loading tararan...</p>}>
                  <p>{`${dayjs(new Date()).format("HH:mm - DD/MM/YYYY")}`}</p>
                  <span>
                    <Clock size="15" />
                  </span>
                </Suspense>
              </CardDescription>
            </section>
          ) : (
            <>{null}</>
          )}
        </CardHeader>
        <CardContent className="w-full">
          {loadedDatas || form.watch("cepValue").length > 0 ? (
            <section className="flex flex-col gap-4 bg-stone-900 min-h-[300px] h-auto max-h-[500px] overflow-y-auto w-full rounded-xl text-xl">
              <motion.div animate={{ y: 20 }}>
                <p>
                  {isLoading ? (
                    <Skeleton className="h-[20px] w-full" />
                  ) : (
                    <b>{giveAddress?.neighborhood}</b>
                  )}
                </p>
                <p className="text-4xl">
                  {isLoading ? (
                    <Skeleton className="h-[40px] bg-stone-600 w-full" />
                  ) : (
                    <b>{giveAddress?.street}</b>
                  )}
                </p>
                <div>
                  {isLoading ? (
                    <Skeleton className="h-[40px] bg-stone-600 w-full" />
                  ) : (
                    <p>{`${giveAddress?.city}, ${giveAddress?.state}`}</p>
                  )}
                </div>
                <span>
                  {isLoading ? (
                    <Skeleton className="h-[16px] w-full" />
                  ) : (
                    <p>
                      <small className="text-stone-500">
                        Cep: {giveAddress?.cep}
                      </small>
                    </p>
                  )}
                </span>
                {/* meu loader de carregamento */}
                {/* <span
                  className="flex items-center justify-center"
                  key={giveAddress?.cep}
                >
                  <div>
                    {isLoading ? (
                      <Skeleton className="h-[16px] w-full" />
                    ) : (
                      <div className="flex items-center justify-center w-100 border">
                        <Loader2 className="h-20 w-20 animate-spin text-stone-600" />
                      </div>
                    )}
                  </div>
                </span> */}
              </motion.div>
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
