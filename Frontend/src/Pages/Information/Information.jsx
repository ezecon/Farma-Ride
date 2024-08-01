import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LineWave } from "react-loader-spinner";

const data = {"Barisal":{"Barguna":["Amtali","Bamna","Barguna Sadar","Betagi","Patharghata","Taltali"],"Barisal":["Agailjhara","Babuganj","Bakerganj","Banaripara","Gaurnadi","Hizla","Barishal Sadar","Mehendiganj","Muladi","Wazirpur"],"Bhola":["Bhola Sadar","Burhanuddin","Char Fasson","Daulatkhan","Lalmohan","Manpura","Tazumuddin"],"Jhalokati":["Jhalokati Sadar","Kathalia","Nalchity","Rajapur"],"Patuakhali":["Bauphal","Dashmina","Galachipa","Kalapara","Mirzaganj","Patuakhali Sadar","Rangabali","Dumki"],"Pirojpur":["Bhandaria","Kawkhali","Mathbaria","Nazirpur","Pirojpur Sadar","Nesarabad (Swarupkati)","Zianagar"]},"Chittagong":{"Bandarban":["Ali Kadam","Bandarban Sadar","Lama","Naikhongchhari","Rowangchhari","Ruma","Thanchi"],"Brahmanbaria":["Akhaura","Bancharampur","Brahmanbaria Sadar","Kasba","Nabinagar","Nasirnagar","Sarail","Ashuganj","Bijoynagar"],"Chandpur":["Chandpur Sadar","Faridganj","Haimchar","Haziganj","Kachua","Matlab Dakshin","Matlab Uttar","Shahrasti"],"Chittagong":["Anwara","Banshkhali","Boalkhali","Chandanaish","Fatikchhari","Hathazari","Karnaphuli","Lohagara","Mirsharai","Patiya","Rangunia","Raozan","Sandwip","Satkania","Sitakunda","Bandar Thana","Chandgaon Thana","Double Mooring Thana","Kotwali Thana","Pahartali Thana","Panchlaish Thana","Bhujpur Thana"],"Comilla":["Barura","Brahmanpara","Burichang","Chandina","Chauddagram","Daudkandi","Debidwar","Homna","Laksam","Muradnagar","Nangalkot","Cumilla Adarsha Sadar","Meghna","Titas","Monohargonj","Cumilla Sadar Dakshin"],"Cox's Bazar":["Chakaria","Cox's Bazar Sadar","Kutubdia","Maheshkhali","Ramu","Teknaf","Ukhia","Pekua"],"Feni":["Chhagalnaiya","Daganbhuiyan","Feni Sadar","Parshuram","Sonagazi","Fulgazi"],"Khagrachhari":["Dighinala","Khagrachhari","Lakshmichhari","Mahalchhari","Manikchhari","Matiranga","Panchhari","Ramgarh"],"Lakshmipur":["Lakshmipur Sadar","Raipur","Ramganj","Ramgati","Kamalnagar"],"Noakhali":["Begumganj","Noakhali Sadar","Chatkhil","Companiganj","Hatiya","Senbagh","Sonaimuri","Subarnachar","Kabirhat"],"Rangamati":["Bagaichhari","Barkal","Kawkhali (Betbunia)","Belaichhari","Kaptai","Juraichhari","Langadu","Naniyachar","Rajasthali","Rangamati Sadar"]},"Dhaka":{"Dhaka":["Dhamrai","Dohar","Keraniganj","Nawabganj","Savar","Tejgaon Circle"],"Faridpur":["Alfadanga","Bhanga","Boalmari","Charbhadrasan","Faridpur Sadar","Madhukhali","Nagarkanda","Sadarpur","Saltha"],"Gazipur":["Gazipur Sadar","Kaliakair","Kaliganj","Kapasia","Sreepur"],"Gopalganj":["Gopalganj Sadar","Kashiani","Kotalipara","Muksudpur","Tungipara"],"Kishoreganj":["Austagram","Bajitpur","Bhairab","Hossainpur","Itna","Karimganj","Katiadi","Kishoreganj Sadar","Kuliarchar","Mithamain","Nikli","Pakundia"],"Madaripur":["Rajoir","Madaripur Sadar","Kalkini","Shibchar"],"Manikganj":["Daulatpur","Ghior","Harirampur","Manikgonj Sadar","Saturia","Shivalaya","Singair"],"Munshiganj":["Gazaria","Lohajang","Munshiganj Sadar","Sirajdikhan","Sreenagar","Tongibari"],"Narayanganj":["Araihazar","Bandar","Narayanganj Sadar","Rupganj","Sonargaon"],"Narsingdi":["Narsingdi Sadar","Belabo","Monohardi","Palash","Raipura","Shibpur"],"Rajbari":["Baliakandi","Goalandaghat","Pangsha","Rajbari Sadar","Kalukhali"],"Shariatpur":["Bhedarganj","Damudya","Gosairhat","Naria","Shariatpur Sadar","Zajira","Shakhipur"],"Tangail":["Gopalpur","Basail","Bhuapur","Delduar","Ghatail","Kalihati","Madhupur","Mirzapur","Nagarpur","Sakhipur","Dhanbari","Tangail Sadar"]},"Khulna":{"Bagerhat":["Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat","Mongla","Morrelganj","Rampal","Sarankhola"],"Chuadanga":["Alamdanga","Chuadanga Sadar","Damurhuda","Jibannagar"],"Jessore":["Abhaynagar","Bagherpara","Chaugachha","Jhikargachha","Keshabpur","Jashore Sadar","Manirampur","Sharsha"],"Jhenaidah":["Harinakunda","Jhenaidah Sadar","Kaliganj","Kotchandpur","Maheshpur","Shailkupa"],"Khulna":["Batiaghata","Dacope","Dumuria","Dighalia","Koyra","Paikgachha","Phultala","Rupsha","Terokhada","Daulatpur Thana","Khalishpur Thana","Khan Jahan Ali Thana","Kotwali Thana","Sonadanga Thana","Harintana Thana"],"Kushtia":["Bheramara","Daulatpur","Khoksa","Kumarkhali","Kushtia Sadar","Mirpur"],"Magura":["Magura Sadar","Mohammadpur","Shalikha","Sreepur"],"Meherpur":["Gangni","Meherpur Sadar","Mujibnagar"],"Narail":["Kalia","Lohagara","Narail Sadar","Naragati Thana"],"Satkhira":["Assasuni","Debhata","Kalaroa","Kaliganj","Satkhira Sadar","Shyamnagar","Tala"]},"Mymensingh":{"Jamalpur":["Baksiganj","Dewanganj","Islampur","Jamalpur Sadar","Madarganj","Melandaha","Sarishabari"],"Mymensingh":["Trishal","Dhobaura","Fulbaria","Gaffargaon","Gauripur","Haluaghat","Ishwarganj","Mymensingh Sadar","Muktagachha","Nandail","Phulpur","Bhaluka","Tara Khanda"],"Netrakona":["Atpara","Barhatta","Durgapur","Khaliajuri","Kalmakanda","Kendua","Madan","Mohanganj","Netrokona Sadar","Purbadhala"],"Sherpur":["Jhenaigati","Nakla","Nalitabari","Sherpur Sadar","Sreebardi"]},"Rajshahi":{"Bogra":["Adamdighi","Bogura Sadar","Dhunat","Dhupchanchia","Gabtali","Kahaloo","Nandigram","Sariakandi","Shajahanpur","Sherpur","Shibganj","Sonatola"],"Chapainawabganj":["Bholahat","Gomastapur","Nachole","Nawabganj Sadar","Shibganj"],"Joypurhat":["Akkelpur","Joypurhat Sadar","Kalai","Khetlal","Panchbibi"],"Naogaon":["Atrai","Badalgachhi","Manda","Dhamoirhat","Mohadevpur","Naogaon Sadar","Niamatpur","Patnitala","Porsha","Raninagar","Sapahar"],"Natore":["Bagatipara","Baraigram","Gurudaspur","Lalpur","Natore Sadar","Singra","Naldanga"],"Pabna":["Atgharia","Bera","Bhangura","Chatmohar","Faridpur","Ishwardi","Pabna Sadar","Santhia","Sujanagar"],"Rajshahi":["Bagha","Bagmara","Charghat","Durgapur","Godagari","Mohanpur","Paba","Puthia","Tanore"],"Sirajganj":["Belkuchi","Chauhali","Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Sirajganj Sadar","Tarash","Ullahpara"]},"Rangpur":{"Dinajpur":["Birampur","Birganj","Biral","Bochaganj","Chirirbandar","Phulbari","Ghoraghat","Hakimpur","Kaharole","Khansama","Dinajpur Sadar","Nawabganj","Parbatipur"],"Gaibandha":["Phulchhari","Gaibandha Sadar","Gobindaganj","Palashbari","Sadullapur","Sughatta","Sundarganj"],"Kurigram":["Bhurungamari","Char Rajibpur","Chilmari","Phulbari","Kurigram Sadar","Nageshwari","Rajarhat","Raomari","Ulipur"],"Lalmonirhat":["Aditmari","Hatibandha","Kaliganj","Lalmonirhat Sadar","Patgram"],"Nilphamari":["Dimla","Domar","Jaldhaka","Kishoreganj","Nilphamari Sadar","Saidpur"],"Panchagarh":["Atwari","Boda","Debiganj","Panchagarh Sadar","Tetulia"],"Rangpur":["Badarganj","Gangachhara","Kaunia","Rangpur Sadar","Mithapukur","Pirgachha","Pirganj","Taraganj"],"Thakurgaon":["Baliadangi","Haripur","Pirganj","Ranisankail","Thakurgaon Sadar"]},"Sylhet":{"Habiganj":["Ajmiriganj","Bahubal","Baniyachong","Chunarughat","Habiganj Sadar","Lakhai","Madhabpur","Nabiganj","Sayestaganj"],"Moulvibazar":["Barlekha","Juri","Kamalganj","Kulaura","Moulvibazar Sadar","Rajnagar","Sreemangal"],"Sunamganj":["Bishwamvarpur","Chhatak","Dakshin Sunamganj","Derai","Dharamapasha","Dowarabazar","Jagannathpur","Jamalganj","Sullah","Sunamganj Sadar","Tahirpur"],"Sylhet":["Balaganj","Beanibazar","Bishwanath","Companigonj","Dakshin Surma","Fenchuganj","Golapganj","Gowainghat","Jaintiapur","Kanaighat","Osmani Nagar","Sylhet Sadar","Zakiganj"]}}

