import "../../css/localpopup.css"
import "../../css/localpopupbasic.css"
import DatePicker from "react-datepicker";
import { useState, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from "axios";

export default function CustomerModal({ close }) {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const [FULL_NAME, setFullName] = useState('')
    const [GENDER, setGender] = useState('male')
    const [BIRTHDAY, setBirthday] = useState('')
    const [PHONE_NUMBER, setPhone] = useState('')
    const [IDENTITY_NUMBER, setIdentity] = useState('')
    const [COUNTRY, setCountry] = useState('Viet Nam')



    const changeHandler = (value) => {
        setValue(value);
        setCountry(value.label);
    }

    const displayInfo = () => {
        console.log(FULL_NAME,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY)
    }

    const addCustomer = () => {
        console.log(FULL_NAME,GENDER,BIRTHDAY,PHONE_NUMBER,IDENTITY_NUMBER,COUNTRY)
        axios.post('http://localhost:5000/createcustomer',{
            name: FULL_NAME,
            gender: GENDER,
            birthday: BIRTHDAY,
            phone: PHONE_NUMBER,
            identity: IDENTITY_NUMBER,
            country: COUNTRY,
        }).then(() => {
            console.log("thanh cong")
        })
    }

  

    return (
        <div className="pl-24">
            <div className="translate-x-[47rem] text-2xl">
                <a className="close cursor-pointer" onClick={close}>
                    &times;
                </a>
            </div>
            <form className="grid grid-rows-4 grid-flow-col gap-x-2 gap-y-4 -translate-x-16">
                <div className="ml-8 mt-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-10 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => {
                            setFullName(e.target.value);
                        }}

                    />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="gender" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>
                    <select value={GENDER} onChange={(e) => {
                        setGender(e.target.value);
                    }}
                        className="ml-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="gender" name="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="others">others</option>
                    </select>
                </div>
                <div className="ml-8 mt-1 flex">
                    <label htmlFor="birthday" className="mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                    <DatePicker id="birthday" dateFormat="dd/MM/yyyy" value={BIRTHDAY} className="ml-12  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[6rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " selected={startDate} onChange={(date) => {
                        const dateString = new Date(date).toLocaleDateString()
                        setStartDate(date);
                        setBirthday(dateString)
                    }} />
                </div>
                <div className="ml-8 mt-1">
                    <label htmlFor="phone" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-2 w-[18rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className="ml-8 mt-2">
                    <label htmlFor="identity" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Identity</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-12 w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="identity"
                        id="identity"
                        onChange={(e) => {
                            setIdentity(e.target.value);
                        }}

                    />
                </div>
                <div className="flex mt-3 ml-8">
                    <label htmlFor="country" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <Select id="country" className="z-10 w-[10rem] ml-12 -translate-y-1" options={options} value={value} 
                        onChange={changeHandler}
                        />
                </div>
                <div className="relative mt-2">
                    <button className="right-0 bottom-0 translate-y-20 -translate-x-40 absolute  bg-[#f59e0b] text-white p-2 rounded-lg">Delete</button>
                    <div className="right-0 bottom-0 absolute translate-y-20 -translate-x-8 bg-[#374151] text-white p-2 rounded-lg cursor-pointer" onClick={addCustomer}>Save Changes</div>
                </div>
            </form>
        </div>
    )
}