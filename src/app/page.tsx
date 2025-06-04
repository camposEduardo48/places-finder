import FinderPage from "./(auth)/finder/page"
import { InfoProvider } from "./_components/info"

export default function Home() {
  return (
    <main className="flex justify-center">
      <InfoProvider>
        <FinderPage />
      </InfoProvider>
    </main>
  )
}
