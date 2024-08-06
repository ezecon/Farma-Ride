import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';
import { useToken } from '../../../Components/Hook/useToken';
import { toast } from 'react-hot-toast';

const data = {"Barisal":{"Barguna":["Amtali","Bamna","Barguna Sadar","Betagi","Patharghata","Taltali"],"Barisal":["Agailjhara","Babuganj","Bakerganj","Banaripara","Gaurnadi","Hizla","Barishal Sadar","Mehendiganj","Muladi","Wazirpur"],"Bhola":["Bhola Sadar","Burhanuddin","Char Fasson","Daulatkhan","Lalmohan","Manpura","Tazumuddin"],"Jhalokati":["Jhalokati Sadar","Kathalia","Nalchity","Rajapur"],"Patuakhali":["Bauphal","Dashmina","Galachipa","Kalapara","Mirzaganj","Patuakhali Sadar","Rangabali","Dumki"],"Pirojpur":["Bhandaria","Kawkhali","Mathbaria","Nazirpur","Pirojpur Sadar","Nesarabad (Swarupkati)","Zianagar"]},"Chittagong":{"Bandarban":["Ali Kadam","Bandarban Sadar","Lama","Naikhongchhari","Rowangchhari","Ruma","Thanchi"],"Brahmanbaria":["Akhaura","Bancharampur","Brahmanbaria Sadar","Kasba","Nabinagar","Nasirnagar","Sarail","Ashuganj","Bijoynagar"],"Chandpur":["Chandpur Sadar","Faridganj","Haimchar","Haziganj","Kachua","Matlab Dakshin","Matlab Uttar","Shahrasti"],"Chittagong":["Anwara","Banshkhali","Boalkhali","Chandanaish","Fatikchhari","Hathazari","Karnaphuli","Lohagara","Mirsharai","Patiya","Rangunia","Raozan","Sandwip","Satkania","Sitakunda","Bandar Thana","Chandgaon Thana","Double Mooring Thana","Kotwali Thana","Pahartali Thana","Panchlaish Thana","Bhujpur Thana"],"Comilla":["Barura","Brahmanpara","Burichang","Chandina","Chauddagram","Daudkandi","Debidwar","Homna","Laksam","Muradnagar","Nangalkot","Cumilla Adarsha Sadar","Meghna","Titas","Monohargonj","Cumilla Sadar Dakshin"],"Cox's Bazar":["Chakaria","Cox's Bazar Sadar","Kutubdia","Maheshkhali","Ramu","Teknaf","Ukhia","Pekua"],"Feni":["Chhagalnaiya","Daganbhuiyan","Feni Sadar","Parshuram","Sonagazi","Fulgazi"],"Khagrachhari":["Dighinala","Khagrachhari","Lakshmichhari","Mahalchhari","Manikchhari","Matiranga","Panchhari","Ramgarh"],"Lakshmipur":["Lakshmipur Sadar","Raipur","Ramganj","Ramgati","Kamalnagar"],"Noakhali":["Begumganj","Noakhali Sadar","Chatkhil","Companiganj","Hatiya","Senbagh","Sonaimuri","Subarnachar","Kabirhat"],"Rangamati":["Bagaichhari","Barkal","Kawkhali (Betbunia)","Belaichhari","Kaptai","Juraichhari","Langadu","Naniyachar","Rajasthali","Rangamati Sadar"]},"Dhaka":{"Dhaka":["Dhamrai","Dohar","Keraniganj","Nawabganj","Savar","Tejgaon Circle"],"Faridpur":["Alfadanga","Bhanga","Boalmari","Charbhadrasan","Faridpur Sadar","Madhukhali","Nagarkanda","Sadarpur","Saltha"],"Gazipur":["Gazipur Sadar","Kaliakair","Kaliganj","Kapasia","Sreepur"],"Gopalganj":["Gopalganj Sadar","Kashiani","Kotalipara","Muksudpur","Tungipara"],"Kishoreganj":["Austagram","Bajitpur","Bhairab","Hossainpur","Itna","Karimganj","Katiadi","Kishoreganj Sadar","Kuliarchar","Mithamain","Nikli","Pakundia"],"Madaripur":["Rajoir","Madaripur Sadar","Kalkini","Shibchar"],"Manikganj":["Daulatpur","Ghior","Harirampur","Manikgonj Sadar","Saturia","Shivalaya","Singair"],"Munshiganj":["Gazaria","Lohajang","Munshiganj Sadar","Sirajdikhan","Sreenagar","Tongibari"],"Narayanganj":["Araihazar","Bandar","Narayanganj Sadar","Rupganj","Sonargaon"],"Narsingdi":["Narsingdi Sadar","Belabo","Monohardi","Palash","Raipura","Shibpur"],"Rajbari":["Baliakandi","Goalandaghat","Pangsha","Rajbari Sadar","Kalukhali"],"Shariatpur":["Bhedarganj","Damudya","Gosairhat","Naria","Shariatpur Sadar","Zajira","Shakhipur"],"Tangail":["Gopalpur","Basail","Bhuapur","Delduar","Ghatail","Kalihati","Madhupur","Mirzapur","Nagarpur","Sakhipur","Dhanbari","Tangail Sadar"]},"Khulna":{"Bagerhat":["Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat","Mongla","Morrelganj","Rampal","Sarankhola"],"Chuadanga":["Alamdanga","Chuadanga Sadar","Damurhuda","Jibannagar"],"Jessore":["Abhaynagar","Bagherpara","Chaugachha","Jhikargachha","Keshabpur","Jashore Sadar","Manirampur","Sharsha"],"Jhenaidah":["Harinakunda","Jhenaidah Sadar","Kaliganj","Kotchandpur","Maheshpur","Shailkupa"],"Khulna":["Batiaghata","Dacope","Dumuria","Dighalia","Koyra","Paikgachha","Phultala","Rupsha","Terokhada","Daulatpur Thana","Khalishpur Thana","Khan Jahan Ali Thana","Kotwali Thana","Sonadanga Thana","Harintana Thana"],"Kushtia":["Bheramara","Daulatpur","Khoksa","Kumarkhali","Kushtia Sadar","Mirpur"],"Magura":["Magura Sadar","Mohammadpur","Shalikha","Sreepur"],"Meherpur":["Gangni","Meherpur Sadar","Mujibnagar"],"Narail":["Kalia","Lohagara","Narail Sadar","Naragati Thana"],"Satkhira":["Assasuni","Debhata","Kalaroa","Kaliganj","Satkhira Sadar","Shyamnagar","Tala"]},"Mymensingh":{"Jamalpur":["Baksiganj","Dewanganj","Islampur","Jamalpur Sadar","Madarganj","Melandaha","Sarishabari"],"Mymensingh":["Trishal","Dhobaura","Fulbaria","Gaffargaon","Gauripur","Haluaghat","Ishwarganj","Mymensingh Sadar","Muktagachha","Nandail","Phulpur","Bhaluka","Tara Khanda"],"Netrakona":["Atpara","Barhatta","Durgapur","Khaliajuri","Kalmakanda","Kendua","Madan","Mohanganj","Netrokona Sadar","Purbadhala"],"Sherpur":["Jhenaigati","Nakla","Nalitabari","Sherpur Sadar","Sreebardi"]},"Rajshahi":{"Bogra":["Adamdighi","Bogura Sadar","Dhunat","Dhupchanchia","Gabtali","Kahaloo","Nandigram","Sariakandi","Shajahanpur","Sherpur","Shibganj","Sonatola"],"Chapainawabganj":["Bholahat","Gomastapur","Nachole","Nawabganj Sadar","Shibganj"],"Joypurhat":["Akkelpur","Joypurhat Sadar","Kalai","Khetlal","Panchbibi"],"Naogaon":["Atrai","Badalgachhi","Manda","Dhamoirhat","Mohadevpur","Naogaon Sadar","Niamatpur","Patnitala","Porsha","Raninagar","Sapahar"],"Natore":["Bagatipara","Baraigram","Gurudaspur","Lalpur","Natore Sadar","Singra","Naldanga"],"Pabna":["Atgharia","Bera","Bhangura","Chatmohar","Faridpur","Ishwardi","Pabna Sadar","Santhia","Sujanagar"],"Rajshahi":["Bagha","Bagmara","Charghat","Durgapur","Godagari","Mohanpur","Paba","Puthia","Tanore"],"Sirajganj":["Belkuchi","Chauhali","Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Sirajganj Sadar","Tarash","Ullahpara"]},"Rangpur":{"Dinajpur":["Birampur","Birganj","Biral","Bochaganj","Chirirbandar","Phulbari","Ghoraghat","Hakimpur","Kaharole","Khansama","Dinajpur Sadar","Nawabganj","Parbatipur"],"Gaibandha":["Phulchhari","Gaibandha Sadar","Gobindaganj","Palashbari","Sadullapur","Sughatta","Sundarganj"],"Kurigram":["Bhurungamari","Char Rajibpur","Chilmari","Phulbari","Kurigram Sadar","Nageshwari","Rajarhat","Raomari","Ulipur"],"Lalmonirhat":["Aditmari","Hatibandha","Kaliganj","Lalmonirhat Sadar","Patgram"],"Nilphamari":["Dimla","Domar","Jaldhaka","Kishoreganj","Nilphamari Sadar","Saidpur"],"Panchagarh":["Atwari","Boda","Debiganj","Panchagarh Sadar","Tetulia"],"Rangpur":["Badarganj","Gangachhara","Kaunia","Rangpur Sadar","Mithapukur","Pirgachha","Pirganj","Taraganj"],"Thakurgaon":["Baliadangi","Haripur","Pirganj","Ranisankail","Thakurgaon Sadar"]},"Sylhet":{"Habiganj":["Ajmiriganj","Bahubal","Baniyachong","Chunarughat","Habiganj Sadar","Lakhai","Madhabpur","Nabiganj","Sayestaganj"],"Moulvibazar":["Barlekha","Juri","Kamalganj","Kulaura","Moulvibazar Sadar","Rajnagar","Sreemangal"],"Sunamganj":["Bishwamvarpur","Chhatak","Dakshin Sunamganj","Derai","Dharamapasha","Dowarabazar","Jagannathpur","Jamalganj","Sullah","Sunamganj Sadar","Tahirpur"],"Sylhet":["Balaganj","Beanibazar","Bishwanath","Companigonj","Dakshin Surma","Fenchuganj","Golapganj","Gowainghat","Jaintiapur","Kanaighat","Osmani Nagar","Sylhet Sadar","Zakiganj"]}}


