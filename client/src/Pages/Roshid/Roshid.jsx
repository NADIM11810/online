import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext';
import Marquee from 'react-fast-marquee';
const Roshid = () => {
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
    const [formData, setFormData] = useState({
        bangladeshFormNo: '',
        attachment: '',
        serialNumber: '',
        paragraphNumber: '',
        landOfficeName: '',
        mouzaJLNo: '',
        upazilaThana: '',
        district: '',
        ownerName: '',
        ownerShare: '',
        landCategory: '',
        landArea: '',
        plotNo: '',
        khatianNo: '',
        holdingNumber: '',
        arrearLastThreeYears: '',
        arrearPastThreeYears: '',
        interestAndCompensation: '',
        currentClaim: '',
        totalClaim: '',
        totalCollection: '',
        totalArrear: '',
        totalInWords: '',
        noteBl: '',
        challanNo: '',
        dateBangla: '',
        dateEnglish: '',
        category: 'roshid'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance < Balance.roshidBalance) {
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
                    fetch('/api/users/update-balance-roshid', {
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
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">রশিদ Form</h2>
                <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.roshidBalance}tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
            <form onSubmit={handleSubmit} className=" w-full mx-auto">
                {/* General Information */}

                <div className='grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                    <div>
                        <h2 className="text-lg font-bold mb-2">সাধারণ তথ্য (General Information):</h2>
                        <div className="mb-4">
                            <label htmlFor="bangladeshFormNo" className="block mb-1">বাংলাদেশ ফরম নং</label>
                            <input type="text" id="bangladeshFormNo" name="bangladeshFormNo" value={formData.bangladeshFormNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="attachment" className="block mb-1">পরিশিষ্ট (বাংলায়)</label>
                            <input type="text" id="attachment" name="attachment" value={formData.attachment} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="serialNumber" className="block mb-1">ক্রমিক নং (বাংলায়)</label>
                            <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="paragraphNumber" className="block mb-1">অনুচ্ছেদ নং (বাংলায়)</label>
                            <input type="text" id="paragraphNumber" name="paragraphNumber" value={formData.paragraphNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="landOfficeName" className="block mb-1">ভূমি অফিসের নাম (বাংলায়)</label>
                            <input type="text" id="landOfficeName" name="landOfficeName" value={formData.landOfficeName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mouzaJLNo" className="block mb-1">মৌজার জে. এল. নং (বাংলায়)</label>
                            <input type="text" id="mouzaJLNo" name="mouzaJLNo" value={formData.mouzaJLNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="upazilaThana" className="block mb-1">উপেজলা / থানা (বাংলায়)</label>
                            <input type="text" id="upazilaThana" name="upazilaThana" value={formData.upazilaThana} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="district" className="block mb-1">জেলা (বাংলায়)</label>
                            <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">আদায়ের বিবরণ (Payment Details):</h2>
                        <div className="mb-4">
                            <label htmlFor="arrearLastThreeYears" className="block mb-1">তিন বৎসরের ঊর্ধ্বের বকেয়া (বাংলায়)</label>
                            <input type="text" id="arrearLastThreeYears" name="arrearLastThreeYears" value={formData.arrearLastThreeYears} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="arrearPastThreeYears" className="block mb-1">গত তিন বছরের বকেয়া (বাংলায়)</label>
                            <input type="text" id="arrearPastThreeYears" name="arrearPastThreeYears" value={formData.arrearPastThreeYears} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="interestAndCompensation" className="block mb-1">বকেয়ার সুদ ও ক্ষতিপূরণ (বাংলায়)</label>
                            <input type="text" id="interestAndCompensation" name="interestAndCompensation" value={formData.interestAndCompensation} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="currentClaim" className="block mb-1">হাল দাবি (বাংলায়)</label>
                            <input type="text" id="currentClaim" name="currentClaim" value={formData.currentClaim} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalClaim" className="block mb-1">মোট দাবি (বাংলায়)</label>
                            <input type="text" id="totalClaim" name="totalClaim" value={formData.totalClaim} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalCollection" className="block mb-1">মোট আদায় (বাংলায়)</label>
                            <input type="text" id="totalCollection" name="totalCollection" value={formData.totalCollection} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalArrear" className="block mb-1">মোট বকেয়া (বাংলায়)</label>
                            <input type="text" id="totalArrear" name="totalArrear" value={formData.totalArrear} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalInWords" className="block mb-1">সর্বমোট (কথায়) (বাংলায়)</label>
                            <input type="text" id="totalInWords" name="totalInWords" value={formData.totalInWords} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-bold mb-2">জমির বিবরণ (Land Details):</h2>
                        <div className="mb-4">
                            <label htmlFor="landCategory" className="block mb-1">জমির শ্রেণী (বাংলায়)</label>
                            <textarea type="text" id="landCategory" name="landCategory" value={formData.landCategory} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="landArea" className="block mb-1">জমির পরিমাণ (বাংলায়)</label>
                            <textarea placeholder='জমির পরিমান[০.০০০০০ এই ফরমেট অনুসারে জমির পরিমান দিবেন, উদাহরন ১ শতক হলে ১.০০০০০]' type="text" id="landArea" name="landArea" value={formData.landArea} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="plotNo" className="block mb-1">দাগ নং (বাংলায়)</label>
                            <textarea type="text" id="plotNo" name="plotNo" value={formData.plotNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="khatianNo" className="block mb-1">খতিয়ান নং (বাংলায়)</label>
                            <input type="text" id="khatianNo" name="khatianNo" value={formData.khatianNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="holdingNumber" className="block mb-1">২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার</label>
                            <input type="text" id="holdingNumber" name="holdingNumber" value={formData.holdingNumber} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-2">অতিরিক্ত (Additional):</h2>
                        <div className="mb-4">
                            <label htmlFor="noteBl" className="block mb-1">নোট (বাংলায়)</label>
                            <input type="text" id="noteBl" name="noteBl" value={formData.noteBl} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="challanNo" className="block mb-1">চালান নং (বাংলায়)</label>
                            <input type="text" id="challanNo" name="challanNo" value={formData.challanNo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateBangla" className="block mb-1">তারিখ (বাংলা) (বাংলায়)</label>
                            <input type="text" id="dateBangla" name="dateBangla" value={formData.dateBangla} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateEnglish" className="block mb-1">তারিখ (ইংলিশ)</label>
                            <input type="text" id="dateEnglish" name="dateEnglish" value={formData.dateEnglish} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">মালিকের বিবরণ (Owner's Details):</h2>
                        <div className="mb-4">
                            <label htmlFor="ownerName" className="block mb-1">মালিকের নাম (বাংলায়)</label>
                            <textarea type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ownerShare" className="block mb-1">মালিকের অংশ (বাংলায়)</label>
                            <textarea type="text" id="ownerShare" name="ownerShare" value={formData.ownerShare} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Roshid;
