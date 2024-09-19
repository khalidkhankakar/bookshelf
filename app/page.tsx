import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1>BookShelf</h1>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
