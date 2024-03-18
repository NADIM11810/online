import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Notice = () => {
    const [data , setData] = useState([]);
    useEffect(() => {
        fetch('/api/notice/notices')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setData(data.reverse()[0].notice);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    return (
        <div className="m-4 shadow-xl p-4">
            <Marquee pauseOnHover={true}>
            {data}
            </Marquee>
           
        </div>
    );
};

export default Notice;