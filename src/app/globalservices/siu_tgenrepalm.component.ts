import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from '../common/app.cachedependencyrules';
import { Field, FieldOVPreload } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

/**
 * « Implements global SIU SIU_TGENREPALM »
 */
import { ErrorInformation, QueryResponse } from '../common/answerRequestInformation';

@Component({
    selector: 'imes-gs-siu-tgenrepalm',
    templateUrl: './siu_tgenrepalm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGENREPALMComponent extends AbstractServiceIU implements OnInit {

    /** Fields */
    public ptReportesProcAlm: FieldOVPreload;
    public ptValorArgumentos: Field;

    public listaParametros: Field[] = [];

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param stdFun Standard functions
     * @param condNavMng Conditional manager
     */
    constructor(
        public override appGlobalInfo: AppGlobalInfo, public override util: Util, public override changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng, public stdFun: StandardFunctions,
        public override condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef, condNavMng);
        this.idXML = 'IGl_1730192080896609UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuutgenrepalm;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor']));
        this.serviceName = 'TGENREPALM';
        this.title = this.langMng.translateText('gs_TGENREPALM',
            'Generar');

        // Create inbound argument components
        this.ptReportesProcAlm = new FieldOVPreload(this.langMng);
        this.ptValorArgumentos = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    public reporteSeleccionado(): void {

        this.procesarCambioReporte();
    }


    private procesarCambioReporte(): void {
        
        // Vaciamos la lista de parámetros
        this.listaParametros = [];
        // Si tenemos un reporte seleccionado buscamos los parámetros del mismo
        const instancias = this.ptReportesProcAlm.getSelectedInstances();
        if (instancias && instancias.length === 1) {
            this.cargarParametros(instancias[0].oid);
        }
        this.changeDetectorRef.markForCheck();
    }

    public cargarParametros(oidReporte: any): void {

        this.setShowWait(true);

        const filter = this.util.getFilterByRelated('Reporte', oidReporte)
        const query = this.util.getQueryRequest('esnumerico,titulo',[filter], 'OC_Orden', 0);

        // Buscamos los parámetros del reporte
        //const paramSrv: ParamReporteServices = new ParamReporteServices(this.appGlobalInfo, this.util);

        //paramSrv.queryByRelatedReporte(oidReporte, 'esnumerico,titulo', 'OC_Orden', 0, 0).then((res: QueryResponse) => {
        this.util.callQuery(ModelConstants.Paramreporte.name, query).then((res: QueryResponse) => {
            for(const param of res.results) {

                const field = new Field(this.langMng);
                field.dataType = Field.dtString;
                if (param.esnumerico) {
                    field.dataType = Field.dtInt;
                }
                field.alias = param.titulo;

                this.listaParametros.push(field);
            }
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
        }).catch( (err: ErrorInformation) => {
            this.util.addErrorMessage(err);
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
        });
    }

    public override saveChanges(): void {

        let valorParametros = '';
        let ejecutarServicio = true;
        // Realizamos la comprobaciones
        for (const field of this.listaParametros) {
            const valor = field.getSingleValue() as string;
            if (!valor) {
                this.util.addErrorMessage('Parametro ' + field.alias + ' es obligatorio ');
                ejecutarServicio = false;
                continue;
            }
            if (field.dataType === Field.dtInt && !/^[0-9]*$/.test(valor)){
                this.util.addErrorMessage('El parámetro ' + field.alias + ' tan solo admite dígitos');
                ejecutarServicio = false;
            } else if(!/^[0-9A-Z\/ ]*$/.test(valor)){
                this.util.addErrorMessage('El parámetro ' + field.alias + ' tan solo admite dígitos, letras mayúsculas y la barra /');
                ejecutarServicio = false;
            }
            if (valorParametros) {
                valorParametros += ';';
            }
            valorParametros += valor;
        }

        if (ejecutarServicio) {
            this.ptValorArgumentos.setValue(valorParametros);
            super.saveChanges();
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.ptReportesProcAlm.nameInRequest = 'ptreportesprocalm';
        this.ptReportesProcAlm.alias = this.langMng.translateText(
            'gs_TGENREPALM_inArg_ptReportesProcAlm',
            'Info Reporte');
        this.ptReportesProcAlm.mandatory = true;
        this.ptReportesProcAlm.dataType = ModelConstants.Reportesprocalm.name;
        this.ptReportesProcAlm.maxLength = 50;
        this.ptReportesProcAlm.assignCSS();
        this.fields.push(this.ptReportesProcAlm);

        this.ptValorArgumentos.nameInRequest = 'ptvalorargumentos';
        this.ptValorArgumentos.alias = this.langMng.translateText(
            'gs_TGENREPALM_inArg_ptValorArgumentos',
            'Valor argumentos');
        this.ptValorArgumentos.mandatory = false;
        this.ptValorArgumentos.dataType = Field.dtText;
        this.ptValorArgumentos.assignCSS();
        this.fields.push(this.ptValorArgumentos);
    }

    /**
     * Search the preload values of non dependent fields
     */
    public override loadPreload(): void {

        // ptReportesProcAlm
        this.notifyCallToTheBackEnd();
        this.util.searchPreload('ReportesProcAlm', 'IC_ReportesProcAlm', [], null, '').then(
            (response: any) => {
                this.notifyAnswerFromToTheBackEnd();
                if (response && response.results) {
                    this.ptReportesProcAlm.loadPreload(response.results);
                } else {
                    this.ptReportesProcAlm.loadPreload([]);
                }
                this.numberOfPendingPreload--;
                this.initializeFromContext();
                this.changeDetectorRef.markForCheck();
            },
            (response: any) => {
                this.notifyAnswerFromToTheBackEnd();
                this.processErrorInLoadPreload(response.resultDescription);
            }
        );
        this.numberOfPendingPreload++;
    }

    /**
     * Process the service answer to show the outbound argument scenario
     */
    public override processOutboundArguments(request: any, response: any): boolean {
        this.util.navigateOutboundArgumentsScenario(this.className, 'siu_tgenrepalm_out',
            this.context.exchangeInfo ? this.context.exchangeInfo.previous : null,
            this.context.exchangeInfo ? this.context.exchangeInfo.comeBackContext : null, request, response);
        return true;
    }
}
