
const user = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBRW6kw4PvewS5EGHKY7nNsJiWvrbsVIzZA&s";
export default function TopUsers() {
  return (
    <div>
        <h1 className="font-mono font-bold text-3xl text-center p-10">Top Users</h1>
        <div className="grid grid-cols-4 px-4 gap-2 justify-center animated">
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
            <img src={user}
            className="rounded-lg"
            alt="" />
        </div>
    </div>
  )
}
