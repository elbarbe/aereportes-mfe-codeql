import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { ErrorInformation } from '../common/answerRequestInformation';
import { JsonUtility } from '../common/jsonUtility';

/**
 * Global services
 */
export class GlobalServicesServices extends AbstractServices {

    private tGENFILELEGALIZACOMSrvName = 'TGENFILELEGALIZACOM';
    private tGDUMMYGDC27u1SrvName = 'TGDUMMYGDC27_1';
    private oGETREPORTSOLSrvName = 'OGETREPORTSOL';
    private oGETREPORTSOLNOVSrvName = 'OGETREPORTSOLNOV';
    private tGENREPALMSrvName = 'TGENREPALM';

    constructor(
        protected override readonly appGlobalInfo: AppGlobalInfo,
        protected override readonly util: Util) {
        super(appGlobalInfo, util, 'GlobalServices');
    }

    /**
     * Call to the service 'TGENFILELEGALIZACOM' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param puFInicioInArg Mandatory argument 'p_FInicio'
     * @param puFFinInArg Mandatory argument 'p_FFin'
     */
    public tGENFILELEGALIZACOM(
        puFInicioInArg: Date, puFFinInArg: Date):
        Promise<ErrorInformation | {
            ps_archivoresultado: string,
            ps_nombrearchivoresultado: string,
            ps_resultado: string
        }> {
        const request: {
            p_finicio: string, p_ffin: string
        } = {
            p_finicio: JsonUtility.date2Json(puFInicioInArg), p_ffin: JsonUtility.date2Json(puFFinInArg)
        };
        return new Promise<ErrorInformation | {
            ps_archivoresultado: string,
            ps_nombrearchivoresultado: string,
            ps_resultado: string
        }> ((resolve, reject) => {
            this.callService(this.tGENFILELEGALIZACOMSrvName, request).then((response: any) => {
                resolve({
                    ps_archivoresultado: response.ps_archivoresultado,
                    ps_nombrearchivoresultado: response.ps_nombrearchivoresultado,
                    ps_resultado: response.ps_resultado
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'TGDUMMYGDC27_1' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     */
    public tGDUMMYGDC27u1(
        ):
        Promise<ErrorInformation | {
            oaurl: string
        }> {
        const request = {};
        return new Promise<ErrorInformation | {
            oaurl: string
        }> ((resolve, reject) => {
            this.callService(this.tGDUMMYGDC27u1SrvName, request).then((response: any) => {
                resolve({
                    oaurl: response.oaurl
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'OGETREPORTSOL' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param ptSolicitudInArg Mandatory argument 'ptSolicitud'. Oid of 'Solicitud' class
     */
    public oGETREPORTSOL(
        ptSolicitudInArg: any):
        Promise<ErrorInformation | {
            oaarchivo: string,
            oanombrearchivo: string
        }> {
        const request: {
            ptsolicitud_oid: any
        } = {
            ptsolicitud_oid: ptSolicitudInArg
        };
        return new Promise<ErrorInformation | {
            oaarchivo: string,
            oanombrearchivo: string
        }> ((resolve, reject) => {
            this.callService(this.oGETREPORTSOLSrvName, request).then((response: any) => {
                resolve({
                    oaarchivo: response.oaarchivo,
                    oanombrearchivo: response.oanombrearchivo
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'OGETREPORTSOLNOV' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param ptSolicitudNovedadInArg Mandatory argument 'ptSolicitudNovedad'. Oid of 'SolicitudNovedad' class
     */
    public oGETREPORTSOLNOV(
        ptSolicitudNovedadInArg: any):
        Promise<ErrorInformation | {
            oaruta: string,
            oanombrearchivo: string,
            oaarchivo: string
        }> {
        const request: {
            ptsolicitudnovedad_oid: any
        } = {
            ptsolicitudnovedad_oid: ptSolicitudNovedadInArg
        };
        return new Promise<ErrorInformation | {
            oaruta: string,
            oanombrearchivo: string,
            oaarchivo: string
        }> ((resolve, reject) => {
            this.callService(this.oGETREPORTSOLNOVSrvName, request).then((response: any) => {
                resolve({
                    oaruta: response.oaruta,
                    oanombrearchivo: response.oanombrearchivo,
                    oaarchivo: response.oaarchivo
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }

    /**
     * Call to the service 'TGENREPALM' in the backend
     * Promise is resolved if service execution is successful and returns its outbound arguments in a JSON object.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param ptReportesProcAlmInArg Mandatory argument 'ptReportesProcAlm'. Oid of 'ReportesProcAlm' class
     * @param ptValorArgumentosInArg Optional argument 'ptValorArgumentos'
     */
    public tGENREPALM(
        ptReportesProcAlmInArg: any, ptValorArgumentosInArg: string):
        Promise<ErrorInformation | {
            oafichero: string,
            oanombrefichero: string
        }> {
        const request: {
            ptreportesprocalm_json: any, ptvalorargumentos: string
        } = {
            ptreportesprocalm_json: ptReportesProcAlmInArg ? JSON.stringify(ptReportesProcAlmInArg) : '',
            ptvalorargumentos: ptValorArgumentosInArg
        };
        return new Promise<ErrorInformation | {
            oafichero: string,
            oanombrefichero: string
        }> ((resolve, reject) => {
            this.callService(this.tGENREPALMSrvName, request).then((response: any) => {
                resolve({
                    oafichero: response.oafichero,
                    oanombrefichero: response.oanombrefichero
                });
            }).catch( (errorInfo: ErrorInformation) => {
                reject(errorInfo);
            });
        });
    }
}
