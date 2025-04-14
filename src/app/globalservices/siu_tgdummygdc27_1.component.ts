import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from '../common/app.cachedependencyrules';
import { Field } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

@Component({
    selector: 'imes-gs-siu-tgdummygdc27-1',
    templateUrl: './siu_tgdummygdc27_1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGDUMMYGDC27u1Component extends AbstractServiceIU implements OnInit {

    /** Fields */

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
        this.idXML = 'IGl_1594054803456798UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuutgdummygdc27u1;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor']));
        this.serviceName = 'TGDUMMYGDC27_1';
        this.title = this.langMng.translateText('gs_TGDUMMYGDC27_1',
            'Reactivación de contratos cancelados');

        // Create inbound argument components
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {
    }

    /**
     * Process the service answer to show the outbound argument scenario
     */
    public override processOutboundArguments(request: any, response: any): boolean {
        this.util.navigateOutboundArgumentsScenario(this.className, 'siu_tgdummygdc27_1_out',
            this.context.exchangeInfo ? this.context.exchangeInfo.previous : null,
            this.context.exchangeInfo ? this.context.exchangeInfo.comeBackContext : null, request, response);
        return true;
    }
}
