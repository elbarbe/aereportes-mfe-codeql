import { AbstractServices } from '../common/abstractServices';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { ErrorInformation } from '../common/answerRequestInformation';
import { JsonUtility } from '../common/jsonUtility';

/**
 * « Global services »
 */
export class GlobalServicesServices extends AbstractServices {

    private tGENFILELEGALIZACOMSrvName = 'TGENFILELEGALIZACOM';
    private rEACTIVACIONCONTRATOSSrvName = 'REACTIVACIONCONTRATOS';
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
     * Call to the service 'REACTIVACIONCONTRATOS' in the backend
     * Promise is resolved if service execution is successful and returns void.
     * If service fails, promise is rejected and returned an instance of ErrorInformation
     * @param ptCompanyiaInArg Optional argument 'ptCompanyia'
     * @param ptPlanInArg Optional argument 'ptPlan'
     * @param ptContratoInArg Optional argument 'ptContrato'
     * @param ptTitularInArg Optional argument 'ptTitular'
     * @param ptValorInArg Optional argument 'ptValor'
     */
    public rEACTIVACIONCONTRATOS(
        ptCompanyiaInArg: string, ptPlanInArg: string, ptContratoInArg: string, ptTitularInArg: string,
        ptValorInArg: number): Promise<ErrorInformation | void> {
        const request: {
            ptcompanyia: string, ptplan: string, ptcontrato: string, pttitular: string, ptvalor: number
        } = {
            ptcompanyia: ptCompanyiaInArg, ptplan: ptPlanInArg, ptcontrato: ptContratoInArg, pttitular: ptTitularInArg,
            ptvalor: ptValorInArg
        };
        return new Promise<ErrorInformation | void> ((resolve, reject) => {
             this.callService(this.rEACTIVACIONCONTRATOSSrvName, request).then((response: any) => {
                resolve();
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
