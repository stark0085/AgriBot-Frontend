import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Mock ProfileContext for demonstration - replace with your actual context
const ProfileContext = React.createContext();

// Mock profile provider for demonstration
const MockProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: 'john.doe@example.com',
    district: 'Purba Medinipur',
    state: 'West Bengal',
    fullName: 'John Doe'
  });

  const updateProfile = (updatedData) => {
    try {
      const newUserData = { ...userData, ...updatedData };
      setUserData(newUserData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <ProfileContext.Provider value={{ userData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

const ProfilePage = () => {
  const { userData, updateProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({
    district: userData.district || '',
    state: userData.state || ''
  });
  const [errors, setErrors] = useState({});

  // Indian states and UTs for dropdown
  const indianStatesAndUTs = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const districtsAndCitiesByState = {
    'Andhra Pradesh': {
      districts: [
        'Alluri Sitharama Raju', 'Anakapalli', 'Ananthapuramu', 'Annamayya',
        'Bapatla', 'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari',
        'Eluru', 'Guntur', 'Kakinada', 'Krishna', 'Kurnool', 'Nandyal',
        'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam',
        'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam',
        'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari',
        'YSR'
      ]
    },
    'Arunachal Pradesh': {
      districts: [
        'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang',
        'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit',
        'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri',
        'Namsai', 'Pakke-Kessang', 'Papum Pare', 'Shi Yomi', 'Siang',
        'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng',
        'West Siang'
      ]
    },
    'Assam': {
      districts: [
        'Bajali', 'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar',
        'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri',
        'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi',
        'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan',
        'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli',
        'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur',
        'South Salmara-Mankachar', 'Tamulpur', 'Tinsukia', 'Udalguri',
        'West Karbi Anglong'
      ]
    },
    'Bihar': {
      districts: [
        'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur',
        'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya',
        'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria',
        'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger',
        'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas',
        'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar',
        'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'
      ]
    },
    'Chhattisgarh': {
      districts: [
        'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara',
        'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg',
        'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa',
        'Jashpur', 'Kabirdham', 'Kanker', 'Khairagarh-Chhuikhadan-Gandai',
        'Kondagaon', 'Korba', 'Koriya', 'Mahasamund',
        'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki',
        'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon',
        'Sarangarh-Bilaigarh', 'Shakti', 'Sukma', 'Surajpur', 'Surguja'
      ]
    },
    'Goa': {
      districts: [
        'North Goa', 'South Goa'
      ]
    },
    'Gujarat': {
      districts: [
        'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
        'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
        'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath',
        'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahisagar',
        'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan',
        'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
        'Tapi', 'Vadodara', 'Valsad'
      ]
    },
    'Haryana': {
      districts: [
        'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad',
        'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal',
        'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula',
        'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'
      ]
    },
    'Himachal Pradesh': {
      districts: [
        'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu',
        'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
      ]
    },
    'Jharkhand': {
      districts: [
        'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka',
        'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla',
        'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar',
        'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahebganj',
        'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'
      ]
    },
    'Karnataka': {
      districts: [
        'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural',
        'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapura',
        'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere',
        'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu',
        'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara',
        'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada',
        'Vijayanagara', 'Vijayapura', 'Yadgir'
      ]
    },
    'Kerala': {
      districts: [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
        'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
        'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
      ]
    },
    'Madhya Pradesh': {
      districts: [
        'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat',
        'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur',
        'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori',
        'Guna', 'Gwalior', 'Harda', 'Narmadapuram', 'Indore', 'Jabalpur',
        'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur',
        'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen',
        'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni',
        'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi',
        'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'
      ]
    },
    'Maharashtra': {
      districts: [
        'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
        'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
        'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
        'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
        'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
        'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
      ]
    },
    'Manipur': {
      districts: [
        'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East',
        'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi',
        'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal',
        'Thoubal', 'Ukhrul'
      ]
    },
    'Meghalaya': {
      districts: [
        'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills',
        'Eastern West Khasi Hills', 'North Garo Hills', 'Ri Bhoi',
        'South Garo Hills', 'South West Garo Hills',
        'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills',
        'West Khasi Hills'
      ]
    },
    'Mizoram': {
      districts: [
        'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib',
        'Lawngtlai', 'Lunglei', 'Mamit', 'Saitual', 'Serchhip', 'Siaha'
      ]
    },
    'Nagaland': {
      districts: [
        'Chümoukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng',
        'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek',
        'Shamator', 'Tseminyü', 'Tuensang', 'Wokha', 'Zünheboto'
      ]
    },
    'Odisha': {
      districts: [
        'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh',
        'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam',
        'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal',
        'Kendrapara', 'Kendujhar (Keonjhar)', 'Khordha', 'Koraput',
        'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
        'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'
      ]
    },
    'Punjab': {
      districts: [
        'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib',
        'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar',
        'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga',
        'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar',
        'Sangrur', 'Shaheed Bhagat Singh Nagar', 'Sri Muktsar Sahib',
        'Tarn Taran'
      ]
    },
    'Rajasthan': {
      districts: [
        'Ajmer', 'Alwar', 'Anupgarh', 'Balotra', 'Banswara', 'Baran',
        'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi',
        'Chittorgarh', 'Churu', 'Dausa', 'Deeg', 'Dholpur', 'Didwana-Kuchaman',
        'Dudu', 'Dungarpur', 'Ganganagar', 'Gangapur City', 'Hanumangarh',
        'Jaipur', 'Jaipur Rural', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu',
        'Jodhpur', 'Jodhpur Rural', 'Karauli', 'Kekri', 'Khairthal-Tijara',
        'Kota', 'Kotputli-Behror', 'Nagaur', 'Neem Ka Thana', 'Pali',
        'Phalodi', 'Pratapgarh', 'Rajsamand', 'Salumbar', 'Sanchore',
        'Sawai Madhopur', 'Shahpura', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'
      ]
    },
    'Sikkim': {
      districts: [
        'East Sikkim', 'North Sikkim', 'Pakyong', 'Soreng', 'South Sikkim',
        'West Sikkim'
      ]
    },
    'Tamil Nadu': {
      districts: [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
        'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
        'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
        'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur',
        'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga',
        'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli',
        'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
        'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram',
        'Virudhunagar'
      ]
    },
    'Telangana': {
      districts: [
        'Adilabad', 'Bhadradri Kothagu dem', 'Hanumakonda', 'Hyderabad',
        'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal',
        'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem',
        'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak',
        'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda',
        'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli',
        'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet',
        'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal',
        'Yadadri Bhuvanagiri'
      ]
    },
    'Tripura': {
      districts: [
        'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala',
        'South Tripura', 'Unakoti', 'West Tripura'
      ]
    },
    'Uttar Pradesh': {
      districts: [
        'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya',
        'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur',
        'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor',
        'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria',
        'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad',
        'Gautam Buddh Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda',
        'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun',
        'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar',
        'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur',
        'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau',
        'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit',
        'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur',
        'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli',
        'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur',
        'Unnao', 'Varanasi'
      ]
    },
    'Uttarakhand': {
      districts: [
        'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun',
        'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh',
        'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'
      ]
    },
    'West Bengal': {
      districts: [
        'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar',
        'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah',
        'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda',
        'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman',
        'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur',
        'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
      ]
    },
    'Andaman and Nicobar Islands': {
      districts: [
        'Nicobar', 'North and Middle Andaman', 'South Andaman'
      ]
    },
    'Chandigarh': {
      districts: [
        'Chandigarh'
      ]
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      districts: [
        'Dadra and Nagar Haveli', 'Daman', 'Diu'
      ]
    },
    'Delhi': {
      districts: [
        'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi',
        'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi',
        'South East Delhi', 'South West Delhi', 'West Delhi'
      ]
    },
    'Jammu and Kashmir': {
      districts: [
        'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda',
        'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara',
        'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba',
        'Shopian', 'Srinagar', 'Udhampur'
      ]
    },
    'Ladakh': {
      districts: [
        'Kargil', 'Leh'
      ]
    },
    'Lakshadweep': {
      districts: [
        'Lakshadweep'
      ]
    },
    'Puducherry': {
      districts: [
        'Karaikal', 'Mahe', 'Puducherry', 'Yanam'
      ]
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!tempData.district.trim()) {
      newErrors.district = 'District is required';
    }

    if (!tempData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset district if state changes
    if (name === 'state') {
      setTempData(prev => ({
        ...prev,
        district: ''
      }));
    }

    // Clear error when user makes changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempData({
      district: userData.district || '',
      state: userData.state || ''
    });
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      const result = updateProfile(tempData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        setEditMode(false);
      } else {
        alert('Error updating profile: ' + result.error);
      }
    }
  };

  const handleCancel = () => {
    setTempData({
      district: userData.district || '',
      state: userData.state || ''
    });
    setEditMode(false);
    setErrors({});
  };

  const handleLanguageChange = () => {
    navigate('/'); // Redirect to home page
  };

  const availableDistricts = tempData.state && districtsAndCitiesByState[tempData.state]
    ? districtsAndCitiesByState[tempData.state].districts
    : [];
    
  // Some shared styles
  const inputStyle = {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      color: '#111827',
      boxSizing: 'border-box'
  };

  const labelStyle = {
      display: 'block',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
      fontSize: '14px'
  };
  
  const buttonBaseStyle = {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      minWidth: '120px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfccb 50%, #fefce8 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '10px',
      overflow: 'auto'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '40px',
          border: '1px solid rgba(34, 197, 94, 0.1)'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '20px'
          }}>
            <h1 style={{ color: '#166534', fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0' }}>My Profile</h1>
            <p style={{ color: '#4b5563', fontSize: '16px', margin: '0' }}>View and manage your personal details.</p>
          </div>
          
          {/* Form Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Non-editable fields */}
            <div>
              <label style={labelStyle}>Full Name</label>
              <div style={{...inputStyle, backgroundColor: '#e5e7eb', color: '#4b5563'}}>{userData.fullName}</div>
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{...inputStyle, backgroundColor: '#e5e7eb', color: '#4b5563'}}>{userData.email}</div>
            </div>

            {/* Editable fields based on mode */}
            {!editMode ? (
              <>
                <div>
                  <label style={labelStyle}>State</label>
                  <div style={inputStyle}>{userData.state}</div>
                </div>
                <div>
                  <label style={labelStyle}>District</label>
                  <div style={inputStyle}>{userData.district}</div>
                </div>
              </>
            ) : (
              <>
                {/* State Dropdown */}
                <div>
                  <label htmlFor="state" style={labelStyle}>State</label>
                  <select
                    id="state"
                    name="state"
                    value={tempData.state}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select your state</option>
                    {indianStatesAndUTs.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.state}</p>}
                </div>

                {/* District Dropdown */}
                <div>
                  <label htmlFor="district" style={labelStyle}>District</label>
                  <select
                    id="district"
                    name="district"
                    value={tempData.district}
                    onChange={handleInputChange}
                    disabled={!tempData.state}
                    style={{...inputStyle, cursor: !tempData.state ? 'not-allowed' : 'pointer'}}
                  >
                    <option value="" disabled>Select your district</option>
                    {availableDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.district}</p>}
                </div>
              </>
            )}
          </div>
          
          {/* Action Buttons */}
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
            {editMode ? (
              <>
                <button
                  onClick={handleCancel}
                  style={{
                    ...buttonBaseStyle,
                    backgroundColor: '#e5e7eb',
                    color: '#4b5563'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    ...buttonBaseStyle,
                    backgroundColor: '#22c55e',
                    color: 'white'
                  }}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button 
                    onClick={handleLanguageChange}
                    style={{ 
                        ...buttonBaseStyle, 
                        marginRight: 'auto',
                        backgroundColor: 'transparent',
                        color: '#166534',
                        border: '1px solid #166534'
                    }}
                >
                    Change Language
                </button>
                <button
                  onClick={handleEdit}
                  style={{
                    ...buttonBaseStyle,
                    backgroundColor: '#166534',
                    color: 'white'
                  }}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// To make this runnable, wrap it in the mock provider
const App = () => (
  <MockProfileProvider>
    <ProfilePage />
  </MockProfileProvider>
);

export default App;