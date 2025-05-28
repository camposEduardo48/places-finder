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
import { Signpost, LocationCity, MarkunreadMailbox } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API;
// const apiBrasilClima = process.env.NEXT_PUBLIC_BRASIL_API_CLIMA;
const actualDate = dayjs(new Date()).format("HH:mm - DD/MM/YYYY");

interface TypeApiBrasil {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

const FinderPage = () => {
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [giveAddress, setAddress] = useState<TypeApiBrasil>();
  const [loadedDatas, setLoadedDatas] = useState<boolean | null>();

  const form = useForm({
    defaultValues: {
      cepValue: "",
    },
  });

  const getCep = async () => {
    setIsLoading(false);
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
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1500);
    //cleanup function
    // return () => clearTimeout(timer);
  }, []);

  return (
    <main
      onLoad={() => setTheme("dark")}
      className="box-content flex flex-col gap-6 lg:w-[600px] h-[100vh] max-sm:justify-center justify-center max-sm:items-center items-center max-sm:w-full lg:max-w-[70%]"
    >
      <Card className="h-auto min-w-[350px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
        <CardHeader className="flex items-center gap-3">
          <MapPin size={30} color="gray" />
          <h2 className="text-2xl"> Localizador 48</h2>
        </CardHeader>
        <Separator color="black" />
        <CardContent>
          <Form {...form}>
            <small>Digite o cep</small>
            <form
              className="flex max-sm:flex-col border-2 border-pink-500 justify-between w-full"
              onSubmit={form.handleSubmit(getCep)}
            >
              <FormField
                control={form.control}
                name="cepValue"
                render={({ field }) => (
                  <FormItem className="flex border-2 border-b-blue-400 mt-2 items-center">
                    <FormControl>
                      <Input
                        className="h-[50px] w-full mt-0 border-none bg-stone-900"
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
                className={`cursor-pointer dark:bg-stone-900 p-3 h-full w-auto ${form.watch("cepValue").length === 8 ? "border-2 border-[#00ff00]" : "none"}`}
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
                    className="h-5 w-5"
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
      {form.watch("cepValue").padStart(1) && (
        <Card className="h-auto min-w-[350px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
          <CardHeader className="w-full text-white">
            {loadedDatas && (
              <>
                <p className="text-lg">Resultado da pesquisa</p>
                <p className="text-stone-500">
                  <small>{actualDate}</small>
                </p>
              </>
            )}
          </CardHeader>
          {isLoading ? <Separator /> : null}
          <CardContent className="w-full p-0">
            {loadedDatas || form.watch("cepValue").length > 0 ? (
              <section className="flex flex-col items-start justify-start p-4 gap-4 bg-stone-800 min-h-[300px] h-auto max-h-[500px] overflow-y-auto w-full rounded-xl text-xl">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {!loadedDatas && (
                    <Loader2
                      className="w-[100px] animate-spin text-muted-foreground"
                      size={100}
                    />
                  )}
                  <ul>
                    <li className="pb-4">
                      {isLoading ? (
                        <Skeleton className="h-[20px] w-full" />
                      ) : (
                        <span className="flex items-center gap-2">
                          <LocationCity />
                          <p>
                            <small>Bairro</small>
                          </p>
                        </span>
                      )}
                      {giveAddress?.neighborhood}
                    </li>
                    <li className="pb-5">
                      <span className="flex items-center gap-2">
                        <Signpost />
                        <p>
                          <small>Rua/Avenida</small>
                        </p>
                      </span>
                      <p className="text-3xl">
                        {isLoading ? (
                          <Skeleton className="h-[40px] bg-stone-600 w-full" />
                        ) : (
                          <b>{giveAddress?.street}</b>
                        )}
                      </p>
                    </li>
                    <li className="pb-3">
                      <span className="flex items-center gap-2">
                        <MarkunreadMailbox />
                        <p>
                          <small>Cep</small>
                        </p>
                      </span>
                      <p>
                        {loadedDatas && (
                          <small className="text-stone-500">
                            {giveAddress?.cep}
                          </small>
                        )}
                      </p>
                    </li>
                  </ul>
                </motion.div>
              </section>
            ) : null}
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default FinderPage;
