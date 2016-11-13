import componentService from './componentService';
import apiService from './apiService';
import sndsService from './sndsService';

export default app => {
  INCLUDE_ALL_MODULES([componentService, apiService, sndsService], app);
}