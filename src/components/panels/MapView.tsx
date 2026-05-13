import { motion } from 'framer-motion';
import { MapPin, Navigation, Eye, EyeOff, AlertTriangle, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import GlassPanel from '../ui/GlassPanel';
import PillBadge from '../ui/PillBadge';
import type { Region } from '../../types';
import './MapView.css';

export default function MapView() {
  const { state, dispatch } = useGame();
  const { gameMap } = state;
  const isCurrentParent = gameMap.currentLocation === gameMap.parentRegion.id;

  const handleTravel = (regionId: string) => {
    dispatch({ type: 'SET_LOCATION', payload: regionId });
    dispatch({ type: 'ADVANCE_TIME', payload: 30 });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        title: '移动',
        message: `前往了${gameMap.subRegions.find(r => r.id === regionId)?.name || gameMap.parentRegion.name}`,
      },
    });
  };

  return (
    <div id="map-view" className="map-view">
      {/* 上级区域 */}
      <motion.div
        className={`map-region map-region-parent ${isCurrentParent ? 'current' : ''}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassPanel className="region-card" variant="strong" glow={isCurrentParent}>
          <div className="region-header">
            <div className="region-title-row">
              <MapPin size={18} className="region-pin" />
              <h3 className="region-name">{gameMap.parentRegion.name}</h3>
              {isCurrentParent && <PillBadge text="当前位置" variant="info" size="sm" pulse />}
            </div>
            <div className="region-meta">
              <span className="region-danger" title="危险等级">
                <AlertTriangle size={12} /> {gameMap.parentRegion.dangerLevel}/5
              </span>
              <span title={gameMap.parentRegion.explored ? '已探索' : '未探索'}>
                {gameMap.parentRegion.explored ? <Eye size={12} /> : <EyeOff size={12} />}
              </span>
            </div>
          </div>
          <p className="region-desc">{gameMap.parentRegion.description}</p>
          <div className="region-resources">
            {gameMap.parentRegion.resources.map((r) => (
              <span key={r} className="resource-tag"><Package size={10} /> {r}</span>
            ))}
          </div>
        </GlassPanel>
      </motion.div>

      {/* 连接线区域 */}
      <div className="map-connections">
        <svg className="map-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
          <line x1="50" y1="0" x2="25" y2="40" stroke="rgba(126,200,227,0.2)" strokeWidth="1.5" strokeDasharray="6 3" />
          <line x1="50" y1="0" x2="75" y2="40" stroke="rgba(126,200,227,0.2)" strokeWidth="1.5" strokeDasharray="6 3" />
        </svg>
        <div className="map-connector-arrow map-arrow-1">
          <Navigation size={14} color="var(--text-muted)" />
        </div>
        <div className="map-connector-arrow map-arrow-2">
          <Navigation size={14} color="var(--text-muted)" />
        </div>
      </div>

      {/* 下级区域 */}
      <div className="map-sub-regions">
        {gameMap.subRegions.map((region, i) => {
          const isCurrent = gameMap.currentLocation === region.id;
          return (
            <motion.div
              key={region.id}
              id={`region-${region.id}`}
              className={`map-region map-region-sub ${isCurrent ? 'current' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <GlassPanel className="region-card" variant="strong" glow={isCurrent}>
                <div className="region-header">
                  <div className="region-title-row">
                    <MapPin size={15} className="region-pin" />
                    <h4 className="region-name">{region.name}</h4>
                    {isCurrent && <PillBadge text="当前位置" variant="info" size="sm" pulse />}
                  </div>
                  <div className="region-meta">
                    <span className="region-danger"><AlertTriangle size={11} /> {region.dangerLevel}/5</span>
                    <span>{region.explored ? <Eye size={11} /> : <EyeOff size={11} />}</span>
                  </div>
                </div>
                <p className="region-desc">{region.description}</p>
                <div className="region-resources">
                  {region.resources.map((r) => (
                    <span key={r} className="resource-tag"><Package size={9} /> {r}</span>
                  ))}
                </div>
                {!isCurrent && (
                  <button
                    id={`travel-${region.id}`}
                    className="travel-btn"
                    onClick={() => handleTravel(region.id)}
                  >
                    <Navigation size={14} />
                    前往此地
                  </button>
                )}
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
