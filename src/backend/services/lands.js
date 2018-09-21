import setupService from './setupService';
import groupArrayHook from '../../hooks/groupArray';

function setupLandService(db) {
  const beforeHook = {};
  const afterHook = {
    // find: [groupArrayHook('')]
  };
  return setupService(db, '/api/lands', 'lands', beforeHook, afterHook);
}

export default setupLandService;
