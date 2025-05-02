import styles from "./WeatherNotFound.module.css";

export default function WeatherNotFound() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Ciudad no encontrada</h2>
      <p className={styles.message}>
        No pudimos encontrar el clima para esa ubicación. Por favor, verifica el nombre e intenta nuevamente.
      </p>
    </div>
  );
}
