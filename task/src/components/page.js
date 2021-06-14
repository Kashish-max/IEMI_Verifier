import React, { Component, useState, useEffect } from "react";
import './page.css'

const Page = () => {
    const [apiRes, setRes] = useState('');
    const [colorRes, setColor] = useState('#64ffda');

    useEffect(() => {
        const myForm = document.getElementById("myform");
        myForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            var inputValue = formData.get("iemi");

            if (!parseInt(inputValue)) {
                setRes("Please enter a valid IEMI number")
                setColor("#e06868");
            }
            else {setColor("#64ffda");}

            fetch(`https://taskapi-kashish241001-gmailcom.vercel.app/checkIEMI/${inputValue}`, {
                method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                data.correct==true ? setColor("#64ffda") : setColor("#e06868");
                setRes(data.responseText);
            })
            .catch(function (error) {
                console.log('Request failed', error);
                setRes("Please enter a valid IEMI number");
                setColor("#e06868");
            });
        })
    });

    return (
        <div className="page">
            <div className="content" style= {{ "--res": colorRes }}>
                <div className="header">
                    <h1 className="myself">Hi, I'm Kashish Goyal</h1>
                    <h2>What is an IEMI number?</h2>
                        <p>IMEI or International Mobile Equipment Identity number is used to uniquely
                            identify a mobile device on the network. Based on this number, you can check information about the device,
                            like a brand or model.
                        </p>
                </div>
                <div className="form">
                    <h2>VERIFY IEMI NUMBER</h2>
                    <form id="myform">
                        <input className="input" name="iemi" autoComplete="off" minLength="15" maxLength="15" placeholder="Enter IMEI e.g. 123456789012347" required />
                        <input type="submit" value="MAKE GET REQUEST"/>
                    </form>
                    <h2 className="response">{ apiRes }</h2>
                </div>
            </div>
            <footer>
                <p>Built with {'<'}3 <span> by Kashish.</span></p>
            </footer>
        </div>
    );
}
 
export default Page ;
