import axios from "axios"
import { useEffect, useState } from "react"


export default function Farmacy() {
  /*const [data, setData] = useState['']
  useEffect(()=>{
    const mapFetch = async ()=>{
      try{
        const response = await axios.get('http://localhost:5000/api/users/owner')
        if(response.status === 200){
          setData(response.data);
        }
        else{
          console.log("404");
        }
      }
      catch(err){
        console.log(err)
      }
    }
    mapFetch();
  })*/
  return (
    <div>
        <h1 className="font-mono font-bold text-3xl text-center p-10">Farmacy Near You?</h1>
        <div className="flex justify-center">
            <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL21hcHMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=" 
            className="rounded-lg"
            alt="" />
        </div>
    </div>
  )
}
