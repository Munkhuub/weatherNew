"use client";

import styles from "./Weather.module.css";
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
    <div className={styles.page}>
      <div className="w-screen flex object-contain justify-center bg-rgb(26, 24, 24)">
        <div className="w-1/2">
          <img
            src="/images/light.png"
            className="w-full object-cover h-1200px"
          ></img>
          <div className="w-full object-cover h-1200px bg-rgba(243, 244, 246, 1)">
            <img src="/images/search.png"></img>

            <input
              type="search"
              value={input}
              onChange={handleInputChange}
              placeholder="Search"
            />
          </div>
          <div className="rounded-3xl bg-rgba(0, 0, 0, 1) bg-rgba(17, 24, 39, 1) bg-rgba(255, 255, 255, 0.8) absolute top-160px left-40px text-[28px] font-bold p-9px z-5">
            {filteredCities?.length > 0 &&
              filteredCities?.map((item, index) => (
                <div key={index} className={styles.searchResult}>
                  {item.cities.map((itm, idx) => (
                    <div
                      key={idx}
                      className={styles.filteredcity}
                      onClick={() => setCity(`${itm}, ${item.country}`)}
                    >
                      {itm}, {item.country}
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="h-832px w-414px bg-rgba(255, 255, 255, 0.75) backdrop-blur-24 absolute top-230px left-193px rounded-[48px] p-48px">
            <div className="text-rgba(17, 24, 39, 1) text-lg">
              {data?.location.localtime.slice(0, 10)}
            </div>
            <div className="text-[48px] text-rgba(17, 24, 39, 1) text-extrabold">
              {data?.location.name}
            </div>
            <img src="/images/sun.png"></img>
            <div className="bg-linear-gradient(180deg, #111827 0%, #6b7280 100%) bg-clip-text text-transparent text-[144px] text-extrabold">
              {data?.current.temp_c}°
            </div>
            <div className="text-[24px] text-rgba(255, 142, 39, 1) text-extrabold">
              {data?.current.condition.text}
            </div>
            <div className="flex gap-[65px] absolute bottom-48px left-46px">
              <img src="/images/home.png" className="h-32px w-32px"></img>
              <img src="/images/location.png" className="h-32px w-32px"></img>
              <img src="/images/heart.png" className="h-32px w-32px"></img>
              <img src="/images/user.png" className="h-32px w-32px"></img>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src="/images/dark.png"></img>
          <div className={styles.cardRight}>
            <div className={styles.dateNight}>
              {data?.location.localtime.slice(0, 10)}
            </div>
            <img src="/images/moon.png"></img>
            <div className={styles.cityNight}>{data?.location?.name}</div>
            <div className={styles.temperatureNight}>
              {nightForecast?.temp_c || data?.current?.temp_c}°
            </div>
            <div className={styles.conditionNight}>
              {nightForecast?.condition?.text || "Night forecast"}
            </div>
            <div className={styles.icons}>
              <img src="/images/home.png"></img>
              <img src="/images/location.png"></img>
              <img src="/images/heart.png"></img>
              <img src="/images/user.png"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
