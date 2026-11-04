import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Field } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

/**
 * « Implements global SIU SIU_TGENFILELEGALIZACOM »
 */
import { QueryResponse } from '../common/answerRequestInformation';
import { formatDate } from '@angular/common';

@Component({
    selector: 'imes-gs-siu-tgenfilelegalizacom',
    templateUrl: './siu_tgenfilelegalizacom.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuTGENFILELEGALIZACOMComponent extends AbstractServiceIU implements OnInit {

    /** Fields */
    public puFInicio: Field;
    public puFFin: Field;

    private C_PRODUCTO = 'ae_solicitudes.productot.producto';
    private C_TIPOCONTRATO = 'contratoc.tipocontrato';
    private C_NUMCONTRATO = 'numcontrato';
    private C_NUMFAMILIA = 'numfamilia';
    private C_NUMRADICADO = 'numradicado';
    private C_FESOLICI = 'ae_solicitudes.fesolici';
    private C_CODSUCURSAL = 'codigosucursalrad';

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
        this.idXML = 'IGl_1436549251072158UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuutgenfilelegalizacom;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin',
            'Afiliaciones']));
        this.serviceName = 'TGENFILELEGALIZACOM';
        this.title = this.langMng.translateText('gs_TGENFILELEGALIZACOM',
            'Generación archivo legaliza comisiones');

        // Create inbound argument components
        this.puFInicio = new Field(this.langMng);
        this.puFFin = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();
    }

    public override saveChanges(): void {

        if (!this.validateInputFields()) {
            return;
        }

        this.generarFichero();
    }

    private generarFichero(): void {

        const filter = this.util.getFilter('F_SolicitudLegalizaComisiones');
        this.util.addFilterVariable(filter, 'v_FInicio', this.puFInicio.value);
        this.util.addFilterVariable(filter, 'v_FFin', this.puFFin.value);
        let displaySet = '';
        displaySet += this.C_PRODUCTO;
        displaySet += ',' + this.C_TIPOCONTRATO;
        displaySet += ',' + this.C_NUMCONTRATO;
        displaySet += ',' + this.C_NUMFAMILIA;
        displaySet += ',' + this.C_NUMRADICADO;
        displaySet += ',' + this.C_FESOLICI;
        displaySet += ',' + this.C_CODSUCURSAL;
    
        const queryRequest = this.util.getQueryRequest(displaySet, [filter], '', 0);

        this.setShowWait(true);
        this.util.callQuery(ModelConstants.Solicitud.name, queryRequest).then( (response: QueryResponse) => {

            if (response.totalItems === 0) {
                this.util.addErrorMessage('Ningún registro cumple la condición. No se ha generado fichero');    
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();
            } else {
                const datosFichero = this.generarDatos(response.results);
                this.util.saveFileFromBase64(window.btoa(datosFichero), 'LegalizaComisiones.txt');

                this.util.addErrorMessage('Ejecución completada con éxito. Registros totales: ' + response.totalItems);
                this.setShowWait(false);
                this.processCancel();
                this.changeDetectorRef.markForCheck();
            }
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
        }).catch( (err: Error) => {
            this.util.addErrorMessage(err);
            this.setShowWait(false);
            this.changeDetectorRef.markForCheck();
        });

    }

    private generarDatos(results: any[]): string {
        // Vamos escribiendo los registros
        const listaResultados: string[] = [];
        const fechaproceso = formatDate( new Date(), 'ddMMyyyy', this.langMng.getLanguageId());
        for (const sol of results) {
            listaResultados.push(this.procesarSolicitud(sol, fechaproceso));
        }

        return listaResultados.join('\n');
    }

    private procesarSolicitud(sol: any, fechaproceso: string): string {

        let registro: string[] = new Array(68);

        		// Vamos colocando los datos en su sitio
		//		1	Producto
		if ( !this.util.isNull(sol[this.C_PRODUCTO.replace(new RegExp('[.]', 'g'), '-')])){
			registro[0] = sol[this.C_PRODUCTO.replace(new RegExp('[.]', 'g'), '-')]; 
		}
		
		//		2	Tipo Contrato	Varchar2	C o F
		if ( !this.util.isNull(sol[this.C_TIPOCONTRATO.replace(new RegExp('[.]', 'g'), '-')])){
			if (sol[this.C_TIPOCONTRATO.replace(new RegExp('[.]', 'g'), '-')] === 1){
				registro[1] = 'F';
			} else{
				registro[1] = 'C';
			}
		}

		//		3	Número de Contrato 	Varchar2	
		if ( !this.util.isNull(sol[this.C_NUMCONTRATO.replace(new RegExp('[.]', 'g'), '-')])){
			registro[2] = sol[this.C_NUMCONTRATO.replace(new RegExp('[.]', 'g'), '-')]; 
		}

		//		4	Número de Familia	Varchar2	
		if ( !this.util.isNull(sol[this.C_NUMFAMILIA.replace(new RegExp('[.]', 'g'), '-')])){
			registro[3] = sol[this.C_NUMFAMILIA.replace(new RegExp('[.]', 'g'), '-')]; 
		}

		//		5	Código de Novedad	Número	Siempre debe ir 2044
		registro[4] = '2044'; 
		//		6	Causal de la Novedad	Número	Siempre debe ir 2050
		registro[5] = '2050'; 
		
		//		7	Numero de Solicitud de la Novedad	Varchar2	
		if ( !this.util.isNull(sol[this.C_NUMRADICADO.replace(new RegExp('[.]', 'g'), '-')])){
			registro[6] = sol[this.C_NUMRADICADO.replace(new RegExp('[.]', 'g'), '-')]; 
		}

		//		8	Fecha de Solicitud	Fecha	formato de la fecha (ddmmaaaa)
		//		9	Fecha de Radicación	Fecha	formato de la fecha (ddmmaaaa) 
        const fesolici = this.util.getDate(sol[this.C_FESOLICI.replace(new RegExp('[.]', 'g'), '-')]);
		if (fesolici != null){
			registro[7] = formatDate( fesolici, 'ddMMyyyy', this.langMng.getLanguageId());
			registro[8] = formatDate( fesolici, 'ddMMyyyy', this.langMng.getLanguageId());
		}
		
		//		10	Numero de Radicación	Varchar2	Es el mismo número de solicitud
		//		11	Numero de Guia	Varchar2	Es el mismo número de solicitud
		if ( !this.util.isNull(sol[this.C_NUMRADICADO.replace(new RegExp('[.]', 'g'), '-')])) {
			registro[9] = sol[this.C_NUMRADICADO.replace(new RegExp('[.]', 'g'), '-')];
			registro[10] = sol[this.C_NUMRADICADO.replace(new RegExp('[.]', 'g'), '-')];
		}
		
		//		12	Fecha de Guia	Fecha	formato de la fecha (ddmmaaaa) 
		if (fesolici != null) {
			registro[11] = formatDate( fesolici, 'ddMMyyyy', this.langMng.getLanguageId());
		}

		//		13	Sucursal de Radicación	Número	codigo legal de la Sucursales de Radicación asociada a la solicitud
		if ( !this.util.isNull(sol[this.C_CODSUCURSAL.replace(new RegExp('[.]', 'g'), '-')])) {
			registro[12] = sol[this.C_CODSUCURSAL.replace(new RegExp('[.]', 'g'), '-')]; 
		}

		//		15	Fecha de Efecto de la novedad
		registro[14] = fechaproceso; 

		// 43	Marca Comisión	Siempre enviar 1
		registro[42] = '1'; 


        return registro.join(';');
    }

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.puFInicio.nameInRequest = 'p_finicio';
        this.puFInicio.alias = this.langMng.translateText(
            'gs_TGENFILELEGALIZACOM_inArg_p_FInicio',
            'Fecha inicio');
        this.puFInicio.mandatory = true;
        this.puFInicio.dataType = Field.dtDate;
        this.puFInicio.assignCSS();
        this.fields.push(this.puFInicio);

        this.puFFin.nameInRequest = 'p_ffin';
        this.puFFin.alias = this.langMng.translateText(
            'gs_TGENFILELEGALIZACOM_inArg_p_FFin',
            'Fecha fin');
        this.puFFin.mandatory = true;
        this.puFFin.dataType = Field.dtDate;
        this.puFFin.assignCSS();
        this.fields.push(this.puFFin);
    }

    /**
     * Process the service answer to show the outbound argument scenario
     */
    public override processOutboundArguments(request: any, response: any): boolean {
        this.util.navigateOutboundArgumentsScenario(this.className, 'siu_tgenfilelegalizacom_out',
            this.context.exchangeInfo ? this.context.exchangeInfo.previous : null,
            this.context.exchangeInfo ? this.context.exchangeInfo.comeBackContext : null, request, response);
        return true;
    }
}
