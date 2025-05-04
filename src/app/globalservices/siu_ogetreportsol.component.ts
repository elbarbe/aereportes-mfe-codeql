import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from '../common/app.cachedependencyrules';
import { Field, FieldOVLenseSearch } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

/**
 * « Implements global SIU SIU_OGETREPORTSOL »
 */
@Component({
    selector: 'imes-gs-siu-ogetreportsol',
    templateUrl: './siu_ogetreportsol.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuOGETREPORTSOLComponent extends AbstractServiceIU implements OnInit {

    /** Fields */
    public ptSolicitud: FieldOVLenseSearch;

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
        this.idXML = 'IGl_1729755611136894UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuuogetreportsol;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Funcionario', 'Admin', 'SuperAdmin',
            'Asesor']));
        this.serviceName = 'OGETREPORTSOL';
        this.title = this.langMng.translateText('gs_OGETREPORTSOL',
            'Ver PDF');
        this.noShow = true;

        // Create inbound argument components
        this.ptSolicitud = new FieldOVLenseSearch(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.ptSolicitud.nameInRequest = 'ptsolicitud';
        this.ptSolicitud.alias = this.langMng.translateText(
            'gs_OGETREPORTSOL_inArg_ptSolicitud',
            'Solicitud');
        this.ptSolicitud.mandatory = true;
        this.ptSolicitud.dataType = ModelConstants.Solicitud.name;
        this.ptSolicitud.maxLength = 50;
        this.ptSolicitud.assignCSS();
        this.fields.push(this.ptSolicitud);
    }

   /**
    * Process the selection backward navigation
    */
    public override processSelectionBackward(exchInfo: ExchangeInfo): void {
        if (!(exchInfo.selectedOids && exchInfo.selectedOids.length > 0)) {
            return;
        }
        if (exchInfo.originArgumentName.toLowerCase() === 'ptSolicitud'.toLowerCase()) {
            this.ptSolicitud.addOids(exchInfo.selectedOids);
            this.executeDependecyRulesptsolicitud('SetValue', false);
        }

    }

    /**
     * Evaluate dependendy rules for ptSolicitud argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulesptsolicitud(event: string, internal: boolean): void {
        // Suplementary information
        if ('SetValue' === event) {
            this.setSuppInfoptsolicitud();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Set the supplementary information to the ptSolicitud argument
     */
    private setSuppInfoptsolicitud(): void {

        const displaySetIC = 'Ae_solicitudes.Numero_solicitud';
        let numberMissingSupInfo = 0;
        for (const value of this.ptSolicitud.getSelectedInstances()) {
            if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                numberMissingSupInfo++;
                this.cacheDependencyRules.addQueryInstance(ModelConstants.Solicitud.name, value.oid, displaySetIC);
            }
        }

        if (numberMissingSupInfo === 0) {
            this.ptSolicitud.setText();
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        } else {
            this.notifyCallToTheBackEnd();
            this.cacheDependencyRules.searchAll().then(() => {
                this.notifyAnswerFromToTheBackEnd();
                for (const value of this.ptSolicitud.getSelectedInstances()) {
                    if (!value.supplementaryInfo || value.supplementaryInfo === '') {
                        value.supplementaryInfo = this.cacheDependencyRules.getText(ModelConstants.Solicitud.name,
                            value.oid, displaySetIC, [Field.dtString]);
                    }
                }
                this.ptSolicitud.setText();
                this.executePendingDependencyRules();
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    /**
     * Process the change in the ptSolicitud lense search argument
     */
    public onptsolicitudChange(): void {

        const searchText = this.ptSolicitud.text;
        if (searchText && searchText !== '') {
            if (searchText !== this.ptSolicitud.lastText) {
                this.ptSolicitud.removeCSSClass('noResultsLenseSearch');
                this.ptSolicitud.lastText = searchText;
                this.util.searchLenseSearch(ModelConstants.Solicitud.name, 'IC_Solicitud', searchText, [], null).then(
                        (response: any) => {
                            this.ptSolicitud.removeCSSClass('noResultsLenseSearch');
                            this.ptSolicitud.searchResults = response.results;
                            if (this.ptSolicitud.searchResults &&
                                this.ptSolicitud.searchResults.length === 0) {
                                this.ptSolicitud.addCSSClass('noResultsLenseSearch');
                            }
                            if (this.ptSolicitud.searchResults &&
                                this.ptSolicitud.searchResults.length === 1) {
                                this.processptsolicitudSelected(0);
                            }
                            this.changeDetectorRef.markForCheck();
                        },
                        (response: any) => {
                            this.ptSolicitud.removeCSSClass('noResultsLenseSearch');
                            this.ptSolicitud.searchResults = [];
                            this.util.addErrorMessage(response.message);
                            this.changeDetectorRef.markForCheck();
                        });
            }
        } else {
            this.ptSolicitud.removeCSSClass('noResultsLenseSearch');
            this.ptSolicitud.searchResults = [];
            this.cleanptsolicitud();
        }

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the selection in the ptSolicitud lense search argument
     */
    public processptsolicitudSelected(index: number): void {

        let selectedInstance = null;
        if (index !== -1 && this.ptSolicitud.searchResults.length > index) {
            selectedInstance = this.ptSolicitud.searchResults[index];
        }
        // Clean the result list
        this.ptSolicitud.searchResults = [];
        if (selectedInstance) {
            if (!this.ptSolicitud.allowMultiSelect) {
                this.ptSolicitud.cleanSelectedInstances();
            }
            selectedInstance.oid = JSON.parse(selectedInstance.jsonOID);
            this.ptSolicitud.getSelectedInstances().push(selectedInstance);
        }
        this.executeDependecyRulesptsolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Clean the value of the ptSolicitud lense search argument
     */
    public cleanptsolicitud(): void {
        this.clearValidationMessages();
        this.ptSolicitud.clean();
        this.executeDependecyRulesptsolicitud('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }

   /**
    * Process the click in the lense of any object-valued argument
    * @param argumentName Name of the argument
    */
    public doSearchAction(argumentName: string): void {
        const exchInfo = this.getSelectionForwardExchInfo();
        exchInfo.originArgumentName = argumentName;
        if ('ptSolicitud'.toLowerCase() === argumentName.toLowerCase()) {
            this.ptSolicitud.completeSelectionForwardExchInfo(exchInfo);
            exchInfo.targetIUName = 'PIU_Radicados_Obs';
            this.util.navigateSelectionForward(exchInfo);
        }
    }

    /**
     * Process the service answer to show the outbound argument scenario
     */
    public override processOutboundArguments(request: any, response: any): boolean {
        this.util.navigateOutboundArgumentsScenario(this.className, 'siu_ogetreportsol_out',
            this.context.exchangeInfo ? this.context.exchangeInfo.previous : null,
            this.context.exchangeInfo ? this.context.exchangeInfo.comeBackContext : null, request, response);
        return true;
    }
}
