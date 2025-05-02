import { SearchType } from "../types";
import axios from "axios";
import { useMemo, useState } from "react";
import { string, number, object, InferOutput, parse } from "valibot";

const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),

    })
});

export type WeatherType = InferOutput<typeof WeatherSchema>;

const initialWeather = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
} as WeatherType;

export default function useWeather() {

    const [weather, setWeather] = useState<WeatherType>(initialWeather);
    const [searching, setSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async ( search : SearchType ) =>{
        setWeather(initialWeather);
        setSearching(true);
        setNotFound(false);
        const { city, country } = search;
        const apiKey = import.meta.env.VITE_API_KEY;

        try {
            
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

            const { data} = await axios.get(geoUrl);
            const { lat, lon } = data.coord;
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            const { data : weatherResponse } = await axios.get(weatherUrl);
            const result = parse(WeatherSchema, weatherResponse);
            
            if (result) {
                setWeather(result);
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setNotFound(true);
            }
            console.error(error);
            setNotFound(true);
            throw new Error('Error fetching weather data');
            
        } finally {
            setSearching(false);
        }
    }
    
    const hasWeatherData = useMemo(()=> weather.name,[weather]);

    return{
        weather,
        fetchWeather,
        hasWeatherData,
        searching,
        notFound

    }
}