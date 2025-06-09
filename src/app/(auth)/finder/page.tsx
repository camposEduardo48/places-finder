"use client"

import "dotenv/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import dayjs from "dayjs"
import {
  BookMarked,
  Clock,
  Loader2,
  Signpost,
  MapPin as Locate,
  Search,
  MapPin,
} from "lucide-react"
// console.log(BookMarked, Clock, Loader2, Locate, Signpost, MapPin, Search)
import { Separator } from "@/components/ui/separator"
// console.log(Separator)
// import { useTheme } from "next-themes";
const apiBrasil = process.env.NEXT_PUBLIC_BRASIL_API
const actualDate = dayjs(new Date()).format("HH:mm - DD/MM/YYYY")
// const img = "../../../../assets/bg-locations.svg"

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
  const [giveAddress, setAddress] = useState<TypeApiBrasil | null>(null)
  const [loadedDatas, setLoadedDatas] = useState<boolean>(false)
  const form = useForm({
    defaultValues: {
      cepValue: "",
    },
  })

  const getCep = async () => {
    if (giveAddress) {
      // setAddress(null)
      setLoadedDatas(false)
    }
    setIsLoading(true)
    try {
      setTimeout(async () => {
        const searchCep = await axios.get(
          `${apiBrasil}/${form.getValues("cepValue")}`,
        )
        const statusReq = searchCep.status === 200
        setLoadedDatas(statusReq)
        form.reset()
        if (statusReq) {
          setAddress(searchCep.data)
        }
      }, 1700)
    } catch (error) {
      console.log(error)
    }
  }

  // const { count, increment } = useInfo()

  // useEffect(() => {
  //   return () => {}
  // }, [])

  return (
    <main className="box-content flex flex-col gap-4 lg:w-[600px] h-[100vh] max-sm:justify-center justify-center max-sm:items-center items-center max-sm:w-full lg:max-w-[70%]">
      <Card className="h-auto min-w-[350px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
        <CardHeader className="flex items-center gap-3">
          <MapPin size={34} className="text-stone-500" />
          <h2 className="text-2xl">
            {" "}
            Localizador <b className="text-blue-500">SOPMAC</b>
          </h2>
          {/* Results: {count}
          <Button className="cursor-pointer" type="button" onClick={increment}>
            Increment
          </Button> */}
        </CardHeader>
        <Separator color="black" />
        <CardContent>
          <Form {...form}>
            <form
              // className="flex max-sm:flex-col border-2 border-pink-500 justify-between w-full"
              className="flex gap-3 justify-start h-auto w-full items-center"
              onSubmit={form.handleSubmit(getCep)}
            >
              <FormField
                control={form.control}
                name="cepValue"
                render={({ field }) => (
                  <FormItem className="flex w-full rounded-lg mt-2 items-center">
                    <FormControl>
                      <Input
                        className="h-[50px] w-[100%] mt-0 border-none bg-stone-900"
                        type="number"
                        placeholder="Digite um cep. Ex: 08033219..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage title="Insira os dados corretamente" />
                  </FormItem>
                )}
              />
              {/* <Button type="reset">remove</Button> */}
              <Button
                className={`cursor-pointer dark:bg-stone-900 p-3 h-full border-2 w-auto ${form.watch("cepValue").length === 8 ? "border-2 border-blue-500" : "none"}`}
                type="submit"
                disabled={form.watch("cepValue").length < 8}
              >
                {form.watch("cepValue").length > 0 &&
                form.watch("cepValue").length <= 7 ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  <Search
                    color={
                      form.watch("cepValue").length === 8 ? "#2B7FFF" : "#fff"
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
        <Card className="h-auto min-w-[300px] max-w-[600px] w-[96%] text-gray-200 bg-stone-800 shadow-none">
          <CardHeader className="w-full text-white">
            {loadedDatas && (
              <>
                <p className="text-lg text-stone-400">Resultado da pesquisa</p>
                <p className="flex gap-2 items-center text-stone-500">
                  <Clock size={16} />
                  <small>{actualDate}</small>
                </p>
              </>
            )}
          </CardHeader>
          {loadedDatas ? <Separator /> : null}
          <CardContent className="w-full p-0">
            {loadedDatas || form.watch("cepValue").length > 0 ? (
              <section className="flex flex-col justify-center items-center p-0 gap-4 bg-stone-800 min-h-[250px] h-auto max-h-[450px] overflow-y-auto w-full rounded-xl text-xl">
                <motion.div initial={{ scale: -0.5 }} animate={{ scale: 1 }}>
                  {form.watch("cepValue").length <= 7 ||
                    (!loadedDatas && (
                      <Loader2
                        className="relative w-[100px] animate-spin text-muted-foreground"
                        size={100}
                      />
                    ))}
                  {loadedDatas && (
                    <section className="flex gap-4">
                      <ul className="flex flex-col items-start justify-start w-full">
                        <li className="pb-4 w-full">
                          {!loadedDatas ? (
                            <Skeleton className="h-[20px] w-full" />
                          ) : (
                            <span className="flex items-center gap-1">
                              <p className="text-stone-400 font-semibold">
                                <small>Bairro</small>
                              </p>
                              <Locate className="text-stone-500" />
                            </span>
                          )}
                          {giveAddress?.neighborhood}
                        </li>
                        <li className="pb-5">
                          <span className="flex items-center gap-1">
                            <p className="text-stone-400 font-semibold">
                              <small>Rua/Avenida</small>
                            </p>
                            <Signpost className="text-stone-500" />
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
                          <span className="flex items-center gap-1">
                            <p className="text-stone-400 font-semibold">
                              <small>Cep</small>
                            </p>
                            <BookMarked className="text-stone-500" />
                          </span>
                          <div>
                            {!loadedDatas ? (
                              <Skeleton className="h-[40px] bg-stone-600 w-full" />
                            ) : (
                              <p>
                                <small>{giveAddress?.cep}</small>
                              </p>
                            )}
                          </div>
                        </li>
                      </ul>
                      <div className="flex items-center">
                        <img
                          src="https://img.icons8.com/fluency/100/location--v1.png"
                          alt=""
                          width={100}
                        />
                      </div>
                    </section>
                  )}
                </motion.div>
              </section>
            ) : null}
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default FinderPage
