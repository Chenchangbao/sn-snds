

// portal
import portal from './portal/portalCtrl';
// template
import overview from './template/overview/overviewCtrl';
import instances from './template/instances/instancesCtrl';
import myServices from './template/myServices/myServices';
import instanceNew from './template/instanceNew/instanceNewCtrl';
import instanceDetail from './template/instanceDetail/instanceDetail';
import manager from './template/manager/managerCtrl';
import logPage from './template/manager/log/LogCtrl';
import update from './template/update/updateCtrl';
import updateModal from './template/update/update/updateModalCtrl';
import toggleModal from './template/manager/toggle/toggleModalCtrl';
import bulk from './template/bulk/bulk';


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
    instanceNew,
    instanceDetail,
    myServices,
    bulk
  ], app);
}
