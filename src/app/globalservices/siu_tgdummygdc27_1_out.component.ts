import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { AbstractIU } from '../common/baseIUElements';
import { Field } from '../common/baseIUElements';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

@Component({
    selector: 'imes-gs-siu-tgdummygdc27-1-out',
    templateUrl: './siu_tgdummygdc27_1_out.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGDUMMYGDC27u1uOutComponent  extends AbstractIU implements OnInit {

    /** Outbound argument oaURL */
    public oaURL: Field;

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
        this.iuName = 'siu_tgdummygdc27_1_out';
        this.title = this.langMng.translateText('gs_TGDUMMYGDC27_1',
            'Reactivación de contratos cancelados');

        // Create outbound argument components
        this.oaURL = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initialize(): void {
        this.oaURL.nameInRequest = 'oaurl';
        this.oaURL.alias = this.langMng.translateText(
            'gs_TGDUMMYGDC27_1_outArg_oaURL',
            'URL');
        this.oaURL.dataType = Field.dtString;
        this.oaURL.maxLength = 999;
        this.oaURL.enabled = false;
        this.oaURL.assignCSS();

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
        this.oaURL.value =
            this.serviceResponse[this.oaURL.nameInRequest];
    }

    /**
     * Returns the context information
     */
    public override getContext(): any {
        return this.context;
    }
}
