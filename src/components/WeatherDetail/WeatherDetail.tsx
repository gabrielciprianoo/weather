import { WeatherType } from "../../hooks/useWeather";
import { formatTemperature } from "../../utils";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: WeatherType;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  const { name, main } = weather;
  const { temp, temp_max, temp_min } = main;

  return (
    <div className={styles.card}>
      <h2 className={styles.cityName}>Clima en {name}</h2>
      <p className={styles.temperature}>{formatTemperature(temp)}</p>
      <div className={styles.temps}>
        <p className={styles.tempMin}>
          Mín: <span>{formatTemperature(temp_min)}</span>
        </p>
        <p className={styles.tempMax}>
          Máx: <span>{formatTemperature(temp_max)}</span>
        </p>
      </div>
    </div>
  );
}