export default function Information({ isCustomer, isRider, isOwner }) {
  const [code, setCode] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [country, setCountry] = useState('');
  const [photo, setPhoto] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();

    try {
      if (!userEmail) {
        navigate('/register/role');
        return;
      }

      const formData = new FormData();
      formData.append('email', userEmail);
      formData.append('division', selectedDivision);
      formData.append('district', selectedDistrict);
      formData.append('upazilas', JSON.stringify(upazilas)); // Ensure upazilas is sent as a JSON string
      formData.append('zipCode', code);
      formData.append('country', country);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('photo', photo); // Ensure photo is a File object

      const response = await axios.put('https://farma-ride-server.vercel.app/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Verification successful!");
        if (isCustomer) {
          navigate('/customer');
        } else if (isRider) {
          navigate('/rider');
        } else if (isOwner) {
          navigate('/farmacy-owner');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error verification:', error);
        toast.error("Verification failed. Please try again.");
      }
    }finally {
      setIsLoading(false); // End loading
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }
  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          toast.success("Location shared successfully!");
        },
        error => {
          console.error('Error getting location:', error);
          toast.error("Failed to share location.");
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleDivisionChange = (event) => {
    const selected = event.target.value;
    setSelectedDivision(selected);
    setDistricts(Object.keys(data[selected] || {}));
    setSelectedDistrict('');
    setUpazilas([]);
  };

  const handleDistrictChange = (event) => {
    const selected = event.target.value;
    setSelectedDistrict(selected);
    setUpazilas(data[selectedDivision]?.[selected] || []);
  };

  return (
    <div className="relative min-h-screen bg-black montserrat-alternates-regular">
      <div className="relative flex flex-col items-center justify-center p-4 pt-36">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <select
                id="division"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                value={selectedDivision}
                onChange={handleDivisionChange}
                required
              >
                <option value="">Select Division</option>
                {Object.keys(data).map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="district"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="upazilas"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                value={upazilas} // Ensure value is managed correctly
                onChange={(e) => setUpazilas([e.target.value])} // Manage upazilas as an array
                required
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                id="zipCode"
                placeholder="Zip Code"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Zip Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="country"
                placeholder="Country"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="photo"
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </div>
            <div className="flex cursor-pointer" onClick={captureLocation}>
              <FaMapMarkerAlt className="text-red-600" /> 
              <p className="text-white px-2 text-sm font-mono">Click here to share your location!</p>
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
              SAVE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
