"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("Ulaanbaatar");
  const [data, setData] = useState(null);
  const [cities, setCities] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=399cb6193e6743db8a673748252502&q=${city}&days=1`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setData(data);
    };
    getData();
  }, [city]);

  useEffect(() => {
    const getDataCountry = async () => {
      const response = await fetch(
        `https://countriesnow.space/api/v0.1/countries`,
        {
          method: "GET",
        }
      );
      const dataCountry = await response.json();
      setCities(dataCountry);
    };
    getDataCountry();
  }, []);

  console.log(cities);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const filteredCities =
    input === ""
      ? []
      : cities?.data
          ?.filter((item) => {
            for (let i = 0; i < item.cities.length; i++) {
              const cityName = item.cities[i].toLowerCase();
              if (cityName.includes(input.toLowerCase())) {
                return true;
              }
            }
            return false;
          })
          .map((country) => {
            return {
              country: country.country,
              cities: country.cities.filter((cityName) =>
                cityName.toLowerCase().includes(input.toLowerCase())
              ),
            };
          });

  const nightForecast = data?.forecast?.forecastday?.[0]?.hour?.find(
    (hourData) => {
      return hourData.time.includes("21:00");
    }
  );

  return (
    <div className="w-[100vw] flex object-contain justify-center bg-[#1a1818]">
      <div className="w-[50%]">
        <img
          src="/images/light.png"
          className="w-[100%] object-cover h-[1200px]"
        ></img>

        <div className="absolute top-[40px] left-[40px] w-[567px] h-[80px] rounded-[48px] bg-[#FFFFFF] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.06)] flex items-center pl-[24px]">
          <img src="/images/search.png"></img>

          <input
            className="w-[400px] h-[44px] border-none text-[32px]"
            type="search"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
        </div>

        <div className="rounded-[24px] bg-[#FFFFFFCC] absolute top-[160px] left-[40px] text-[28px] font-bold p-[9px] z-[5]">
          {filteredCities?.length > 0 &&
            filteredCities?.map((item, index) => (
              <div key={index} className="cursor-pointer">
                {item.cities.map((itm, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-[#1118271a] p-[5px] rounded-[8px]"
                    onClick={() => setCity(`${itm}, ${item.country}`)}
                  >
                    {itm}, {item.country}
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className="h-[832px] w-[414px] bg-[#FFFFFFBF] backdrop-blur-[24px] absolute top-[230px] left-[193px] rounded-[48px] p-[48px] flex flex-col">
          <div className="text-[#111827] text-[18px]">
            {data?.location.localtime.slice(0, 10)}
          </div>
          <div className="text-[48px] text-[#111827] font-extrabold">
            {data?.location.name}
          </div>
          <img
            src="/images/sun.png"
            className="w-[277px] h-[277px] mt-[74px] ml-[20px]"
          ></img>
          <div className="bg-gradient-to-b from-[#111827] to-[#6b7280] bg-clip-text text-transparent text-[144px] font-extrabold">
            {data?.current.temp_c}°
          </div>
          <div className="text-[24px] text-[#FF8E27] font-extrabold">
            {data?.current.condition.text}
          </div>
          <div className="flex gap-[65px] absolute bottom-[48px] left-[46px]">
            <img src="/images/home.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/location.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/heart.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/user.png" className="w-[32px] h-[32px]"></img>
          </div>
        </div>
      </div>

      <div className="w-[50%]">
        <img
          src="/images/dark.png"
          className="w-[100%] object-cover h-[1200px] bg-[#F3F4F6]"
        ></img>
        <div className="h-[832px] w-[414px] bg-[#111827BF] backdrop-blur-[24px] absolute top-[230px] right-[193px] rounded-[48px] p-[48px]">
          <div className="text-[#9CA3AF] text-[18px]">
            {data?.location.localtime.slice(0, 10)}
          </div>
          <img
            src="/images/moon.png"
            className="w-[277px] h-[277px] mt-[144px] ml-[20px]"
          ></img>
          <div className="absolute top-[70px] text-[48px] text-[#FFFFFF] font-extrabold">
            {data?.location?.name}
          </div>
          <div className="bg-gradient-to-b from-[#F9FAFB] to-[#F9FAFB00] bg-clip-text text-transparent text-[144px] font-extrabold">
            {nightForecast?.temp_c || data?.current?.temp_c}°
          </div>
          <div className="text-[24px] text-[#FF8E27] font-extrabold">
            {nightForecast?.condition?.text || "Night forecast"}
          </div>
          <div className="flex gap-[65px] absolute bottom-[48px] left-[46px]">
            <img src="/images/home.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/location.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/heart.png" className="w-[32px] h-[32px]"></img>
            <img src="/images/user.png" className="w-[32px] h-[32px]"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
