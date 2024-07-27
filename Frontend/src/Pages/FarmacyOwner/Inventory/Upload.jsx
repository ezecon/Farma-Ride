import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button, Carousel } from '@material-tailwind/react'
import { useState } from 'react'

export default function Upload() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className=''>
    <div className="relative">
      <Carousel loop={true} autoplay={true} className="rounded-xl">
        <div className=" h-full">
          <img
            src="/1.jpg"
            alt="image 1"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>

      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-left">
          <h1 onClick={() => setIsOpen(true)} className="cursor-pointer text-3xl font-mono border border-white rounded-xl p-4 bg-transparent font-bold text-white">Upload Medicine<span></span></h1>

        </div>
      </div>
    </div>

    
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="rounded-lg fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
          <DialogTitle className=" text-center text-xl font-bold font-mono">Add Medicine</DialogTitle>
          <Description className="text-center montserrat-alternates-thin text-sm">You can add your new medicines here</Description>
          <div className="flex gap-4">
            <form action="" className='flex flex-col justify-center items-center font-mono'>
              <input className='p-4 my-4 border border-[#dbdbdb] rounded-lg' type="text" placeholder='Medicine Name' />
              <input className='p-4 my-4 border border-[#dbdbdb] rounded-lg' type="text" placeholder='Description' />
              <input className='p-4 my-4 border border-[#dbdbdb] rounded-lg' type="text" placeholder='Price' />
              
              <select className='px-11 py-4 my-4 border border-[#dbdbdb] rounded-lg' name="cars" id="cars">
                <option value="#">Select Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <input className='p-4 my-4 border border-[#dbdbdb] rounded-lg' type="file" accept='.jpg, .png' />
                <Button className='bg-black' onClick={() => setIsOpen(false)}>Add</Button>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}