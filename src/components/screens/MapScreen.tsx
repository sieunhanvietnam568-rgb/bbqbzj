import TimeDisplay from '../panels/TimeDisplay';
import MapView from '../panels/MapView';
import './MapScreen.css';

export default function MapScreen() {
  return (
    <div id="map-screen" className="map-screen">
      <TimeDisplay />
      <MapView />
    </div>
  );
}
