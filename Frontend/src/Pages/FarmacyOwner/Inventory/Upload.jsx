import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button, Carousel } from '@material-tailwind/react'
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';

export default function Upload() {
  let [isOpen, setIsOpen] = useState(false)
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('medicineName', medicineName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('status', status);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/medicines/add-medicine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data); 
      toast.success("Medicine Added")
    } catch (err) {
      console.error('Error adding medicine:', err);
      toast.error("Medicine Not Added. Something wents wrong.")
    }
  };

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
        <div className=" h-full">
          <img
            src="/1.jpg"
            alt="image 1"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
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
          <h1 onClick={() => setIsOpen(true)} className="animated-text  cursor-pointer sm:text-xl text-3xl font-mono border border-white rounded-xl p-4 bg-transparent font-bold text-white">Upload Medicine<span></span></h1>

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
            <form className='flex flex-col justify-center items-center font-mono' onSubmit={handleAdd}>
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Medicine Name'
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                required
              />
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <select
                className='px-14 py-4 my-4 border text-[#dbdbdb] border-[#dbdbdb] rounded-lg'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="#">Select Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <input
                className='p-4 my-4 text-[#dbdbdb] border border-[#dbdbdb] rounded-lg'
                type="file"
                accept='.jpg, .png'
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <Button onClick={()=> setIsOpen(false)} className='bg-black text-white py-2 px-4 rounded-lg' type="submit">Add</Button>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}