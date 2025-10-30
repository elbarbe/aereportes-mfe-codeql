import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { CacheDependencyRules, InstanceCache } from '../common/app.cachedependencyrules';
import { Field, FieldDefinedSelection } from '../common/baseIUElements';
import { AbstractServiceIU } from '../common/abstractSIU';
import { ExchangeInfo } from '../common/app.exchangeinfo';
import { ModelConstants } from '../common/model.constants';
import { Util } from '../common/app.utils';
import { DefinedSelections } from '../common/definedSelection';
import { StandardFunctions } from '../common/standardFunctions';
import { LanguageMng } from '../common/languageMng';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

import { BHServicesUtil } from '../bhcallutils/bhservicesutil';
import { ConfirmationService } from 'primeng/api';


/**
 * « Implements global SIU SIU_REACTIVACIONCONTRATOS »
 */
@Component({
    selector: 'imes-gs-siu-reactivacioncontratos',
    templateUrl: './siu_reactivacioncontratos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GSSIUuREACTIVACIONCONTRATOSComponent extends AbstractServiceIU implements OnInit {

    private listaPlanes: any;
    public consultarHabilitado = false;
    public guardarHabilitado = false;
    public eliminarHabilitado = false;

    /** Fields */
    public ptCompanyia: FieldDefinedSelection;
    public ptPlan: FieldDefinedSelection;
    public ptContrato: Field;
    public ptTitular: Field;
    public ptValor: Field;

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
        private confirmationService: ConfirmationService,
        public override condNavMng: ConditionalNavigationMng, private bhServicesUtil: BHServicesUtil) {
        super(appGlobalInfo, util, changeDetectorRef, condNavMng);
        this.idXML = 'IGl_1594054803456798UIServ_1';
        this.className = ModelConstants.Globalservices.name;
        this.iuName = ModelConstants.Globalservices.siuureactivacioncontratos;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor']));
        this.serviceName = 'REACTIVACIONCONTRATOS';
        this.title = this.langMng.translateText('gs_REACTIVACIONCONTRATOS',
            'Reactivación de contratos cancelados');

        // Create inbound argument components
        this.ptCompanyia = new FieldDefinedSelection(this.langMng);
        this.ptPlan = new FieldDefinedSelection(this.langMng);
        this.ptContrato = new Field(this.langMng);
        this.ptTitular = new Field(this.langMng);
        this.ptValor = new Field(this.langMng);
    }

    public ngOnInit(): void {
        this.myngOnInit();

        setTimeout( () => {
            this.setShowWait(true);
            this.bhServicesUtil.consultarCompanyasReactivacionContratos().then((respuesta: any) => {
                if (respuesta ) {
                    this.cargarCompanyas(respuesta);
                    this.bhServicesUtil.consultarPlanesReactivacionContratos().then((respuestaPlanes: any) => {
                        if (respuestaPlanes && respuestaPlanes.TiposSolicitud) {
                            this.listaPlanes = respuestaPlanes.TiposSolicitud;
                            this.setShowWait(false);
                        } else {
                            this.setShowWait(false);
                            this.util.addErrorMessage('No se han encontrado Planes configuradas para la reactivación de contratos');
                            this.changeDetectorRef.markForCheck();
                        }
                    }).catch((err: Error) => {
                        this.notifyAnswerFromToTheBackEnd();
                        this.setShowWait(false);
                        this.util.addErrorMessage(err);
                        this.changeDetectorRef.markForCheck();
                    });
        
                } else {
                    this.setShowWait(false);
                    this.util.addErrorMessage('No se han encontrado Compañias configuradas para la reactivación de contratos');
                    this.changeDetectorRef.markForCheck();
                }
            }).catch((err: Error) => {
                this.setShowWait(false);
                this.util.addErrorMessage(err);
                this.changeDetectorRef.markForCheck();
            });

        }, 100);
    }

    /**
     * Carga las compañias recibidas en el argumento
     * @param respuesta 
     */
    private cargarCompanyas(respuesta: any): void {
        this.ptCompanyia.options.push({ key: '', value: '' });
        for (const comp of respuesta) {
            const ele = { key: '', value: '' };
            ele.key = comp.legalCode;
            ele.value = comp.legalCode + " " + comp.name;
            this.ptCompanyia.options.push(ele);
        }
    }

    public onContratoChange(): void {

        // Consultamos el contrato
        if (this.ptContrato.value) {
            this.buscarContrato();
        }
    }
    
    private buscarContrato(): void {
        // Inhabilitamos guardar y eliminar
        this.guardarHabilitado = false;
        this.eliminarHabilitado = false;

        // Limpiamos campos
        this.ptTitular.clean();
        this.ptValor.clean();
        this.ptValor.enabled = false;

        // Comprobamos que tenemos todos los valores
        if (!this.validarCamposEntrada(false)) {
            return;
        }   

        // this.buscarReactivacionContrato();
        // Comprobamos que exista y que NO sea colectivo
        this.setShowWait(true);
        this.bhServicesUtil.consultarContratoNoLastValid(this.ptCompanyia.value,
            this.ptPlan.value,
            this.ptContrato.value, '').then ((coverResponse: any) => {
                if (coverResponse?.coverResponse?.length > 0 && 
                    coverResponse.coverResponse[0].contract?.scope === 'COLECTIVO') {
                    // Si es familiar incializamos el numero de familia y bloqueamos
                    this.setShowWait(false);
                    this.util.addErrorMessage('La reactivación no puede realizarse sobre contratos colectivos');
                } else {
                    this.buscarReactivacionContrato();
                }
                this.changeDetectorRef.markForCheck();
            }).catch( (err: Error) => {
                this.buscarReactivacionContrato();
                this.changeDetectorRef.markForCheck();
            });

        this.changeDetectorRef.markForCheck();
    }

    private validarCamposEntrada( validarImporte: boolean): boolean {
        let retorno = true;
        // Comprobamos que los campos de entrada tiene valor. En caso contrario mostramos mensaje al usuario
        if (this.util.isNull(this.ptCompanyia.value)) {
            this.util.addErrorMessage('El dato Compañia no puede estar vacío');
            retorno = false;
        }   
        if (this.util.isNull(this.ptPlan.value)) {
            this.util.addErrorMessage('El dato Plan no puede estar vacío');
            retorno = false;
        }
        if (this.util.isNull(this.ptContrato.value)) {
            this.util.addErrorMessage('El dato Contrato no puede estar vacío');
            retorno = false;
        }

        if (validarImporte && this.util.isNull(this.ptValor.value)) {
            this.util.addErrorMessage('El dato Valor no puede estar vacío');
            retorno = false;
        }
        return retorno;
    }

    private buscarReactivacionContrato() {
        // Llamamos a consultar el contrato
        this.setShowWait(true);
        this.bhServicesUtil.consultarContratoParaReactivacion(this.ptCompanyia.value,
            this.ptPlan.value,
            this.ptContrato.value).then( (data: any) => {
                if (data ) {
                    if (data.exito && data.solicitudReactivacionContrato) {
                        this.cargarDatosContrato(data.solicitudReactivacionContrato);
                    } else {
                        this.util.addErrorMessage(data.textoError);
                    }
                } else {
                    this.util.addErrorMessage('No se han recuperado datos del contrato');
                }
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();

            }).catch( (err: Error) => {
                this.setShowWait(false);
                this.util.addErrorMessage(err);
                this.changeDetectorRef.markForCheck();
            });
    }

    private cargarDatosContrato(datosContrato: any): void {
        // 1.	Si el campo “codRespuesta” toma el valor “RCMP01”, entonces no existe el contrato con los datos intoducidos 
        //      y se debe mostrar al usuario el mensaje: “No existe información para los parámetros ingresados”
        // 2.	Si el campo “codRespuesta” toma el valor “RCMP02”, entonces el contrato existe, pero no se encuentra cancelado 
        //      y se debe mostrar al usuario el mensaje: “El contrato no se encuentra cancelado”
        // 3.	Si el campo “codRespuesta” toma el valor “RCMP03”, entonces la causa de exclusión no se encuentra parametrizada y
        //      no puede reactivarse. Debe mostrar al usuario el mensaje: (Valor del campo nomCausalExclusion de la respuesta) concatenado con “ esta causal de exclusión del contrato no está parametrizado para su reactivación”
        // 4.	Si el campo “codRespuesta” toma el valor “RCMP04”, entonces el contato existe y se puede crear o modificar una reactivación
        //       de contrato. En función de si el contrato tiene no una reactivación vigente se deberá mostrar un mensaje u otro al usuario:
        //      i)	Si el campo “indActualizacion” toma un valor distinto a “A”:
        //          entonces no existe solicitud de reactivación de contrato y se debe mostrar al usuario el mensaje: 
        //          “El contrato no tiene solicitud de reactivación vigente”. 
        //          Se inhabilitará el botón “Eliminar” y no se indicará valor alguno en el campo de pantalla “Valor”
        //      ii)	Si el campo “indActualizacion” toma un valor igual a “A”:
        //          entonces existe solicitud de reactivación de contrato y se debe mostrar al usuario el mensaje: 
        //          “El contrato tiene solicitud de reactivación vigente”. 
        //          Se habilitará el botón “Eliminar” y se cargará en el campo de pantalla “Valor” lo indicado en el 
        //          campo “valorPagar” de la respuesta
        //
        // Tan solo en el último de los casos (el punto 4) se habilitará el campo de “Valor” y el botón “Guardar”


        switch (datosContrato.codRespuesta) {
            case 'RCMP01':
                this.util.addErrorMessage('No existe información para los parámetros ingresados');
                break;
            case 'RCMP02':
                this.util.addErrorMessage('El contrato no se encuentra cancelado');
                break;
            case 'RCMP03':
                this.util.addErrorMessage(datosContrato.nomCausalExclusion + ' esta causal de exclusión del contrato no está parametrizado para su reactivación');
                break;
            case 'RCMP04':
                this.guardarHabilitado = true;
                // Mostramos los datos del contratante
                this.ptTitular.setValue( datosContrato.tipoIdenContratante + ' ' +
                    datosContrato.numIdenContratante + ' ' +
                    datosContrato.nombreContratante);

                this.ptValor.enabled = true;
                
                if (datosContrato.indActualizacion === 'A') {
                    if (datosContrato.valorPagar) {
                        this.ptValor.value = datosContrato.valorPagar;
                    }
                    this.eliminarHabilitado = true;
                    this.util.addErrorMessage('El contrato tiene solicitud de reactivación vigente');
                } else {
                    this.ptValor.clean();
                    this.eliminarHabilitado = false;
                    this.util.addErrorMessage('El contrato no tiene solicitud de reactivación vigente');
                }

                break;
    
            default: 
                this.util.addErrorMessage('Codigo no esperado: ' + datosContrato.codRespuesta);
                break;
        }

        this.changeDetectorRef.markForCheck();        
    }

    public consultar(): void {
        this.buscarContrato();
    }

    public guardar(): void {
        // La validación de datos de entrada comprueba que los campos “Compañía”, “Plan”, “Contrato” y “Valor” tengan valor
        if (!this.validarCamposEntrada(true)) {
            return;
        }
        
        let msgAviso = '¿Está seguro que desea modificar esta solicitud?';
        if (!this.eliminarHabilitado) {
            msgAviso = '¿Está seguro de crear la solicitud?'
        }
        // Se le mostrará un aviso al usuario con la siguiente pregunta: “¿Está seguro de crear la solicitud?” y los botones “Ok”y “Cancelar”.
        this.confirmationService.confirm({
            key: 'appMainConfirmDialog',
            message: msgAviso,
            header: 'Pregunta',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Ok',
            rejectLabel: 'Cancelar',
            accept: () => {
                // Si el usuario pincha sobre “Cancelar”, se cancela el proceso de guardado
                // Si el usuario pincha sobre “Ok”, se realizará una llamada POST a un servicio REST de BH
                this.llamarCreacionModificacionReactivacion();
            }
        });
    }

    private llamarCreacionModificacionReactivacion(): void {

        this.setShowWait(true);
        this.bhServicesUtil.crearModificarReactivacionContrato(this.ptCompanyia.value,
            this.ptPlan.value,
            this.ptContrato.value,
            this.ptValor.value, 
            this.eliminarHabilitado ).then( (data: any) => {
                if (data ) {
                    // Si la invocación ha sido exitosa (valor del campo “codRespuesta” igual a “RCMP08”), 
                    //  se le muestra el siguiente mensaje al usuario “La solicitud se ha registrado con éxito” y 
                    //   se limpian los campos de pantalla. 
                    if (this.eliminarHabilitado) {
                        if (data.codRespuesta === 'RCMP09') {
                            this.util.addErrorMessage('La solicitud se ha modificado con éxito');
                            this.limpiarCampos();
                        } else {
                            // Si la invocación no ha sido exitosa  se le muestra al usuario el mensaje de error, campo “desRespuesta”. 
                            this.util.addErrorMessage(data.desRespuesta);
                        }

                    } else {
                        if (data.codRespuesta === 'RCMP08') {
                            this.util.addErrorMessage('La solicitud se ha registrado con éxito');
                            this.limpiarCampos();
                        } else {
                            // Si la invocación no ha sido exitosa  se le muestra al usuario el mensaje de error, campo “desRespuesta”. 
                            this.util.addErrorMessage(data.desRespuesta);
                        }
                    }
                    this.changeDetectorRef.markForCheck();
                } else {
                    this.util.addErrorMessage('Error no esperado');
                }
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();

            }).catch( (err: Error) => {
                this.setShowWait(false);
                this.util.addErrorMessage(err);
                this.changeDetectorRef.markForCheck();
            });        
    }


    private limpiarCampos(): void {
        this.ptCompanyia.clean();
        this.ptContrato.clean();
        this.ptPlan.clean();
        this.ptTitular.clean();
        this.ptValor.clean();
        this.eliminarHabilitado = false;
        this.guardarHabilitado  = false;
    }

    public eliminar(): void {
        // La validación de datos de entrada comprueba que los campos “Compañía”, “Plan” y “Contrato”
        if (!this.validarCamposEntrada(false)) {
            return;
        }
        
        const msgAviso = '¿Está seguro que desea eliminar esta solicitud?';
        // Se le mostrará un aviso al usuario con la siguiente pregunta: “¿Está seguro que desea eliminar esta solicitud?” y los botones “Ok”y “Cancelar”.
        this.confirmationService.confirm({
            key: 'appMainConfirmDialog',
            message: msgAviso,
            header: 'Pregunta',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Ok',
            rejectLabel: 'Cancelar',
            accept: () => {
                // Si el usuario pincha sobre “Cancelar”, se cancela el proceso de guardado
                // Si el usuario pincha sobre “Ok”, se realizará una llamada POST a un servicio REST de BH
                this.llamarEliminarSolicitud();
            }
        });
    }

    private llamarEliminarSolicitud(): void {

        this.setShowWait(true);
        this.bhServicesUtil.eliminarSolicitudReactivacionContrato(this.ptCompanyia.value,
            this.ptPlan.value,
            this.ptContrato.value).then( (data: any) => {
                if (data ) {
                    // Si la invocación ha sido exitosa (valor del campo “codRespuesta” igual a “RCMP10”), 
                    //  se le muestra el siguiente mensaje al usuario “La solicitud se ha eliminado con éxito” y se limpian los campos de pantalla

                    if (data.codRespuesta === 'RCMP10') {
                        this.util.addErrorMessage('La solicitud se ha eliminado con éxito');
                        this.limpiarCampos();
                    } else {
                        // Si la invocación no ha sido exitosa  se le muestra al usuario el mensaje de error, campo “desRespuesta”. 
                        this.util.addErrorMessage(data.desRespuesta);
                    }
                    this.changeDetectorRef.markForCheck();
                } else {
                    this.util.addErrorMessage('Error no esperado');
                }
                this.setShowWait(false);
                this.changeDetectorRef.markForCheck();

            }).catch( (err: Error) => {
                this.setShowWait(false);
                this.util.addErrorMessage(err);
                this.changeDetectorRef.markForCheck();
            });        
    }    

    /**
     * Initialize the component using default values
     */
    public override initializeComponents(): void {

        this.ptCompanyia.nameInRequest = 'ptcompanyia';
        this.ptCompanyia.alias = this.langMng.translateText(
            'gs_REACTIVACIONCONTRATOS_inArg_ptCompanyia',
            'Compañía');
        this.ptCompanyia.mandatory = false;
        this.ptCompanyia.dataType = Field.dtString;

        this.ptCompanyia.maxLength = 50;
        this.ptCompanyia.assignCSS();
        this.fields.push(this.ptCompanyia);

        this.ptPlan.nameInRequest = 'ptplan';
        this.ptPlan.alias = this.langMng.translateText(
            'gs_REACTIVACIONCONTRATOS_inArg_ptPlan',
            'Plan');
        this.ptPlan.mandatory = false;
        this.ptPlan.dataType = Field.dtString;

        this.ptPlan.maxLength = 50;
        this.ptPlan.assignCSS();
        this.fields.push(this.ptPlan);

        this.ptContrato.nameInRequest = 'ptcontrato';
        this.ptContrato.alias = this.langMng.translateText(
            'gs_REACTIVACIONCONTRATOS_inArg_ptContrato',
            'Contrato');
        this.ptContrato.mandatory = false;
        this.ptContrato.dataType = Field.dtString;
        this.ptContrato.maxLength = 50;
        this.ptContrato.assignCSS();
        this.fields.push(this.ptContrato);

        this.ptTitular.nameInRequest = 'pttitular';
        this.ptTitular.alias = this.langMng.translateText(
            'gs_REACTIVACIONCONTRATOS_inArg_ptTitular',
            'Titular');
        this.ptTitular.mandatory = false;
        this.ptTitular.dataType = Field.dtString;
        this.ptTitular.maxLength = 50;
        this.ptTitular.assignCSS();
        this.ptTitular.enabled = false;
        this.fields.push(this.ptTitular);

        this.ptValor.nameInRequest = 'ptvalor';
        this.ptValor.alias = this.langMng.translateText(
            'gs_REACTIVACIONCONTRATOS_inArg_ptValor',
            'Valor');
        this.ptValor.mandatory = false;
        this.ptValor.dataType = Field.dtInt;
        this.ptValor.assignCSS();
        this.fields.push(this.ptValor);
    }

    /**
     * Evaluate dependendy rules for ptCompanyia argument
     * @param event Rule event
     * @param internal Internal or External
     */
    private executeDependecyRulesptcompanyia(event: string, internal: boolean): void {
        if (!this.cacheDependencyRules.checkCounter()) {
            return;
        }
        // Rule 1
        if ('SetValue' === event) {
            this.executeDependecyRules1ptCompanyia();
        }
        this.executePendingDependencyRules();
    }

    /**
     * Dependency rule 1 for ptCompanyia argument
     */
    private executeDependecyRules1ptCompanyia(): void {
        this.cacheDependencyRules.counter++;
        try {
            this.executeDependecyRules1ptCompanyiaActions();
        } catch (e) {
            console.log(e);
            this.executePendingDependencyRules();
            this.changeDetectorRef.markForCheck();
        }
        this.cacheDependencyRules.counter--;
    }

    /**
     * Actions of dependency rule 1 for ptCompanyia argument
     */
    private executeDependecyRules1ptCompanyiaActions(): void {
        // v <> NULL
        if (!this.util.isNull(this.ptCompanyia.value)) {
            // Cargamos los planes que tengan el mismo código de Producto
            this.ptPlan.clean();
            this.ptPlan.options = [];
            this.ptPlan.options.push({ key: '', value: '' });
            for (const plan of this.listaPlanes) {
                if (plan.idProducto === this.ptCompanyia.value) {
                    this.ptPlan.options.push({ key: plan.idTipoSolicitud, value: plan.nombreTipoSolicitud });
                }
            }
        }
        this.executePendingDependencyRules();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Process the change in the ptCompanyia argument
     */
    public onptcompanyiaChange(): void {
        this.clearValidationMessages();
        this.executeDependecyRulesptcompanyia('SetValue', false);
        this.changeDetectorRef.markForCheck();
    }
}