export default function Update_Customer() {
  const [user, setUser] = useState({});
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [code, setCode] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const[loading, setLoading]=useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    if (userID) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
          const userData = response.data;
          setUser(userData);
          setSelectedDivision(userData.division);
          setSelectedDistrict(userData.district);
          setUpazilas([userData.upazilas]);
          setCode(userData.zipCode);

          if (userData.division) {
            setDistricts(Object.keys(data[userData.division] || {}));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUser();
    }
  }, [userID]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const updatedUser = { ...user, division: selectedDivision, district: selectedDistrict, upazilas: upazilas[0], zipCode: code };
    const formData = new FormData();

    for (const key in updatedUser) {
        formData.append(key, updatedUser[key]);
    }

    if (profilePicture) {
        formData.append('photo', profilePicture);
    }

    try {
        const response = await axios.put(`https://farma-ride-server.vercel.app/api/users/profile/${userID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            toast.success("Profile updated successfully");
            navigate('/customer/profile');
        } else {
            toast.error("Failed to update profile");
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error("An error occurred while updating the profile");
    }finally{
      setLoading(false);
    }
};
if(loading){
  <>
    <p className='text-center text-4xl'>Loading</p>
  </>
}

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 transition-transform transform-gpu hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {'Update Profile'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <Input
              label="Name"
              name="name"
              value={user.name || ''}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              type="email"
              required
            />
            <Input
              label="Number"
              name="number"
              value={user.number || ''}
              onChange={handleChange}
              required
            />

            <select
              id="division"
              className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
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
            <select
              id="district"
              className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
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
            <select
              id="upazilas"
              className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
              value={upazilas[0] || ''}
              onChange={(e) => setUpazilas([e.target.value])}
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
            <Input
              type="number"
              id="zipCode"
              placeholder="Zip Code"
              className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
              aria-label="Zip Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
            />
            <Button color="black" type="submit" className="w-full mt-4">
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
