import { StatCardProps } from '../types/types'

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
      <div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <div>
          <h4>{title}</h4>
          <p>{value}</p>
        </div>
      </div>
    );
  };

  export default StatCard;