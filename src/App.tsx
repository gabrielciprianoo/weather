import styles from './App.module.css';
import Form from './components/Form/Form';
import Spinner from './components/Spinner/Spinner';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import WeatherNotFound from './components/WeatherNotFound/WeatherNotFound';
import useWeather from './hooks/useWeather';

function App() {
  
  const { weather, fetchWeather, hasWeatherData, searching, notFound} = useWeather();

  return (
    <div>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {searching && <Spinner/>}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <WeatherNotFound />}
      </div>
    </div>
  );
}

export default App;
