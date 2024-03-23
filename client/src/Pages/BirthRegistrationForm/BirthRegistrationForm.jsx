import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; 
import { useAuthContext } from '../../Context/AuthContext';
import Marquee from 'react-fast-marquee';
const BirthRegistrationForm = () => {
    const [formData, setFormData] = useState({
        registerOfficeAddress: '',
        upazilaOrCity: '',
        birthRegistrationNumber: '',
        leftBarcode: '',
        dateOfRegistration: '',
        dateOfIssuance: '',
        dateOfBirth: '',
        gender: 'Male',
        dateOfBirthInWords: '',
        nameInBangla: '',
        nameInEnglish: '',
        fatherNameInBangla: '',
        fatherNameInEnglish: '',
        fatherNationality: 'Bangladeshi',
        fatherNationalityBangla:'বাংলাদেশী',
        motherNameInBangla: '',
        motherNameInEnglish: '',
        motherNationality:'Bangladeshi',
        motherNationalityBangla:'বাংলাদেশী',
        placeOfBirthInBangla: '',
        placeOfBirthInEnglish: '',
        permanentAddressInBangla: '',
        permanentAddressInEnglish: '',
        category: 'birth'
    });
    const { refresh , setRefresh, balance  } = useAuthContext();
    const [Balance, setBalance] = useState({});
    useEffect(() => {
        const fetchBalance = async () => {
          try {
            const response = await fetch('/api/balance');
            const data = await response.json();
            setBalance(data);
            
          } catch (error) {
            console.error('Error fetching balance:', error.message);
          }
        };
        fetchBalance();
      }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance < Balance.birthBalance) {
            toast.error('Insufficient balance!');
        }
        else{
            fetch('/api/apply/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    fetch('/api/users/update-balance-birth', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            toast.success('Order placed successfully!');
                            setRefresh(!refresh);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            toast.error('Something went wrong!');
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Something went wrong!');
            });
        }
    };

    return (
        <div className="w-full mx-auto mt-8 px-10">
            <h2 className="text-xl font-bold mb-4">জন্ম নিবন্ধন Form</h2>
                <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.birthBalance}tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 '>
                    <div className="mb-4">
                        <label htmlFor="registerOfficeAddress" className="block mb-1">Register Office Address *</label>
                        <input
                            type="text"
                            id="registerOfficeAddress"
                            name="registerOfficeAddress"
                            value={formData.registerOfficeAddress}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="upazilaOrCity" className="block mb-1">Upazila/Pourashava/City Corporation, Zila *</label>
                        <input
                            type="text"
                            id="upazilaOrCity"
                            name="upazilaOrCity"
                            value={formData.upazilaOrCity}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="birthRegistrationNumber" className="block mb-1">Birth Registration Number *</label>
                        <input
                            type="text"
                            id="birthRegistrationNumber"
                            name="birthRegistrationNumber"
                            value={formData.birthRegistrationNumber}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="leftBarcode" className="block mb-1">Left Barcode *</label>
                        <input
                            type="text"
                            id="leftBarcode"
                            name="leftBarcode"
                            value={formData.leftBarcode}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateOfRegistration" className="block mb-1">Date of Registration *</label>
                        <input
                            type="text"
                            id="dateOfRegistration"
                            name="dateOfRegistration"
                            value={formData.dateOfRegistration}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateOfIssuance" className="block mb-1">Date of Issuance *</label>
                        <input
                            type="text"
                            id="dateOfIssuance"
                            name="dateOfIssuance"
                            value={formData.dateOfIssuance}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
               </div> 
               <div className="mb-4">
                        <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth *</label>
                        <input
                            type="text"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 '>
                    

                    <div className="mb-4">
                        <label htmlFor="gender" className="block mb-1">Gender *</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateOfBirthInWords" className="block mb-1">Date of Birth in Words</label>
                        <input
                            type="text"
                            id="dateOfBirthInWords"
                            name="dateOfBirthInWords"
                            value={formData.dateOfBirthInWords}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nameInBangla" className="block mb-1">নাম *</label>
                        <input
                            type="text"
                            id="nameInBangla"
                            name="nameInBangla"
                            value={formData.nameInBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nameInEnglish" className="block mb-1">Name (English) *</label>
                        <input
                            type="text"
                            id="nameInEnglish"
                            name="nameInEnglish"
                            value={formData.nameInEnglish}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fatherNameInBangla" className="block mb-1">পিতার নাম *</label>
                        <input
                            type="text"
                            id="fatherNameInBangla"
                            name="fatherNameInBangla"
                            value={formData.fatherNameInBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fatherNameInEnglish" className="block mb-1">Father's Name (English) *</label>
                        <input
                            type="text"
                            id="fatherNameInEnglish"
                            name="fatherNameInEnglish"
                            value={formData.fatherNameInEnglish}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fatherNationalityBangla" className="block mb-1">পিতার জাতীয়তা *</label>
                        <input
                            type="text"
                            id="fatherNationalityBangla"
                            name="fatherNationalityBangla"
                            value={formData.fatherNationalityBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fatherNationality" className="block mb-1">Father's Nationality *</label>
                        <input
                            type="text"
                            id="fatherNationality"
                            name="fatherNationality"
                            value={formData.fatherNationality}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="motherNameInBangla" className="block mb-1">মাতার নাম *</label>
                        <input
                            type="text"
                            id="motherNameInBangla"
                            name="motherNameInBangla"
                            value={formData.motherNameInBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="motherNameInEnglish" className="block mb-1">Mother's Name (English) *</label>
                        <input
                            type="text"
                            id="motherNameInEnglish"
                            name="motherNameInEnglish"
                            value={formData.motherNameInEnglish}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="motherNationalityBangla" className="block mb-1">মাতার জাতীয়তা *</label>
                        <input
                            type="text"
                            id="motherNationalityBangla"
                            name="motherNationalityBangla"
                            value={formData.motherNationalityBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="motherNationality" className="block mb-1">Mother's Nationality *</label>
                        <input
                            type="text"
                            id="motherNationality"
                            name="motherNationality"
                            value={formData.motherNationality}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="placeOfBirthInBangla" className="block mb-1">জন্মস্থান *</label>
                        <input
                            type="text"
                            id="placeOfBirthInBangla"
                            name="placeOfBirthInBangla"
                            value={formData.placeOfBirthInBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="placeOfBirthInEnglish" className="block mb-1">Place of Birth (English) *</label>
                        <input
                            type="text"
                            id="placeOfBirthInEnglish"
                            name="placeOfBirthInEnglish"
                            value={formData.placeOfBirthInEnglish}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="permanentAddressInBangla" className="block mb-1">স্থায়ী ঠিকানা *</label>
                        <input
                            type="text"
                            id="permanentAddressInBangla"
                            name="permanentAddressInBangla"
                            value={formData.permanentAddressInBangla}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="permanentAddressInEnglish" className="block mb-1">Permanent Address (English) *</label>
                        <input
                            type="text"
                            id="permanentAddressInEnglish"
                            name="permanentAddressInEnglish"
                            value={formData.permanentAddressInEnglish}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BirthRegistrationForm;
