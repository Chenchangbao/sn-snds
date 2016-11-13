

// portal
import portal from './portal/portalCtrl';
// template
import overview from './template/overview/overviewCtrl';
import instances from './template/instances/instancesCtrl';
import instanceDetail from './template/instanceDetail/instanceDetailCtrl';
import manager from './template/manager/managerCtrl';
import logPage from './template/manager/log/LogCtrl';
import update from './template/update/updateCtrl';
import updateModal from './template/update/update/updateModalCtrl';
import toggleModal from './template/manager/toggle/toggleModalCtrl';


export default app => {
  INCLUDE_ALL_MODULES([
    portal,
    overview,
    manager,
    update,
    logPage,
    updateModal,
    toggleModal,
    instances,
    instanceDetail
  ], app);
}
