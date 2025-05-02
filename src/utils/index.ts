export function formatTemperature(temp: number): string {
    return `${Math.round(temp - 273.15)} °C`;
}