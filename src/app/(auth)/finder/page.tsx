"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useForm } from "react-hook-form"

const FinderPage = () => {
  const form = useForm({
    defaultValues: {
      cepValue: ""
    }
  })

  return (
    <main className="flex gap-10">
      <Card className="h-full w-full text-gray-200 bg-stone-800 border-none">
        <CardHeader>
          <h2 className="text-2xl"> Localizador 48</h2>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit animi eaque accusantium odit quibusdam, minus labore praesentium maxime. Tenetur nobis qui sunt eos excepturi necessitatibus recusandae illo corrupti perferendis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={() => ''}>
              <FormField
                control={form.control}
                name="cepValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digite o cep</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cep ex: 08033219..." {...field} />
                    </FormControl>
                    <FormDescription>
                      <span className={form.watch('cepValue').length > 0 ? 'p-2' : null}>
                        {form.watch('cepValue').length > 0 ? <small>searching...</small> : null}
                      </span>
                      <Skeleton className="bg-stone-900 h-8 w-full" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsa pariatur illum molestiae, quas natus alias eum et quae ad ipsam veritatis provident delectus deleniti! Recusandae aliquam voluptatibus officia maiores!
                    </FormDescription>
                    <FormMessage title="Insira os dados corretamente" />
                  </FormItem>
                )} />
              <Button type="submit">Localizar</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>rodapé</CardFooter>
      </Card>
      <Card className="h-full w-full text-gray-200 bg-stone-800">
        <CardHeader>
          cabeçalho 2
        <CardDescription>
          lorem
        </CardDescription>
        </CardHeader>
        <CardContent>
          content 2
        </CardContent>
        <CardFooter>
          rodapé 2
        </CardFooter>
      </Card>
    </main>
  )
}

export default FinderPage
