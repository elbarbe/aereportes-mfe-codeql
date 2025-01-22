import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { QueryResponse } from '../common/answerRequestInformation';
import { JsonUtility } from '../common/jsonUtility';

/**
 * Service and queries of class 'Usuario'
 */
export class UsuarioServices extends AbstractServices {


    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'Usuario');
    }

    /**
     * Call to the filter 'F_UsuariosPolizaInter' in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param vfDesdeVar Variable vfDesde
     * @param vfHastaVar Variable vfHasta
     * @param vfTipoDocVar Variable vfTipoDoc
     * @param vfNumIdentVar Variable vfNumIdent
     */
    public queryByFilterFuUsuariosPolizaInter(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        vfDesdeVar: Date | null, vfHastaVar: Date | null, vfTipoDocVar: any, vfNumIdentVar: string | null): Promise<QueryResponse> {
        const filter = this.util.getFilter('F_UsuariosPolizaInter');
        this.util.addFilterVariable(filter, 'vfdesde', JsonUtility.date2Json(vfDesdeVar));
        this.util.addFilterVariable(filter, 'vfhasta', JsonUtility.date2Json(vfHastaVar));
        this.util.addFilterVariable(filter, 'vftipodoc', vfTipoDocVar);
        this.util.addFilterVariable(filter, 'vfnumident', vfNumIdentVar);
        return this.queryByFilter(displaySetItems, orderCriteria, instancesPerPage, pageNumber, filter);
    }

    /**
     * @param oidSolicitud Oid of related 'Solicitud' instance using the role 'Solicitud'
     * @param displaySetItems Attributes
     * @param orderCriteria Order criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     */
    public queryByRelatedSolicitud(
        oidSolicitud: any, displaySetItems: string, orderCriteria: string,
        instancesPerPage: number, pageNumber: number): Promise<QueryResponse> {
        return this.queryByRelated(displaySetItems, orderCriteria, instancesPerPage, pageNumber,
            oidSolicitud, 'Solicitud');
    }
}
