import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { AbstractIU } from '../common/baseIUElements';
import { Field, FieldBlob } from '../common/baseIUElements';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

@Component({
    selector: 'imes-gs-siu-tgenrepalm-out',
    templateUrl: './siu_tgenrepalm_out.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGENREPALMuOutComponent  extends AbstractIU implements OnInit {

    /** Outbound argument oaFichero */
    public oaFichero: FieldBlob;
    /** Outbound argument oaNombreFichero */
    public oaNombreFichero: Field;

    /** Service request */
    private serviceRequest: any;
    /** Service response */
    private serviceResponse: any;
    /** Context */
    private readonly context: {exchangeInfo: ExchangeInfo} = {exchangeInfo: new ExchangeInfo()};

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param condNavMng Conditinal navigation manager
     */
    constructor(
        protected override appGlobalInfo: AppGlobalInfo,
        protected override util: Util,
        protected override changeDetectorRef: ChangeDetectorRef,
        public langMng: LanguageMng,
        protected condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.className = ModelConstants.Globalservices.name;
        this.iuName = 'siu_tgenrepalm_out';
        this.title = this.langMng.translateText('gs_TGENREPALM',
            'Generar');

        // Create outbound argument components
        this.oaFichero = new FieldBlob(this.langMng);
        this.oaNombreFichero = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
        this.onDownloadoaFichero();
        this.processCancel();
    }

    /**
     * Initialize the component using default values
     */
    public override initialize(): void {
        this.oaFichero.nameInRequest = 'oafichero';
        this.oaFichero.alias = this.langMng.translateText(
            'gs_TGENREPALM_outArg_oaFichero',
            'Fichero');
        this.oaFichero.dataType = Field.dtBlob;
        this.oaFichero.enabled = false;
        this.oaFichero.assignCSS();

        this.oaNombreFichero.nameInRequest = 'oanombrefichero';
        this.oaNombreFichero.alias = this.langMng.translateText(
            'gs_TGENREPALM_outArg_oaNombreFichero',
            'Reporte');
        this.oaNombreFichero.dataType = Field.dtString;
        this.oaNombreFichero.maxLength = 200;
        this.oaNombreFichero.enabled = false;
        this.oaNombreFichero.assignCSS();

        // Get request and response from the exchange information
        this.context.exchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);
        if (this.context.exchangeInfo) {
            this.serviceRequest = this.context.exchangeInfo.customData.request;
            this.serviceResponse = this.context.exchangeInfo.customData.response;
            if (this.serviceRequest && this.serviceResponse) {
                this.initializeFromResponse();
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Initialize the scenario using the response information
     */
    public initializeFromResponse(): void {
        this.oaFichero.value =
            this.serviceResponse[this.oaFichero.nameInRequest];
        this.oaNombreFichero.value =
            this.serviceResponse[this.oaNombreFichero.nameInRequest];
    }

    /**
     * Returns the context information
     */
    public override getContext(): any {
        return this.context;
    }

    /**
     * Save a file with the argument information
     */
    public onDownloadoaFichero(): void {

        this.util.saveFileFromBase64(this.oaFichero.value, this.oaNombreFichero.value);
    }
}
