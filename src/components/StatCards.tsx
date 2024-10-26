import StatCard  from './StatCard'
import {StatCardsProps} from '../types/types'

const StatCards: React.FC<StatCardsProps> = ({ statCardsData }) => {
    return (
        <div className="stats-summary">
        <StatCard
          title="Total product"
          value={statCardsData.totalProducts}
          icon={<span>🛒</span>}
        />
        <StatCard
          title="Total store value"
          value={'$ '+statCardsData.totalStoreValue}
          icon={<span>💰</span>}
        />
        <StatCard
          title="Out of stocks"
          value={statCardsData.outOfStock}
          icon={<span>🚫</span>}
        />
        <StatCard
          title="No of Category"
          value={statCardsData.categories}
          icon={<span>📊</span>}
        />
      </div>
    );
  };

  export default StatCards;