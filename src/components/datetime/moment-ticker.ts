import Ticker from '@/util/ticker';
import moment from 'moment';

export const ticker = new Ticker(10000, () => moment());

export default ticker.schedule.bind(ticker);
