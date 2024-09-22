
import { auth } from "@/auth";
import ClientComp from "@/components/shared/client-comp";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1>BookShelf</h1>
      <div>{JSON.stringify(session)}</div>
      <ClientComp />
    </div>
  );
}
