import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const NidOrder = () => {
    const { refresh, setRefresh, balance } = useAuthContext();
    const [Balance, setBalance] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [nid, setNid] = useState('');
    const [formNumber, setFormNumber] = useState('');
    const [voterNumber, setVoterNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [birthCertificateNumber, setBirthCertificateNumber] = useState('');
    const [fatherNid, setFatherNid] = useState('');
    const [Name, setName] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
    
        switch (selectedOption) {
            case 'nid':
                data = { nidNumber: nid, category: 'nid' };
                break;
            case 'form':
                data = { formNumberNid: formNumber, category: 'nid' };
                break;
            case 'voter':
                data = { voterNumberNid: voterNumber, category: 'nid' };
                break;
            case 'mobile':
                data = { mobileNumberNid: mobileNumber, category: 'nid' };
                break;
            case 'birthCertificate':
                data = { birthCertificateNumberNid: birthCertificateNumber, category: 'nid' };
                break;
            case 'fatherNid':
                data = { fatherNidNumberNid: fatherNid, NameNid: Name, category: 'nid' };
                break;
            default:
                return;
        }
        console.log(data);
        if (balance < Balance[selectedOption + 'Balance']) {
            toast.error('Insufficient balance!');
        } else {
            fetch('/api/apply/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                fetch('/api/users/update-balance-nid', {
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
    

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const renderInputField = () => {
        switch (selectedOption) {
            case 'nid':
                return (
                    <input
                        type="text"
                        id="nid"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        value={nid}
                        onChange={(e) => setNid(e.target.value)}
                        placeholder="NID Number"
                        required
                    />
                );
            case 'form':
                return (
                    <input
                        type="text"
                        id="formNumber"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        value={formNumber}
                        onChange={(e) => setFormNumber(e.target.value)}
                        placeholder="Form Number"
                        required
                    />
                );
            case 'voter':
                return (
                    <input
                        type="text"
                        id="voterNumber"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        value={voterNumber}
                        onChange={(e) => setVoterNumber(e.target.value)}
                        placeholder="Voter Number"
                        required
                    />
                );
            case 'mobile':
                return (
                    <input
                        type="text"
                        id="mobileNumber"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Mobile Number"
                        required
                    />
                );
            case 'birthCertificate':
                return (
                    <input
                        type="text"
                        id="birthCertificateNumber"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        value={birthCertificateNumber}
                        onChange={(e) => setBirthCertificateNumber(e.target.value)}
                        placeholder="Birth Certificate Number"
                        required
                    />
                );
            case 'fatherNid':
                return (
                    <>
                        <input
                            type="text"
                            id="fatherNid"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            value={fatherNid}
                            onChange={(e) => setFatherNid(e.target.value)}
                            required
                            placeholder="Father And Mother NID"
                        />
                        <input
                            type="text"
                            id="Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder=" Name"
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto mt-8">
                <h2 className="text-xl font-bold mb-4">Order Form</h2>
                <Marquee>
                    <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.nidBalance}tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="selectOption" className="block text-sm font-medium text-gray-700">Select Option</label>
                        <select
                            id="selectOption"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="nid">NID Number</option>
                            <option value="form">Form Number</option>
                            <option value="voter">Voter Number</option>
                            <option value="mobile">Mobile Number</option>
                            <option value="birthCertificate">Birth Certificate Number</option>
                            <option value="fatherNid">Father and Mother NID Number</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        {renderInputField()}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NidOrder;
