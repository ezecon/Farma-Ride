

export default function Count() {
  return (
    <div className="flex flex-col justify-center items-center my-10 py-10 font-bold montserrat-alternates-medium">
        <div className="grid  grid-cols-3 gap-3 py-5">
            <div className="text-center  border p-10 rounded-xl shadow-xl">
                <h1>TOTAL CUSTOMERS</h1>
                <p className="text-[goldenrod]">6384</p>
            </div>
            <div className="text-center border p-10 rounded-xl shadow-xl">
                <h1>TOTAL RIDERS</h1>
                <p className="text-[goldenrod]">83</p>
            </div>
            <div className="text-center border p-10 rounded-xl shadow-xl">
                <h1>TOTAL FARMACY</h1>
                <p className="text-[goldenrod]">645</p>
            </div>
        </div>
        <div className="text-center border p-10 rounded-xl shadow-xl">
            <h1>TOTAL MEDICINES</h1>
            <p className="text-[goldenrod]">64576</p>
        </div>
    </div>
  )
}
