import React, { useState } from "react";
import Weather from "./components/Weather";
import axios from "axios";

const App = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [bgColor, setBgColor] = useState("bg-[#e3e3e3]");

    const API_KEY = "882d621aae8f5e7fc60105cb54ef0ba7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const changeBg = (weatherData) => {
        const weatherMain = weatherData.weather[0].main;

        switch (weatherMain) {
            case "Clear":
                setBgColor(
                    "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600"
                );
                break;
            case "Clouds":
                setBgColor("bg-gradient-to-b from-gray-500 to-gray-200");
                break;
            case "Atmosphere":
                setBgColor("bg-gray-300");
                break;
            case "Snow":
                setBgColor(
                    "bg-gradient-to-b from-sky-100 via-sky-400 via-sky-400 to-sky-100"
                );
                break;
            case "Rain":
            case "Drizzle":
                setBgColor("bg-gray-600");
                break;
            default:
                setBgColor(
                    "bg-gradient-to-br from-black via-purple-300 to-gray-900"
                );
                break;
        }
    };

    const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data);
                changeBg(response.data);
            });
            setLocation("");
        }
    };

    return (
        <div
            className={`w-full min-h-screen relative ${bgColor}`}
        >
            <div className="text-center p-4">
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyDownCapture={searchLocation}
                    className="py-3 px-6 w-[90%] text-lg rounded-3xl border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white/100 shadow-sm shadow-gray-200"
                />
            </div>
            <Weather weatherData={data} />
        </div>
    );
};

export default App;
