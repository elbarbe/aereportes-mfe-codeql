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
/**
 * « Implements outbound arguments global SIU SIU_TGENFILELEGALIZACOM »
 */
    selector: 'imes-gs-siu-tgenfilelegalizacom-out',
    templateUrl: './siu_tgenfilelegalizacom_out.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGENFILELEGALIZACOMuOutComponent  extends AbstractIU implements OnInit {

    /** Outbound argument ps_ArchivoResultado */
    public psuArchivoResultado: FieldBlob;
    /** Outbound argument ps_NombreArchivoResultado */
    public psuNombreArchivoResultado: Field;
    /** Outbound argument ps_Resultado */
    public psuResultado: Field;

    /** Service request */
    private serviceRequest: any;
    /** Service response */
    private serviceResponse: any;
    /** Exchange info */
    private exchangeInfo: ExchangeInfo = new ExchangeInfo();

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
        this.iuName = 'siu_tgenfilelegalizacom_out';
        this.title = this.langMng.translateText('gs_TGENFILELEGALIZACOM',
            'Generación archivo legaliza comisiones');

        // Create outbound argument components
        this.psuArchivoResultado = new FieldBlob(this.langMng);
        this.psuNombreArchivoResultado = new Field(this.langMng);
        this.psuResultado = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initialize(): void {
        this.psuArchivoResultado.nameInRequest = 'ps_archivoresultado';
        this.psuArchivoResultado.alias = this.langMng.translateText(
            'gs_TGENFILELEGALIZACOM_outArg_ps_ArchivoResultado',
            'Archivo Resultado');
        this.psuArchivoResultado.dataType = Field.dtBlob;
        this.psuArchivoResultado.enabled = false;
        this.psuArchivoResultado.assignCSS();

        this.psuNombreArchivoResultado.nameInRequest = 'ps_nombrearchivoresultado';
        this.psuNombreArchivoResultado.alias = this.langMng.translateText(
            'gs_TGENFILELEGALIZACOM_outArg_ps_NombreArchivoResultado',
            'Nombre archivo resultado');
        this.psuNombreArchivoResultado.dataType = Field.dtString;
        this.psuNombreArchivoResultado.maxLength = 100;
        this.psuNombreArchivoResultado.enabled = false;
        this.psuNombreArchivoResultado.assignCSS();

        this.psuResultado.nameInRequest = 'ps_resultado';
        this.psuResultado.alias = this.langMng.translateText(
            'gs_TGENFILELEGALIZACOM_outArg_ps_Resultado',
            'Resultado');
        this.psuResultado.dataType = Field.dtText;
        this.psuResultado.enabled = false;
        this.psuResultado.assignCSS();

        // Get request and response from the exchange information
        this.exchangeInfo = this.appGlobalInfo.appExchangeInfo.getExchangeInfoForScenario(this.className, this.iuName);
        if (this.exchangeInfo) {
            this.serviceRequest = this.exchangeInfo.customData.request;
            this.serviceResponse = this.exchangeInfo.customData.response;
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
        this.psuArchivoResultado.value =
            this.serviceResponse[this.psuArchivoResultado.nameInRequest];
        this.psuNombreArchivoResultado.value =
            this.serviceResponse[this.psuNombreArchivoResultado.nameInRequest];
        this.psuResultado.value =
            this.serviceResponse[this.psuResultado.nameInRequest];
    }


    /**
     * Save a file with the argument information
     */
    public onDownloadpsuArchivoResultado(): void {

        this.util.saveFileFromBase64(this.psuArchivoResultado.value, this.psuNombreArchivoResultado.value);
    }
}
