"use client"

// import "dotenv/config"
import { Button } from "@/components/ui/button"
// console.log(Button)
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
//console.log(Card, CardContent, CardFooter, CardHeader)
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
// console.log(Form, FormControl, FormField, FormItem, FormMessage)
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
// import { motion } from "framer-motion"
// console.log(Input, Skeleton, useForm, useEffect, useState, motion)
import axios from "axios"
// import dayjs from "dayjs"
// console.log(axios, dayjs)
import {
  BookMarked,
  Clock,
  Loader2,
  Signpost,
  MapPin as Locate,
  Search,
} from "lucide-react"
// console.log(BookMarked, Clock, Loader2, Locate, Signpost, MapPin, Search)
import { Separator } from "@/components/ui/separator"
import Informations from "@/app/_components/info"
import { InfoContext, useInfo } from "@/context/textContext"
// console.log(Separator)
// import { useTheme } from "next-themes";
// const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API
// const apiBrasilClima = process.env.NEXT_PUBLIC_BRASIL_API_CLIMA;
// const actualDate = dayjs(new Date()).format("HH:mm - DD/MM/YYYY")

interface TypeApiBrasil {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

const FinderPage = () => {
  // const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false)
  const [giveAddress, setAddress] = useState<TypeApiBrasil>()
  const [loadedDatas, setLoadedDatas] = useState<boolean>()
  console.log("Ícones:", { Locate, Signpost, BookMarked, Loader2 })
  const form = useForm({
    defaultValues: {
      cepValue: "",
    },
  })

  const getCep = async () => {
    setIsLoading(true)
    try {
      setTimeout(async () => {
        const searchCep = await axios.get(
          `${"https://brasilapi.com.br/api/cep/v1"}/${form.getValues("cepValue")}`,
        )
        const statusReq = searchCep.status === 200
        setLoadedDatas(statusReq)
        console.log(statusReq)
        console.log(searchCep.data.state)
        form.reset()
        if (statusReq) {
          setAddress(searchCep.data)
        }
      }, 1700)
    } catch (error) {
      console.log(error)
    }
  }

  const { count, increment } = useInfo()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   return () => {}
  // }, [])

  return (
    <main className="box-content flex flex-col gap-6 lg:w-[600px] h-[100vh] max-sm:justify-center justify-center max-sm:items-center items-center max-sm:w-full lg:max-w-[70%]">
      <Card className="h-auto min-w-[350px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
        <CardHeader className="flex items-center gap-3">
          {/* <MapPin size={30} color="gray" /> */}
          <h2 className="text-2xl"> Localizador 48</h2>
          <p>
            <small>
              erro build pode estar relacionado a importação de arquivos
              incorreta ou com a condição ternaria
            </small>
          </p>
          <Informations>
            Results: {count}
            <Button
              className="cursor-pointer"
              type="button"
              onClick={increment}
            >
              Increment
            </Button>
          </Informations>
        </CardHeader>
        <Separator color="black" />
        <CardContent>
          <Form {...form}>
            <small>Digite o cep</small>
            <form
              // className="flex max-sm:flex-col border-2 border-pink-500 justify-between w-full"
              className="flex gap-3 justify-start h-auto w-full items-center"
              onSubmit={form.handleSubmit(getCep)}
            >
              <FormField
                control={form.control}
                name="cepValue"
                render={({ field }) => (
                  <FormItem
                    className={`flex w-full rounded-lg ${form.watch("cepValue").length === 8 ? "border-2 border-b-[#00ff00]" : "none"} mt-2 items-center`}
                  >
                    <FormControl>
                      <Input
                        className="h-[50px] w-[100%] mt-0 border-none bg-stone-900"
                        type="number"
                        placeholder="Cep ex: 08033219..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage title="Insira os dados corretamente" />
                  </FormItem>
                )}
              />
              {/* <Button type="reset">remove</Button> */}
              <Button
                className={`cursor-pointer dark:bg-stone-900 p-3 h-full border-2 w-auto ${form.watch("cepValue").length === 8 ? "border-2 border-[#00ff00]" : "none"}`}
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
            {form.watch("cepValue").length > 0 && !loadedDatas ? (
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
      {isLoading && (
        <Card className="h-auto min-w-[350px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
          <CardHeader className="w-full text-white">
            {loadedDatas && (
              <>
                <p className="text-lg">Resultado da pesquisa</p>
                <p className="flex gap-2 items-center text-stone-500">
                  <Clock size={16} />
                  <small>{"actualDate"}</small>
                </p>
              </>
            )}
          </CardHeader>
          {loadedDatas ? <Separator /> : null}
          <CardContent className="w-full p-0">
            {loadedDatas || form.watch("cepValue").length > 0 ? (
              <section className="flex flex-col justify-center items-center p-4 gap-4 bg-stone-800 min-h-[300px] h-auto max-h-[500px] overflow-y-auto w-full rounded-xl text-xl">
                {/* <motion.div initial={{ scale: -0.5 }} animate={{ scale: 1 }}> */}
                {form.watch("cepValue").length <= 7 ||
                  (!loadedDatas && (
                    <Loader2
                      className="relative w-[100px] animate-spin text-muted-foreground"
                      size={100}
                    />
                  ))}
                {loadedDatas && (
                  <ul className=" flex flex-col items-start justify-start w-full">
                    <li className="pb-4 w-[100%]">
                      {!loadedDatas ? (
                        <Skeleton className="h-[20px] w-full" />
                      ) : (
                        <span className="flex items-center gap-2">
                          <Locate />
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
                      <div className="text-3xl">
                        {!loadedDatas ? (
                          <Skeleton className="h-[40px] bg-stone-600 w-full" />
                        ) : (
                          <p>{giveAddress?.street}</p>
                        )}
                      </div>
                    </li>
                    <li className="pb-3">
                      <span className="flex items-center gap-2">
                        <BookMarked />
                        <p>
                          <small>Cep</small>
                        </p>
                      </span>
                      <div>
                        {!loadedDatas ? (
                          <Skeleton className="h-[40px] bg-stone-600 w-full" />
                        ) : (
                          <p>
                            <small className="text-stone-500">
                              {giveAddress?.cep}
                            </small>
                          </p>
                        )}
                      </div>
                    </li>
                  </ul>
                )}
                {/* </motion.div> */}
              </section>
            ) : null}
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default FinderPage
